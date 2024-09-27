'use client'


import React from "react";
import {
    PageHeader,
    PageHeaderButton,
    PageHeaderButtons,
    PageHeaderTitle
} from "@/src/styles/pages/questionnaire-setting/page";

export const SettingHeadeLoading = () => {
    return <PageHeader>
        <PageHeaderTitle className={'loading'}>
            <p>موضوع پرسشنامه</p>
            <h2 className={'headerTitle'}>loadng yum yum nigga</h2>
        </PageHeaderTitle>
        <PageHeaderButtons>
            <PageHeaderButton loading={true}>
                <span className={'headerButton'}></span>
            </PageHeaderButton>
            <PageHeaderButton loading={true}>
                <span className={'headerButton'}></span>
                {/*<Icon name={isActive ? 'eye' : 'eye_closed'} width={24} height={24} />*/}
            </PageHeaderButton>
            <PageHeaderButton loading={true} className={'deleteButton'}>
                <span className={'headerButton'}></span>
            </PageHeaderButton>
        </PageHeaderButtons>
    </PageHeader>
}