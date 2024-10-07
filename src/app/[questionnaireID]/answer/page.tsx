import AnswerPage from "@/src/components/pages/answer/AnswerPage";
import { axiosInstance } from "@/src/utils/helper/axios";
import { Tokens } from "@/src/utils/store/slices/base";
import {
  T_QuestionResponse,
  T_TitleAndDesc,
} from "@/src/utils/types/pages/answer";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";

const PageAnswer = async ({
  params,
}: {
  params: { questionnaireID: string; token?: string };
}) => {
  console.log(params.token)
  const tokens: Tokens = {
    access: cookies().get("access")?.value || null,
    refresh: cookies().get("refresh")?.value || null,
  };

  let questionJson: T_QuestionResponse | null = null;
  let titleAndDescQuestionnaire: T_TitleAndDesc | null = null;
  let textError: string | null = null;
  try {
    const response = await axiosInstance(tokens).get<T_QuestionResponse>(
      `question/questionnaire/${params.questionnaireID}`
    );
    if (response?.data) questionJson = response?.data;
  } catch (error: any) {
    error.response.status === 403
      ? (textError = error.response.data.error)
      : notFound();
  }
  try {
    const response = await axiosInstance(tokens).get<T_TitleAndDesc>(
      `question/title/${params.questionnaireID}`
    );
    titleAndDescQuestionnaire = response.data;
  } catch (error: any) {
    console.log(error);
    notFound();
  }
  return (
    <AnswerPage
      res={questionJson}
      titleAndDesc={titleAndDescQuestionnaire}
      error={textError}
    />
  );
};

export default PageAnswer;
