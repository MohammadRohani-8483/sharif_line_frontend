import {
    TargetCommunityBoxContainer,
    TargetCommunityBoxHeader, TargetItemsContainer,
} from "@/src/styles/pages/questionnaire-setting";
import {Icon} from "@/src/styles/common/icon";
import {useContext, useEffect, useState} from "react";
import {ModalContext, T_ModalContext} from "@/src/utils/contexts/ModalContext";
import {
    TargetCommunityFooter,
    TargetCommunityPopupBody,
    TargetCommunitySearchBar
} from "@/src/components/pages/questionnaire-setting/TargetCommunityPopup/TargetCommunityPopup";
import {I_Condition, T_TargetBoxProps} from "@/src/utils/types/pages/questionnaireSetting";
import {useMutation} from "@tanstack/react-query";
import {axiosInstance} from "@/src/utils/helper/axios";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {initialTargetData} from "@/src/utils/staticData/target";
import ENDPOINTS from '@/src/utils/jsons/endpoints.json'
import {toast} from "react-toastify";
import {queryClient} from "@/src/app/client";
import {errorHandler} from "@/src/utils/functions/errorHandler";
import {AxiosError} from "axios";
import {TargetComponent} from "@/src/components/pages/questionnaire-setting/TargetCommunityPopup/TargetComponent";
import {NoTargetContainer} from "@/src/styles/pages/questionnaire-setting/targets-popup";

const popSuccessHandler = (message : string,modalContext : T_ModalContext | null) => {
    if(modalContext)
        modalContext.closeModal();
    toast.success(message);
}

