'use client'
import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { useMemo } from 'react';
import surveyTheme from '@/src/utils/jsons/survey_theme.json'
import { PageCont } from '@/src/styles/common';
import styled from 'styled-components';
import { T_QuestionResponse } from '@/src/utils/types/pages/answer';
import { Icon } from '@/src/styles/common/icon';
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { toast } from 'react-toastify';
import theme from '@/src/styles/theme';
import { axiosInstance } from '@/src/utils/helper/axios';
import "survey-core/i18n/persian";
import { deletePaymentItem } from '@/src/utils/functions/answer';

const AnswerPage = ({ res, title, error }: { res: T_QuestionResponse | null, title: string, error: string | null }) => {
  const pathname = usePathname()
  const origin = window?.location.origin || '';
  const params = useParams()

  const surveyJson = useMemo(() => res?.form && deletePaymentItem(res?.form), [res])
  const survey = new Model(surveyJson);
  survey.applyTheme(surveyTheme as any)
  survey.locale = 'fa'

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
    const answers = sender.data
    toast.promise(axiosInstance().post<string>('answer/answerset/create', { group_slug: params.questionnaireID, answers }), {
      pending: 'لطفا منتظر بمانید',
      error: 'مشکلی پیش آمده',
      success: 'پاسخ شما با موفقیت ثبت شد'
    })
      .then(response => {
        if (res?.is_required_payment) location.href = response.data
      })
      .catch(() => {
        options.showSaveError('مشکلی پیش آمده')
        sender.showCompletedPage = false
      })
  })

  return <Container>
    <Icon name='logo-answer' width={194} height={82} style={{ margin: '40px auto' }} />
    <TitleCont>
      <p>{title}</p>
      <div
        onClick={() => {
          navigator.clipboard.writeText(`${origin}${pathname}`)
          toast.success('لینک پرسشنامه با موفقیت کپی شد')
        }}
      >
        <Icon name='share' width={24} height={24} />
      </div>
    </TitleCont>
    {res ?
      <Survey model={survey} />
      :
      <p style={{ margin: '80px auto', fontSize: 18 }}>{error}</p>
    }
  </Container>
}

export default AnswerPage

const Container = styled(PageCont)`
  font-family: 'IranYekan' !important;
  color: ${theme.colors.neutral[3]} !important;
  *{
    transition: all 0.1s;
  }

  .sv-header{
    display: none;
  }
  .sd-rating__min-text ,.sd-rating__max-text{
    display: none;
  }
  .sd-body, .sd-body--responsive{
    padding: 50px 4px !important;
  }
  .sd-rating__item{
    border-radius: 16px;
    border: 1px solid ${p => p.theme.colors.neutral.e};
    box-shadow: none;
    cursor: pointer;
  }
  .sd-action-bar{
    justify-content: flex-end;
  }
  .sd-error{
    text-align: right;
  }
  .sd-completedpage{
    padding: 32px !important;
    border-radius: 12px;
    border: 1px solid ${theme.colors.neutral.e};
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: fit-content;
    margin: auto;
    margin-top: 80px;
    &::after ,&::before{
      content: '';
      width: 0;
      height: 0;
      margin: 0 !important;
    }
    h3{
      font-size: 20px;
      font-weight: 600;
    }
    h4{
      font-size: 20px;
      font-weight: 300;
    }
  }
  .sd-action:not(.sd-action--pressed):hover ,.sd-action:not(.sd-action--pressed):focus{
    background-color: ${theme.colors.neutral.hover};
  }
  .sv-ranking-item__index{
    background-color: ${theme.colors.mainBack.main};
    color: ${theme.colors.main};
    svg{
      fill: ${theme.colors.main};
    }
  }
  button ,.svc-btn{
    border-radius: 8px;
    background-color: ${theme.colors.mainBack.main};
    padding: 8px;
    color: ${theme.colors.main};
    cursor: pointer;
    
    &:hover{
      background-color: ${theme.colors.mainBack.hover};
    }
  }
`

const TitleCont = styled.div`
  width: 100%;
  border-radius: 16px;
  background-color: white;
  padding: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${p => p.theme.colors.neutral.e};

  p{
    font-size: 18px;
    font-weight: 600;
    max-width: 200px;
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    
    display: -moz-box !important;
    -moz-line-clamp: 2;
    -moz-box-orient: vertical;  
    
    overflow: hidden;
    text-overflow: ellipsis;
    
    @media(min-width: ${theme.breakpoints.sm}){
      max-width: 400px;
    }
    @media(min-width: ${theme.breakpoints.md}){
      font-size: 24px;
      max-width: 500px;
    }
    @media(min-width: ${theme.breakpoints.lg}){
      max-width: 800px;
    }
  }

  div{
    width: 44px;
    height: 44px;
    background-color: ${p => p.theme.colors.neutral.fa};
    border: 1px solid ${p => p.theme.colors.neutral.e};
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover{
      background-color: ${p => p.theme.colors.neutral.e};
    }
  }
`