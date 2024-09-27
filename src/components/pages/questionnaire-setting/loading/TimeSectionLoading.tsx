'use client'


import Tick from "@/src/components/common/Tick";
import {Icon} from "@/src/styles/common/icon";
import {TimeSelector} from "@/src/components/pages/questionnaire-setting/TimeSelector";
import {TickLoading} from "@/src/styles/common/loading";
import {
    QuestionnaireTimerContainer, QuestionnaireTimingContainer,
    QuestionnaireTitle,
    TimingSection
} from "@/src/styles/pages/questionnaire-setting/page";

export const TimeSectionLoading = () => {
    return <QuestionnaireTimingContainer className={'loading'}>
        <TimingSection className={'titleSection'}>
            <p className={'regular-title'}>موضوع پرسشنامه</p>
            <QuestionnaireTitle>
                <span className={'inputLoading'}>Mostafa to hammmmmmmmmm? are</span>
            </QuestionnaireTitle>
        </TimingSection>
        <TimingSection className={'timeSection'}>
            <div className={'timing-header'}>
                <TickLoading />
                <p className={'regular-title'}>مدت زمان پاسخگویی</p>
            </div>
            <QuestionnaireTimerContainer timerOpen={false}>
                <p className={'timer-value'}>dfghfjghkgjfg</p>
                <span className={'timeIconContainer'}>
                    <Icon name={'ClockSquare'}/>
                </span>
            </QuestionnaireTimerContainer>
        </TimingSection>
    </QuestionnaireTimingContainer>
}