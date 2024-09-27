import AnswerPage from '@/src/components/pages/answer/AnswerPage'
import { axiosInstance } from '@/src/utils/helper/axios'
import { Tokens } from '@/src/utils/store/slices/base'
import { T_QuestionResponse } from '@/src/utils/types/pages/answer'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import React from 'react'

const Page = async ({ params }: { params: { questionnaireID: string } }) => {
  const tokens: Tokens = {
    access: cookies().get('access')?.value || null,
    refresh: cookies().get('refresh')?.value || null
  }

  let questionJson: T_QuestionResponse | null = null
  let titleQuestionnaire: string | null = null
  let textError: string | null = null
  try {
    const response = await axiosInstance(tokens).get<T_QuestionResponse>(`question/questionnaire/${params.questionnaireID}`)
    if (response?.data)
      questionJson = response?.data
  } catch (error: any) {
    error.response.status === 403 ?
      textError = error.response.data.error
      :
      notFound()
  }
  try {
    const response = await axiosInstance(tokens).get<T_QuestionResponse>(`question/title/${params.questionnaireID}`)
    titleQuestionnaire = response.data.title
  } catch (error: any) {
    console.log(error)
    notFound()
  }
  return <AnswerPage res={questionJson} title={titleQuestionnaire} error={textError} />
}

export default Page