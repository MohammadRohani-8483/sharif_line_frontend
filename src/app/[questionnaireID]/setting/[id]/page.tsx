import Button from "@/src/components/common/Button";
import { HeaderQuestionnaire } from "@/src/components/common/HeaderQuestionnaire";
import Status from "@/src/components/common/Status";
import { Text } from "@/src/styles/common";
import { PageContainer } from "@/src/styles/pages/questionnaire-setting/page";
import {
  BodyCont,
  Description,
  LeftSideDesc,
  StatusVersion,
  TextareaDescription,
} from "@/src/styles/pages/settingVersion";
import { axiosInstance } from "@/src/utils/helper/axios";
import { Tokens } from "@/src/utils/store/slices/base";
import { I_GroupData } from "@/src/utils/types/pages/questionnaire";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import ClientSettingVersion from "./client";
import { I_ApiQSSettingResponse } from "@/src/utils/types/pages/questionnaireSetting";

type Props = {
  params: { questionnaireID: string; id: string };
};

export default async function Page(p: Props) {
  const tokens: Tokens = {
    access: cookies().get("access")?.value || null,
    refresh: cookies().get("refresh")?.value || null,
  };
  let groupData: I_GroupData | null = null;
  let versionData: I_ApiQSSettingResponse | null = null;

  try {
    const response = await axiosInstance(tokens).get<I_GroupData>(
      `question/group-questionnaire/${p.params.questionnaireID}/`
    );
    groupData = response.data;
  } catch (error) {
    console.log(error);
    notFound();
  }

  try {
    const response = await axiosInstance().get<I_ApiQSSettingResponse>(
      `question/group-questionnaire/${p.params.questionnaireID}/questionnaire/${p.params.id}`
    );
    versionData = response.data;
  } catch (error) {
    console.log(error);
    notFound();
  }

  const isActive =
    groupData.active_version ===
    groupData?.versions.find((version) => version.id === p.params.id)?.version;

  return (
    <PageContainer>
      <ClientSettingVersion versionData={versionData} groupData={groupData} />
    </PageContainer>
  );
}
