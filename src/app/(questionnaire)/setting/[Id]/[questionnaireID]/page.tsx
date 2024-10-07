'use client'

import { SaveButton } from "@/src/styles/pages/questionnaire-setting";
import {
    QuestionnaireSettingPageHeader,
} from "@/src/components/pages/questionnaire-setting/PageHeader";
import {
    QuestionnaireTimingSection, TimerCalculator
} from "@/src/components/pages/questionnaire-setting/QuestionnaireTimingSection";
import { TargetCommunitySection } from "@/src/components/pages/questionnaire-setting/TargetCommunitySection";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { axiosInstance } from "@/src/utils/helper/axios";
import { AxiosError, AxiosResponse } from "axios";
import {
    I_ApiConditionResponse,
    I_ApiQSSettingResponse,
    I_Condition, T_QuestionnaireInitialDataType
} from "@/src/utils/types/pages/questionnaireSetting";
import { QuestionnaireNotFound } from "@/src/components/pages/questionnaire-setting/QuestionnaireNotFound";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { errorHandler } from "@/src/utils/functions/errorHandler";
import { SpinnerLoading } from "@/src/components/common/SpinnerLoading";
import { SettingHeadeLoading } from "@/src/components/pages/questionnaire-setting/loading/SettingHeaderLoading";
import { TimeSectionLoading } from "@/src/components/pages/questionnaire-setting/loading/TimeSectionLoading";
import { questionnaireInitialData } from "@/src/utils/staticData/questionnaireSetting";
import { TargetSectionLoading } from "@/src/components/pages/questionnaire-setting/loading/TargetSectionLoading";
import { PageContainer, PageFooter } from "@/src/styles/pages/questionnaire-setting/page";

const QuestionnaireSetting = ({ params }: { params: { questionnaireID: string, Id:string } }) => {
    
    
    const searchParams = useSearchParams();
    const [timeSelectorCheckbox, setTimeSelectorCheckbox] = useState(false);
    const [questionnaireData, setQuestionnaireData] = useState<T_QuestionnaireInitialDataType>(questionnaireInitialData);
    const questionnaireURL = `/question/group-questionnaire/${params.Id}/questionnaire/${params.questionnaireID}`
    const QSSettingQuery: UseQueryResult<AxiosResponse<I_ApiQSSettingResponse, AxiosError>> = useQuery({
        queryKey: ['QSSettingQuery'],
        queryFn: async () => {
            let Response: AxiosResponse<I_ApiQSSettingResponse, any> = await axiosInstance().get(questionnaireURL);
            setQuestionnaireData({
                timer: TimerCalculator(Response.data.duration) as any,
                title: Response.data.title,
                is_active: Response.data.is_active,
                is_required_login: Response.data.is_required_login
            })
            return Response;
        },
    })
    const ConditionsQuery: UseQueryResult<AxiosResponse<I_ApiConditionResponse, any>> = useQuery({
        queryKey: ['ConditionQuery'],
        enabled: false,
        queryFn: async () =>
            await axiosInstance().get(`/question/condition${searchParams.get('search') ?
                '?search=' + searchParams.get('search') : ''}`),
    })
    useEffect(() => {
        ConditionsQuery.refetch()
    }, [searchParams.toString()]);
    const UpdateQuestionnaireQuery = useMutation({
        mutationFn: async () => await axiosInstance().patch(questionnaireURL, {
            duration: timeSelectorCheckbox ? Object.values(questionnaireData.timer).join(':') : null,
            is_active: questionnaireData.is_active,
            title: questionnaireData.title,
            is_required_login: questionnaireData.is_required_login
        }),
        onSuccess: () => {
            toast.success('ذخیره شد')
        },
        onError: (Error: AxiosError) => {
            errorHandler(Error.response);
        }
    })
    if (!params.Id || QSSettingQuery.isError)
        return <QuestionnaireNotFound />


    return <PageContainer>
        {
            QSSettingQuery.isLoading ? <>
                <SettingHeadeLoading />
                <TimeSectionLoading />
                <TargetSectionLoading />
            </> : QSSettingQuery.data?.data && <>
                <QuestionnaireSettingPageHeader questionnaireID={QSSettingQuery.data.data.group_slug}
                    title={questionnaireData.title}
                    setIsActive={() => {
                        setQuestionnaireData((prevState) =>
                            ({ ...prevState, is_active: !prevState.is_active }))
                    }}
                    isActive={questionnaireData.is_active}
                    questionnaireGroupID={searchParams.get('group_id') as string} />
                <QuestionnaireTimingSection questionnaireTimer={QSSettingQuery.data.data.duration}
                    timerCheckBox={[timeSelectorCheckbox, setTimeSelectorCheckbox]}
                    timerValue={questionnaireData.timer}
                    setQuestionnaireTitle={(NewTitle: string) => {
                        setQuestionnaireData((prevState) => ({
                            ...prevState, title: NewTitle
                        }))
                    }}
                    setTimerValue={(value: number, time: 'second' | 'hour' | 'minute') => {
                        setQuestionnaireData((prevState) =>
                            ({ ...prevState, timer: { ...prevState.timer, [time]: value } }))
                    }}
                    title={questionnaireData.title} />
                {ConditionsQuery.isLoading ? <TargetSectionLoading /> : QSSettingQuery.data?.data &&
                    <TargetCommunitySection targets={QSSettingQuery.data.data.conditions}
                        ConditionsQuery={ConditionsQuery}
                        questionnaireID={params.questionnaireID}
                        setIsLoginRequired={(Value: boolean) => {
                            setQuestionnaireData((prevState) => ({
                                ...prevState, is_required_login: Value
                            }))
                        }}
                        conditions={ConditionsQuery.data!.data.results as I_Condition[]}
                        isLoginRequired={questionnaireData.is_required_login} />
                }
                <PageFooter>
                    <SaveButton onClick={() => UpdateQuestionnaireQuery.mutate()}>
                        {UpdateQuestionnaireQuery.isPending ?
                            <SpinnerLoading color={'white'} width={20} height={20} /> : <p>ذخیره</p>}
                    </SaveButton>
                </PageFooter>
            </>
        }
    </PageContainer>
}

export default QuestionnaireSetting;