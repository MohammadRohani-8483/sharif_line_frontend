"use client";
import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { useMemo } from "react";
import surveyTheme from "@/src/utils/jsons/survey_theme.json";
import { PageCont } from "@/src/styles/common";
import styled from "styled-components";
import {
  T_QuestionResponse,
  T_TitleAndDesc,
} from "@/src/utils/types/pages/answer";
import { Icon } from "@/src/styles/common/icon";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import theme from "@/src/styles/theme";
import { axiosInstance } from "@/src/utils/helper/axios";
import "survey-core/i18n/persian";
import { deletePaymentItem } from "@/src/utils/functions/answer";
import { AnswerCont, TitleCont } from "@/src/styles/pages/answer";

const AnswerPage = ({
  res,
  titleAndDesc,
  error,
}: {
  res: T_QuestionResponse | null;
  titleAndDesc: T_TitleAndDesc | null;
  error: string | null;
}) => {
  const pathname = usePathname();
  const origin = window?.location.origin || "";
  const params = useParams();

  const surveyJson = useMemo(
    () => res?.form && deletePaymentItem(res?.form),
    [res]
  );
  const survey = new Model(surveyJson);
  survey.applyTheme(surveyTheme as any);
  survey.locale = "fa";

  // survey.onServerValidateQuestions.add((sender, options) => {
  //   const results = JSON.stringify(sender.data);
  //   axiosInstance().post('answer/answerset/create', { questionnaire_id: res.id, answers: results })
  //     .then(() => {
  //       options.complete()
  //     })
  //     .catch(() => {
  //       toast.error('مشکلی پیش آمده لطفا مجددا تلاش کنید')
  //     })
  //   })

  survey.onComplete.add((sender, options) => {
    const answers = sender.data;
    toast
      .promise(
        axiosInstance().post<string>("answer/answerset/create", {
          group_slug: params.questionnaireID,
          answers,
        }),
        {
          pending: "لطفا منتظر بمانید",
          error: "مشکلی پیش آمده",
          success: "پاسخ شما با موفقیت ثبت شد",
        }
      )
      .then((response) => {
        if (res?.is_required_payment) location.href = response.data;
      })
      .catch(() => {
        options.showSaveError("مشکلی پیش آمده");
        sender.showCompletedPage = false;
      });
  });

  return (
    <AnswerCont>
      <Icon
        name="logo-answer"
        width={194}
        height={82}
        style={{ margin: "40px auto" }}
      />
      <TitleCont>
        <div className="title">
          <p>{titleAndDesc?.title}</p>
          <div
            className="share"
            onClick={() => {
              navigator.clipboard.writeText(`${origin}${pathname}`);
              toast.success("لینک پرسشنامه با موفقیت کپی شد");
            }}
          >
            <Icon name="share" width={24} height={24} />
          </div>
        </div>
        {titleAndDesc?.description && titleAndDesc.description.length && (
          <div className="desc">{titleAndDesc.description}</div>
        )}
      </TitleCont>
      {res ? (
        <Survey model={survey} />
      ) : (
        <p style={{ margin: "80px auto", fontSize: 18 }}>{error}</p>
      )}
    </AnswerCont>
  );
};

export default AnswerPage;
