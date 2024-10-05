"use client";
import Loading from "@/src/app/loading";
import Button from "@/src/components/common/Button";
import { HeaderQuestionnaire } from "@/src/components/common/HeaderQuestionnaire";
import Status from "@/src/components/common/Status";
import Tick from "@/src/components/common/Tick";
import { TimerCalculator } from "@/src/components/pages/questionnaire-setting/QuestionnaireTimingSection";
import { TargetCommunitySection } from "@/src/components/pages/questionnaire-setting/TargetCommunitySection";
import { TimeSelector } from "@/src/components/pages/questionnaire-setting/TimeSelector";
import { Text } from "@/src/styles/common";
import { Icon } from "@/src/styles/common/icon";
import { SaveButton } from "@/src/styles/pages/questionnaire-setting";
import {
  PageFooter,
  QuestionnaireTimerContainer,
  TimingSection,
} from "@/src/styles/pages/questionnaire-setting/page";
import {
  BodyCont,
  Description,
  LeftSideDesc,
  StatusVersion,
  TextareaDescription,
} from "@/src/styles/pages/settingVersion";
import { errorHandler } from "@/src/utils/functions/errorHandler";
import { axiosInstance } from "@/src/utils/helper/axios";
import { T_Response } from "@/src/utils/types/global";
import { I_GroupData } from "@/src/utils/types/pages/questionnaire";
import {
  I_ApiQSSettingResponse,
  I_Condition,
} from "@/src/utils/types/pages/questionnaireSetting";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

