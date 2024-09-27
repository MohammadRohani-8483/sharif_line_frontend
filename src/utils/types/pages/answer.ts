export type T_QuestionResponse = {
  id: string
  title: string
  conditions: any[]
  is_required_payment: boolean
  form: any
  version: number
  is_editable: boolean
  template: string
  duration: string | null
  is_template: boolean
  is_required_login: boolean
  is_active: boolean
}