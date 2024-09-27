import {
    TargetCommunityBoxHeader, TargetCommunityCheckbox
} from "@/src/styles/pages/questionnaire-setting";
import {useEffect, useState} from "react";
import Tick from "@/src/components/common/Tick";
import {TargetCommunityBox} from "@/src/components/pages/questionnaire-setting/TargetCommunityBox";
import {I_Condition} from "@/src/utils/types/pages/questionnaireSetting";
import {T_SetState} from "common-types";
import {UseQueryResult} from "@tanstack/react-query";
import {Accordion} from "@/src/components/common/Accordion";
import {TargetCommunityContainer} from "@/src/styles/pages/questionnaire-setting/page";

type TargetCommunitySectionProp = {
    targets: I_Condition[],
    conditions: I_Condition[],
    setIsLoginRequired: (Value: boolean) => void,
    questionnaireID: string,
    isLoginRequired: boolean ,
    ConditionsQuery : UseQueryResult<any>
}

export const TargetCommunitySection = ({targets, ConditionsQuery , isLoginRequired, conditions, questionnaireID, setIsLoginRequired}
                                           : TargetCommunitySectionProp) => {
    const [targetSelectorOpen, setTargetSelectorOpen] = useState<boolean>(false);

    useEffect(() => {
        setTargetSelectorOpen(isLoginRequired);
    }, [isLoginRequired]);

    return <TargetCommunityContainer targetSelectorOpen={targetSelectorOpen}>
        <TargetCommunityCheckbox onClick={() => {
            setIsLoginRequired(!isLoginRequired);
        }}>
            <Tick active={!isLoginRequired} />
            <p>پاسخگویی بدون ورود</p>
        </TargetCommunityCheckbox>
        <Accordion accordionOpen={isLoginRequired} childID={'targetsSection'}>
            <TargetCommunityBox targets={targets} questionnaireID={questionnaireID}
                                ConditionsQuery={ConditionsQuery}
                                conditions={conditions}/>
        </Accordion>

    </TargetCommunityContainer>
}