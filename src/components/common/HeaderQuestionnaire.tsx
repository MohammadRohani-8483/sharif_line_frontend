"use client";
import { Icon } from "@/src/styles/common/icon";
import React, { useContext, useMemo, useState } from "react";
import { ModalContext } from "@/src/utils/contexts/ModalContext";
import { LogoutPopup } from "@/src/components/common/LayoutComponents/LogoutPopup";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/src/utils/helper/axios";
import { toast } from "react-toastify";
import { Tooltip } from "@/src/components/common/Tooltip";
import {
  PageHeader,
  PageHeaderButton,
  PageHeaderButtons,
  PageHeaderCont,
  TitleCont,
} from "@/src/styles/pages/questionnaire-setting/page";
import Link from "next/link";
import { useSearchParams, usePathname, useParams } from "next/navigation";
import Dropdown from "./Dropdown";
import {
  I_VersionsList,
  T_Version,
} from "@/src/utils/types/pages/questionnaire";

type Props = {
  title: string;
  versionList: I_VersionsList;
};

export const HeaderQuestionnaire = (p: Props) => {
  const searchParams = useSearchParams();
  const params = useParams<{ questionnaireID: string; id?: string }>();
  const pathname = usePathname();

  const groupId = useMemo(
    () => (params.id ? params.questionnaireID : searchParams.get("group_id")!),
    [params]
  );
  const questionnaireId = useMemo(
    () => params.id || params.questionnaireID,
    [params]
  );

  const [activeVersions, setActiveVersions] = useState<T_Version>(
    p.versionList.versions.find((version) => version.id === questionnaireId)!
  );

  const modalContext = useContext(ModalContext);
  const deleteQuestionnaireQuery = useMutation({
    mutationFn: async () =>
      await axiosInstance().delete(
        `question/group-questionnaire/${groupId}/questionnaire/${questionnaireId}`
      ),
  });
  const setModalProp = (Loading: boolean) => {
    if (modalContext)
      modalContext.setModalProp({
        modalBody: (
          <LogoutPopup
            title={"آیا مطمئن هستید؟"}
            confirmText={"حذف"}
            loading={Loading}
            onOkay={deleteQuestionnaireHandler}
            closeModal={modalContext.closeModal}
          />
        ),
        hideHeader: true,
        wrapperStyles: { width: 370, borderRadius: 8 },
      });
  };
  const deleteQuestionnaireHandler = async () => {
    if (modalContext) setModalProp(true);
    deleteQuestionnaireQuery.mutate();
    toast.success("با موفقیت حذف شد");
    if (modalContext) {
      setTimeout(async () => {
        modalContext.closeModal();
        // Get the current URL
        let currentUrl = new URL(window.location.href);
        let params = currentUrl.searchParams;
        params.delete("group_id");
        currentUrl.search = params.toString();
        window.history.replaceState({}, "", currentUrl.toString());
        window.location.pathname = "/";
      }, 300);
    }
  };

  return (
    <PageHeader>
      <PageHeaderCont>
        <TitleCont>
          <p>موضوع پرشنامه</p>
          <h2>{p.title}</h2>
        </TitleCont>
        <Dropdown
          groupId={groupId}
          linkItem={(group, id) => `/${group}/setting/${id}`}
          versionsData={p.versionList}
          activeOption={activeVersions}
          setActiveOption={setActiveVersions}
        />
      </PageHeaderCont>
      <PageHeaderButtons>
        {!pathname.includes("statistics") ||
        searchParams.get("result_stage") ? (
          <Link href={`/${questionnaireId}/statistics?group_id=${groupId}`}>
            <Tooltip
              title={"نمودار"}
              anchorClassName={"chart"}
              placement={"bottom"}
            >
              <PageHeaderButton className={"chart"}>
                <Icon name={"chart"} width={24} height={24} />
              </PageHeaderButton>
            </Tooltip>
          </Link>
        ) : (
          <Link
            href={`/${questionnaireId}/statistics?group_id=${groupId}&result_stage=true`}
          >
            <Tooltip
              title={"لیست نتایج"}
              anchorClassName={"document_text"}
              placement={"bottom"}
            >
              <PageHeaderButton className={"document_text"}>
                <Icon name={"document_text"} width={24} height={24} />
              </PageHeaderButton>
            </Tooltip>
          </Link>
        )}
        {(pathname.includes("setting") || pathname.includes("answer")) && (
          <Link
            href={`/${questionnaireId}/statistics?group_id=${groupId}&result_stage=true`}
          >
            <Tooltip
              title={"لیست نتایج"}
              anchorClassName={"document_text"}
              placement={"bottom"}
            >
              <PageHeaderButton className={"document_text"}>
                <Icon name={"document_text"} width={24} height={24} />
              </PageHeaderButton>
            </Tooltip>
          </Link>
        )}
        <Link href={`/${questionnaireId}/answer`}>
          <Tooltip
            title={"مشاهده"}
            placement={"bottom"}
            anchorClassName={"activate-button-anchor"}
          >
            <PageHeaderButton className={"activate-button-anchor"}>
              <Icon name={"eye"} width={24} height={24} />
            </PageHeaderButton>
          </Tooltip>
        </Link>
        {params.id ? (
          <Tooltip
            title={"حذف پرشنامه"}
            anchorClassName={"delete-button-anchor"}
            placement={"bottom"}
          >
            <PageHeaderButton
              className={"deleteButton delete-button-anchor"}
              onClick={() => {
                if (modalContext) {
                  setModalProp(false);
                  modalContext.openModal();
                }
              }}
            >
              <Icon name={"trash_red"} width={24} height={24} />
            </PageHeaderButton>
          </Tooltip>
        ) : (
          <Link href={`/${groupId}/setting/${questionnaireId}`}>
            <Tooltip
              title={"ننظیمات"}
              placement={"bottom"}
              anchorClassName={"activate-button-anchor"}
            >
              <PageHeaderButton className={"activate-button-anchor"}>
                <Icon name={"settings"} width={24} height={24} />
              </PageHeaderButton>
            </Tooltip>
          </Link>
        )}
      </PageHeaderButtons>
    </PageHeader>
  );
};
