import { HeaderQuestionnaire } from "@/src/components/common/HeaderQuestionnaire";
import { PageContainer } from "@/src/styles/pages/questionnaire-setting/page";
import { axiosInstance } from "@/src/utils/helper/axios";
import { Tokens } from "@/src/utils/store/slices/base";
import { I_VersionsList } from "@/src/utils/types/pages/questionnaire";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

type Props = {
  params: { questionnaireID: string; id: string };
};

export default async function Page(p: Props) {
  const tokens: Tokens = {
    access: cookies().get("access")?.value || null,
    refresh: cookies().get("refresh")?.value || null,
  };
  let versionsList: I_VersionsList | null = null;

  try {
    const { data: versionsData } = await axiosInstance(
      tokens
    ).get<I_VersionsList>(
      `question/group-questionnaire/${p.params.questionnaireID}/`
    );
    versionsList = versionsData;
  } catch (error) {
    console.log(error);
    notFound();
  }
  return (
    <PageContainer>
      <HeaderQuestionnaire
        versionList={versionsList!}
        title="انتخابات ریاست جمهوری"
      />
    </PageContainer>
  );
}
