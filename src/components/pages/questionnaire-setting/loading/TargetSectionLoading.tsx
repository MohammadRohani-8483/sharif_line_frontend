'use client'

import {
    TargetCommunityBoxContainer,
    TargetCommunityBoxHeader,
    TargetCommunityCheckbox,
    TargetItemsContainer,
} from "@/src/styles/pages/questionnaire-setting";
import {Icon} from "@/src/styles/common/icon";
import React from "react";
import {LoadingIcon, LoadingText, TickLoading} from "@/src/styles/common/loading";
import {AddConditionButton} from "@/src/styles/pages/questionnaire-setting/targets-popup";
import {TargetCommunityContainer, TargetItemContainer} from "@/src/styles/pages/questionnaire-setting/page";

export const TargetSectionLoading = () => {
    return <TargetCommunityContainer className={'loading'} targetSelectorOpen={true}>
        <TargetCommunityCheckbox>
            <TickLoading />
            <p>پاسخگویی بدون ورود</p>
        </TargetCommunityCheckbox>
        <TargetCommunityBoxContainer>
            <TargetCommunityBoxHeader>
                <h3>جامعه هدف</h3>
                <span>
                    <LoadingIcon width={24} height={24} background={'#d1d1d1'} />
                </span>
            </TargetCommunityBoxHeader>
            <TargetItemsContainer>
                <TargetItemContainer>
                    <LoadingText>dfhdfhdfhkljklkj</LoadingText>
                    <div className={'target-buttons'}>
                        <AddConditionButton bordercolor={'#FCC8C8'} background={'rgba(255, 0, 0, 0.08)'}>
                            <LoadingIcon width={24} height={24} background={'#d1d1d1'} />
                        </AddConditionButton>
                        <AddConditionButton  bordercolor={'#CCC'} background={'#EEE'}>
                            <LoadingIcon width={24} height={24} background={'#ffc9c9'} />
                        </AddConditionButton>
                    </div>
                </TargetItemContainer>
            </TargetItemsContainer>
        </TargetCommunityBoxContainer>
    </TargetCommunityContainer>
}