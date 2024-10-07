import {T_TimerValue} from "@/src/components/pages/questionnaire-setting/QuestionnaireTimingSection";
import {T_SetState} from "@/src/utils/types/global";
import {UseQueryResult} from "@tanstack/react-query";
import {AxiosResponse} from "axios/index";

export interface I_ApiQSSettingResponse {
    "id": string,
    "title": string,
    "conditions": I_Condition[],
    "form": {
        "logo": string,
        "pages": [
            {
                "name": string,
                "title": string,
                "elements": [
                    {
                        "name": string,
                        "type": string,
                        "title": string,
                        "choices": string[],
                        "noneText": string,
                        "isRequired": boolean,
                        "showNoneItem": boolean
                    },
                ]
            }
        ],
        "title": string,
        "width": string,
        "logoFit": string,
        "widthMode": string,
        "description": string,
        "completeText": string,
        "logoPosition": string,
        "questionsOnPageMode": string,
        "showQuestionNumbers": string,
        "questionErrorLocation": string,
        "showPreviewBeforeComplete": string
    },
    "version": number,
    "is_editable": boolean,
    "template": "S",
    "duration": string | null,
    "is_template": boolean,
    "is_required_login": boolean,
    "is_active": boolean
    "group_slug": string
}
export interface I_ApiLinkResponse {
    "count": number,
    "next": null | string,
    "previous": null | string,
    "results": I_Link[]
}
export interface I_Link {
    link: string
    token: string
    is_used: boolean
    created_at: string
  }
  export type T_Group_idInitialDataType = {
    id: number
    group_slug: string
    is_active: boolean
    active_version: number
    versions: T_Version[]
    title:string
  }
  
  export interface T_Version {
    id: string
    version: number
    created_at: string
    description:string
  }

export interface I_Communication {
    "id": number,
    "title": string
}
export type T_ExceptionItem = { user : string | null , national_code : string , id : number }
export interface I_Condition {
    "id": number,
    "title": string,
    "communication": I_Communication[],
    "grade": "B" | "M" | "D" | null,
    "gender": "M" | 'F' | null,
    "major": I_Communication[] | null,
    "can_view": boolean ,
    except_users : T_ExceptionItem[] ,
    extra_users : T_ExceptionItem[] ,
    from_year : string | null ,
    to_year : string | null
}

export interface I_ApiConditionResponse {
    "count": number,
    "next": null | string,
    "previous": null | string,
    "results": I_Condition[]
}

export interface I_ApiCommunicationResponse {
    "count": number,
    "next": null | string,
    "previous": null | string,
    "results": I_Communication[]
}


export type T_QuestionnaireInitialDataType = {
    timer :  T_TimerValue ,
    is_active : boolean ,
    title : string ,
    is_required_login : boolean
}
export type T_TargetCommunityPopupProp = {
    createMode: boolean,
    setSelectedConditions: T_SetState<I_Condition[]>,
    setCreateMode: T_SetState<boolean>,
    targets: I_Condition[],
    selectedConditions: I_Condition[],
    conditions: I_Condition[],
    targetData: Omit<I_Condition, 'id'>,
    setTargetData: T_SetState<Omit<I_Condition, 'id'>>,
    ConditionsQuery: UseQueryResult<AxiosResponse<I_ApiConditionResponse>>
}
export type T_PopupFooter = {
    createMode: boolean,
    buttonText: string,
    onClick: () => void,
    loading?: boolean,
    setCreateMode: T_SetState<boolean>
}
export type T_TargetBoxProps = {
    targets : I_Condition[] ,
    ConditionsQuery : UseQueryResult<AxiosResponse<I_ApiConditionResponse>> ,
    questionnaireID : string ,
    conditions : I_Condition[]
}