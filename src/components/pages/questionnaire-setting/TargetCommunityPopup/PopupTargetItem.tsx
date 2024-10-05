import {I_Condition} from "@/src/utils/types/pages/questionnaireSetting";
import {T_SetState} from "@/src/utils/types/global";
import React from "react";
import {TargetCommunityItem} from "@/src/styles/pages/questionnaire-setting/targets-popup";

export const TargetCommunityItemComponent = ({TargetItem, conditions ,selectedConditions, setSelectedConditions}:
                                                 {
                                                     selectedConditions: I_Condition[], TargetItem: I_Condition,
                                                     setSelectedConditions: T_SetState<I_Condition[]>
                                                     conditions: I_Condition[] ,
                                                 }) => {
    const handleConditionClick = (item: I_Condition) => {
        setSelectedConditions((prevState: I_Condition[]) => {
            const isItemSelected = prevState.some((prevItem) => prevItem.id === item.id);

            return isItemSelected
                ? prevState.filter((prevItem) => prevItem.id !== item.id)
                : [...prevState, item];
        });
    };

    return <TargetCommunityItem $selected={selectedConditions.some((SelectedItem) => SelectedItem.id === TargetItem.id)}
                                onClick={() => {
                                    handleConditionClick(TargetItem);
                                }}>
        {TargetItem.title}
    </TargetCommunityItem>
}