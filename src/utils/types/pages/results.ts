import { T_Response } from "../global"

export type Title = {
  id: number
  title: string
  text: string
}
export type Question = {
  id: number
  answer_type: "T" | "N" | "O" | "W"
  title: string
  options: Title[]
}
export type Answer = {
  id: number | null
  type: "number" | "text" | "option"
  answer: string | number | null
  question: {
    id: number
    title: string
    options: Title[]
  }
  options: number[]
}
type T_Result = {
  id: number
  created_at: string
  result: Answer[]
}

export type T_ResultResponse = (T_Response<T_Result> & { questions: Question[] })