export default function ClientSettingVersion(p: {
  groupData: I_GroupData | null;
  versionData: I_ApiQSSettingResponse | null;
}) {
  const params = useParams<{ id: string; questionnaireID: string }>();
  const searchParams = useSearchParams();

  const questionnaireUrl = useMemo(
    () => `question/group-questionnaire/${params.questionnaireID}`,
    [params]
  );

  const [timeSelectorCheckbox, setTimeSelectorCheckbox] = useState(false);
  const [data, setData] = useState({
    timer: TimerCalculator(p.versionData?.duration || null),
    isRequiredLogin: p.versionData?.is_required_login || false,
    desc: p.versionData?.description || "",
  });
  const [selectorAppear, setSelectorAppear] = useState(false);

  const {
    data: groupData,
    isLoading: groupLoading,
    refetch: groupRefetch,
  } = useQuery({
    queryKey: ["groupData"],
    initialData: p.groupData,
    queryFn: async () => {
      let response = await axiosInstance().get<I_GroupData>(questionnaireUrl);
      return response.data;
    },
  });

  const {
    data: versionData,
    isLoading: versionLoading,
    refetch: versionRefetch,
  } = useQuery({
    queryKey: ["settingVersion"],
    initialData: p.versionData,
    queryFn: async () => {
      let response = await axiosInstance().get<I_ApiQSSettingResponse>(
        questionnaireUrl + `/questionnaire/${params.id}`
      );
      setData({
        timer: TimerCalculator(response.data.duration || null),
        isRequiredLogin: response.data.is_required_login,
        desc: response.data.description || "",
      });
      return response.data;
    },
  });

  const ConditionsQuery = useQuery({
    queryKey: ["ConditionQuery"],
    enabled: false,
    queryFn: async () =>
      await axiosInstance().get<T_Response<I_Condition>>(
        `/question/condition${
          searchParams.get("search")
            ? "?search=" + searchParams.get("search")
            : ""
        }`
      ),
  });

  const isActiveVersion = useMemo(
    () => versionData?.version === groupData?.active_version,
    [groupData, versionData]
  );

  const UpdateQuestionnaireQuery = useMutation({
    mutationFn: async (type: "activate" | "update") => {
      const patchData =
        type === "update"
          ? {
              duration: timeSelectorCheckbox
                ? Object.values(data.timer).join(":")
                : null,
              is_required_login: data.isRequiredLogin,
              description: data.desc,
            }
          : {
              active_version: versionData?.version,
            };
      const url = `${questionnaireUrl}/${
        type === "update" ? `questionnaire/${params.id}` : ""
      }`;
      console.log(url);
      await axiosInstance().patch(url, patchData);
      await groupRefetch();
      await versionRefetch();
    },
    onSuccess: () => {
      toast.success("ذخیره شد");
    },
    onError: (Error: AxiosError) => {
      errorHandler(Error.response);
    },
  });

  useEffect(() => {
    ConditionsQuery.refetch();
  }, [searchParams.toString()]);

  useEffect(() => {
    if (versionData?.duration) setTimeSelectorCheckbox(true);
    else setTimeSelectorCheckbox(false);
  }, [versionData?.duration]);

  return (
    <>
      <HeaderQuestionnaire
        groupData={p.groupData}
        title={versionData?.title || ""}
      />
      <BodyCont>
        <Description>
          <Text color="#333">توضیحات نسخه</Text>
          <TextareaDescription
            onChange={(e) => setData((p) => ({ ...p, desc: e.target.value }))}
            value={data.desc}
          />
        </Description>
        <LeftSideDesc>
          <StatusVersion>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Text color="#333">وضعیت :</Text>
              <Status isActive={isActiveVersion} />
            </div>
            <Button
              disabled={isActiveVersion}
              style={{ width: "100%", height: 44 }}
              onClick={() => UpdateQuestionnaireQuery.mutate("activate")}
            >
              تنظیم به عنوان فعال
            </Button>
          </StatusVersion>
          <div
            style={{ width: "70%", padding: 0.5, backgroundColor: "#eee" }}
          />
          <TimingSection className={"timeSection"}>
            <div
              className={"timing-header"}
              onClick={() => {
                setTimeSelectorCheckbox(!timeSelectorCheckbox);
                if (selectorAppear) setSelectorAppear(false);
              }}
            >
              <Tick active={timeSelectorCheckbox} />
              <p className={"regular-title"}>مدت زمان پاسخگویی</p>
            </div>
            <QuestionnaireTimerContainer timerOpen={!timeSelectorCheckbox}>
              <p>
                {data.timer.hour < 10 ? `0${data.timer.hour}` : data.timer.hour}
                :
                {data.timer.minute < 10
                  ? `0${data.timer.minute}`
                  : data.timer.minute}
              </p>
              <span
                className={"timeIconContainer"}
                onClick={() => {
                  setTimeout(() => {
                    setSelectorAppear(!selectorAppear);
                  }, 50);
                }}
              >
                <Icon name={"ClockSquare"} />
              </span>
            </QuestionnaireTimerContainer>
            {
              <TimeSelector
                selectorAppear={selectorAppear}
                timerValue={data.timer}
                setSelectorAppear={setSelectorAppear}
                setTimerValue={(
                  value: number,
                  time: "second" | "hour" | "minute"
                ) => {
                  setData((p) => ({
                    ...p,
                    timer: { ...p.timer, [time]: value },
                  }));
                }}
              />
            }
          </TimingSection>
        </LeftSideDesc>
      </BodyCont>
      <TargetCommunitySection
        targets={versionData?.conditions || []}
        ConditionsQuery={ConditionsQuery}
        questionnaireID={params.id}
        setIsLoginRequired={(Value: boolean) => {
          setData((p) => ({
            ...p,
            isRequiredLogin: Value,
          }));
        }}
        conditions={ConditionsQuery.data?.data?.results || []}
        isLoginRequired={data.isRequiredLogin}
      />
      <PageFooter>
        <SaveButton onClick={() => UpdateQuestionnaireQuery.mutate("update")}>
          <p>ذخیره</p>
        </SaveButton>
      </PageFooter>
      {(UpdateQuestionnaireQuery.isPending ||
        groupLoading ||
        versionLoading) && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#00000050",
            zIndex: 100,
          }}
        >
          <Loading />
        </div>
      )}
    </>
  );
}
