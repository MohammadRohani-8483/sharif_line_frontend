import { useEffect, useState } from "react";
import Tick from "@/src/components/common/Tick";
import { Icon } from "@/src/styles/common/icon";
import { TimeSelector } from "@/src/components/pages/questionnaire-setting/TimeSelector";
import { T_SetState } from "@/src/utils/types/global";
import {
    QuestionnaireTimerContainer, QuestionnaireTimingContainer,
    QuestionnaireTitle,
    TimingSection
} from "@/src/styles/pages/questionnaire-setting/page";

export const TimerCalculator = (questionnaireTimer: string | null) => {
    if (!questionnaireTimer)
        return { hour: 8, minute: 20, second: 0 };
    return {
        hour: parseInt(questionnaireTimer.split(':')[0]),
        minute: parseInt(questionnaireTimer.split(':')[1]),
        second: parseInt(questionnaireTimer.split(':')[2])
    }
}

export type T_TimerValue = { hour: number, minute: number, second: number }
type QuestionnaireTimingSectionProp = {
    timerValue: T_TimerValue,
    setTimerValue: (value: number, key: 'minute' | 'hour' | 'second') => void,
    title: string,
    setQuestionnaireTitle: (Value: string) => void,
    questionnaireTimer: string | null
    timerCheckBox: [boolean, T_SetState<boolean>]
}
export const QuestionnaireTimingSection = ({ questionnaireTimer, setQuestionnaireTitle, title, timerValue, setTimerValue, timerCheckBox }:
    QuestionnaireTimingSectionProp) => {
    const [timeSelectorCheckbox, setTimeSelectorCheckbox] = timerCheckBox;
    const [selectorAppear, setSelectorAppear] = useState<boolean>(false);


    useEffect(() => {
        if (questionnaireTimer)
            setTimeSelectorCheckbox(true);
        else
            setTimeSelectorCheckbox(false)
    }, [questionnaireTimer]);

    return <QuestionnaireTimingContainer>
        <TimingSection className={'titleSection'}>
            <p className={'regular-title'}>موضوع پرسشنامه</p>
            <QuestionnaireTitle>
                <input placeholder={''} value={title}
                    className={'questionnaireNameInput'}
                    onChange={(Event) => setQuestionnaireTitle(Event.target.value)} />
            </QuestionnaireTitle>

        </TimingSection>
        <TimingSection className={'timeSection'}>
            <div className={'timing-header'} onClick={() => {
                setTimeSelectorCheckbox(!timeSelectorCheckbox);
                if (selectorAppear)
                    setSelectorAppear(false)
            }}>
                <Tick active={timeSelectorCheckbox} />
                <p className={'regular-title'}>مدت زمان پاسخگویی</p>
            </div>
            <QuestionnaireTimerContainer timerOpen={!timeSelectorCheckbox}>
                <p>{timerValue.hour < 10 ? `0${timerValue.hour}` : timerValue.hour}:{timerValue.minute < 10 ? `0${timerValue.minute}` : timerValue.minute}</p>
                <span className={'timeIconContainer'} onClick={() => {
                    setTimeout(() => {
                        setSelectorAppear(!selectorAppear);
                    }, 50);

                }}>
                    <Icon name={'ClockSquare'} />
                </span>

            </QuestionnaireTimerContainer>
            {<TimeSelector selectorAppear={selectorAppear}
                timerValue={timerValue}
                setSelectorAppear={setSelectorAppear}
                setTimerValue={setTimerValue}
            />
            }
        </TimingSection>

    </QuestionnaireTimingContainer>
}

