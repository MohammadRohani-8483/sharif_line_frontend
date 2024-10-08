export type T_QuestionnaireList = {
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

export type T_Version = {
  id: string; // uuid
  version: number;
  created_at: string;
  description: string | null;
};

export interface I_GroupData {
  id: number; // group_id
  is_active: boolean;
  group_slug: string;
  active_version: number; // version
  versions: T_Version[];
}
