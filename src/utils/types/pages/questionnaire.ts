export type T_QuestionareList = {
  id: string;
  title: string;
  group_created_at: string;
  created_at: string;
  questions_count: number;
  results_count: number;
  is_active: boolean;
  group_id: number;
  group_slug: string;
};
export interface I_ApiQuestionnaireList {
  count: number;
  next: null | string;
  previous: null | string;
  results: T_QuestionareList[];
}

export type T_Version = {
  id: string; // uuid
  version: number;
  created_at: string;
};

export interface I_VersionsList {
  id: number; // group_id
  is_active: boolean;
  active_version: number; // version
  versions: T_Version[];
}
