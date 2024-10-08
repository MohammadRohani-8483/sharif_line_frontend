"use client";
import Paginate from "@/src/components/common/Paginate";
import DisposableLink from "@/src/components/pages/questionnaire-setting/TargetCommunityPopup/DisposableLink/DisposableLink";
import Version from "@/src/components/pages/questionnaire-setting/version/Version";
import {
  QuestionnaireTimingContainer,
  QuestionnaireTitle,
  TimingSection,
} from "@/src/styles/pages/questionnaire-setting/page";
import { axiosInstance } from "@/src/utils/helper/axios";
import { T_Response } from "@/src/utils/types/global";
import {
  I_Link,
  T_Group_idInitialDataType,
} from "@/src/utils/types/pages/questionnaireSetting";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

export default function Page({
  params,
}: {
  params: { questionnaireID: string };
}) {
  const [DisposableLinkData, setDisposableLinkData] =
    useState<T_Response<I_Link>>();
  const [activeVersion, setActiveVersion] = useState<number>();
  const [isLoginRequired, setIsLoginRequired] = useState(false);
  const [title, setQuestionnaireTitle] = useState("");
  const [activeOrNot, setQuestionnaireActive] = useState(true);

  const questionnaireURL = `/question/group-questionnaire/${params.questionnaireID}`;
  let LinkURL = `/answer/answerlink/${params.questionnaireID}`;

  const changePage = (page: number) => {
    LinkURL = `/answer/answerlink/${params.questionnaireID}` + "/?page=" + page;
    QSLinkQuery.refetch();
  };

  const QSLinkQuery: UseQueryResult<
    AxiosResponse<T_Response<I_Link>, AxiosError>
  > = useQuery({
    queryKey: ["QSLinkQuery"],
    queryFn: async () => {
      let Response: AxiosResponse<
        T_Response<I_Link>,
        any
      > = await axiosInstance().get(LinkURL);
      setDisposableLinkData(Response.data);
      return Response;
    },
  });

  const PatchHandler = async () => {
    let Response: AxiosResponse<T_Group_idInitialDataType, any> =
      await axiosInstance().patch(questionnaireURL, {
        is_active: activeOrNot,
        active_version: activeVersion,
        title: title,
        is_required_login: isLoginRequired,
      });
    if (Response.status == 200) {
      toast("با موفقیت تغییر کرد");
    }

    setQuestionnaireActive(Response.data.is_active);
    setActiveVersion(Response.data.active_version);
  };
  return (
    <ContainerQuestionnairePage>
      <QuestionnaireTimingContainer>
        <TimingSection className={"titleSection"}>
          <p className={"regular-title"}>نام پرسشنامه</p>
          <QuestionnaireTitle>
            <input
              placeholder={""}
              value={title}
              className={"questionnaireNameInput"}
              onChange={(Event) => setQuestionnaireTitle(Event.target.value)}
            />
          </QuestionnaireTitle>
        </TimingSection>
        <TimingSection className={"statusSection"}>
          <p className={"regular-title"}>وضعیت پرسشنامه</p>
          <StatusQuestionnaire active={activeOrNot}>
            <button
              onClick={() => {
                setQuestionnaireActive(true);
              }}
              className="active"
            >
              <p>فعال</p>
            </button>
            <button
              onClick={() => {
                setQuestionnaireActive(false);
              }}
              className="unactive"
            >
              <p>غیرفعال</p>
            </button>
          </StatusQuestionnaire>
        </TimingSection>
      </QuestionnaireTimingContainer>
      <CommunityStatus>
        <DisposableLink
          group_id={params.questionnaireID}
          data={DisposableLinkData?.results}
          status={true}
        />
        <div className="space"></div>
        <Paginate
          activePage={1}
          pageSize={12}
          itemsCount={DisposableLinkData?.count || 0}
          setPage={(page) => changePage(page)}
        />
      </CommunityStatus>
      <Version
        setActiveVersion={(number: number) => setActiveVersion(number)}
        activeVersion={activeVersion}
      />
      <div className="btnMain">
        <button onClick={() => PatchHandler()} className="BTNsave">
          <p>ذخیره</p>
        </button>
      </div>
    </ContainerQuestionnairePage>
  );
}

const ContainerQuestionnairePage = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 32px;
  gap: 16px;
  @media screen and (max-width: 800px) {
    padding: 0 16px;
  }
  .statusSection {
    width: clamp(200px, 23%, 400px);
  }
  .titleSection {
    min-width: 300px;
  }
  .btnMain {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 32px;
  }
  .BTNsave {
    cursor: pointer;
    display: flex;
    padding: 8px 64px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 4px;
    background: var(--Main, #2979ff);
    p {
      color: #fff;
    }
  }
  .space {
    height: 8px;
  }
`;

const CommunityStatus = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const StatusQuestionnaire = styled.div<{ active: boolean }>`
  width: 100%;
  display: flex;
  background-color: #ffffff;
  height: 53px;
  border-radius: 8px;
  border: 1px solid var(--Gray-E, #eee);
  overflow: hidden;
  p {
    font-size: 16px;
    font-weight: 500;
  }
  .active {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 500ms;
    background-color: ${(p) => (p.active ? "#2979ff" : "#ffffff")};
    p {
      color: ${(p) => (p.active ? "#fff" : "#333")};
    }
  }
  .unactive {
    transition: background 500ms;
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    background-color: ${(p) => (!p.active ? "#2979ff" : "#ffffff")};
    color: ${(p) => (!p.active ? "#fff" : "#333")};
    justify-content: center;
  }
`;