export const TargetCommunityBox = (props : T_TargetBoxProps) => {
    const { push } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const urlSearchParams = new URLSearchParams(searchParams);
    const modalContext = useContext(ModalContext);
    const [ createMode , setCreateMode ] = useState<boolean>(false);
    const [ selectedConditions , setSelectedConditions ] = useState<I_Condition[]>([]);
    const [ editConditionID , setEditConditionID ] = useState<number | null>(null);
    const [targetData, setTargetData] = useState<Omit<I_Condition, 'id'>>(initialTargetData);
    const [ disableEditOrAdd , setDisableEditOrAdd ] = useState(true);


    const convertListHandler = (data : Omit<I_Condition, 'id'>) => {
        let conditionPostData : any = {...data};
        conditionPostData.communication = targetData.communication.map((CommItem ) => CommItem.id);
        conditionPostData.major = targetData.major?.map((MajorItem) => MajorItem.id);
        return conditionPostData
    }

    const confirmCondition = useMutation({
        mutationFn : async (ConditionsList? : I_Condition[]) => {
            await Promise.all([
                axiosInstance().patch(`/question/group-questionnaire/${searchParams.get('group_id')}/questionnaire/${props.questionnaireID}`,{
                    conditions : ConditionsList ? ConditionsList.map((ConditionItem) => ConditionItem.id) :
                        selectedConditions.map((ConditionItem) => ConditionItem.id),
                    is_required_login : true
                }),
                setTimeout(() => queryClient.invalidateQueries({ queryKey : ['QSSettingQuery'] }),400)
            ])

        },
        onSuccess : () => popSuccessHandler('ذخیره شد',modalContext),
        onError : (Error : AxiosError) =>errorHandler(Error.response),
        onMutate : () => setModalProps(true),
        onSettled : () => setModalProps(false)
    } as any)

    const updateCondition = useMutation({
        mutationFn : async () => {
            await axiosInstance().patch(`/question/condition/${editConditionID}`,convertListHandler(targetData));
            // await queryClient.invalidateQueries({ queryKey : ['ConditionQuery'] })
            await props.ConditionsQuery.refetch();
            await queryClient.invalidateQueries({ queryKey : ['QSSettingQuery'] })
        },
        onSuccess : () => popSuccessHandler('با موفقیت ذخیره شد',modalContext),
        onError : (Error : AxiosError) =>errorHandler(Error.response),
        onMutate : () => setModalProps(true),
        onSettled : () => setModalProps(false)
    } as any)

    const createCondition = useMutation({
        mutationFn : async () => {
            let { data } : { data : I_Condition } = await axiosInstance().post(ENDPOINTS.CONDITION,convertListHandler(targetData));
            await confirmCondition.mutate([...selectedConditions , data] as any)

        },
        onSuccess : () => {
            setTimeout(() => setCreateMode(false),100);
            popSuccessHandler('با موفقیت ذخیره شد',modalContext);
        },
        onError : (Error : AxiosError) =>errorHandler(Error.response),
        onMutate : () => setModalProps(true),
        onSettled : () => setModalProps(false)
    } as any)
    const confirmConditions = async () => {
        confirmCondition.mutate(selectedConditions as any);
    }
    const changeConditionHandler = async () => {
        if(editConditionID)
            updateCondition.mutate();
        else
            createCondition.mutate();
    }
    useEffect(() => {
        if(props.targets.length)
            setSelectedConditions(props.targets);
    }, [props.targets]);
    const customCloseModalHandler = async () => {
        if(!modalContext)
            return

        urlSearchParams.delete('search');
        push(`${pathname}?${urlSearchParams.toString()}`);

        modalContext.closeModal();
        modalContext.setModalProp({  });

        setTimeout(async () => {
            setCreateMode(false);
        },30);

    }
    const setModalProps = (Loading? : boolean) => {
        if(modalContext)
            modalContext.setModalProp({
                wrapperStyles: { width : 880 , height : createMode ? 600 : 495 , transition : 'height opacity 0.3s' } ,
                modalBody: <TargetCommunityPopupBody targets={props.targets}
                                                     targetData={targetData}
                                                     setTargetData={setTargetData}
                                                     conditions={props.conditions}
                                                     ConditionsQuery={props.ConditionsQuery}
                                                     selectedConditions={selectedConditions}
                                                     setSelectedConditions={setSelectedConditions}
                                                     createMode={createMode}
                                                     setCreateMode={setCreateMode} /> ,
                modalTitle: 'ایجاد جامعه هدف' ,
                modalHeaderAdditionalComponent: createMode ? <></> : <TargetCommunitySearchBar setCreateMode={setCreateMode} /> ,
                customCloseModalAction: customCloseModalHandler ,
                modalFooter : <TargetCommunityFooter buttonText={createMode ? editConditionID ? 'ذخیره' : 'افزودن' : 'ذخیره'}
                                                     loading={Loading}
                                                     createMode={createMode}
                                                     setCreateMode={setCreateMode}
                                                     onClick={() => createMode ? changeConditionHandler() : confirmConditions()} />
            })
    }
    useEffect(() => {
        if(modalContext && modalContext.modalOpen)
            setModalProps();
    }, [createMode , selectedConditions , targetData , disableEditOrAdd , props.conditions]);

    return <>
        <TargetCommunityBoxContainer id={'targetsSection'}>
            <TargetCommunityBoxHeader>
                <h3>جامعه هدف</h3>
                <span onClick={() => {
                    if(modalContext) {
                        setCreateMode(false);
                        setEditConditionID(null);
                        setTargetData(initialTargetData);
                        setModalProps();
                        setTimeout(() => {
                            modalContext.openModal();
                        },10);
                    }
                }}>
                    <Icon name={'plus'} width={14} height={14}/>
                </span>
            </TargetCommunityBoxHeader>
            { props.targets.length ? <TargetItemsContainer>
                { props.targets.map((TargetItem) => <TargetComponent setEditConditionID={setEditConditionID}
                                                               setCreateMode={setCreateMode}
                                                               setSelectedConditions={setSelectedConditions}
                                                               setDisableEditOrAdd={setDisableEditOrAdd}
                                                               setAddTargetModalProp={setModalProps}
                                                               questionnaireID={props.questionnaireID}
                                                               selectedConditions={selectedConditions}
                                                               setTargetData={() => {
                                                                   let targetObj : any = {...TargetItem};
                                                                   delete targetObj.id;
                                                                   setTargetData(targetObj)
                                                               }}
                                                               openModal={modalContext!.openModal}
                                                               targetData={TargetItem} />)}
                </TargetItemsContainer>
                : <NoTargetContainer>
                <Icon name={'Frame9'} width={120} height={120}/>
            </NoTargetContainer>}
        </TargetCommunityBoxContainer>
    </>
}