import {
    AddTargetInput
} from "@/src/styles/pages/questionnaire-setting";
import Tick from "@/src/components/common/Tick";
import {useEffect, useState} from "react";
import {I_Communication, I_Condition} from "@/src/utils/types/pages/questionnaireSetting";
import {T_InputEvent, T_SetState} from "@/src/utils/types/global";
import {GenderBox} from "@/src/components/pages/questionnaire-setting/TargetCommunityPopup/GenderBox";
import {CommunitySelector} from "@/src/components/pages/questionnaire-setting/TargetCommunityPopup/CommunitySelector";
import {MajorsSection} from "@/src/components/pages/questionnaire-setting/TargetCommunityPopup/Majors";
import {TargetSlider} from "@/src/components/pages/questionnaire-setting/TargetCommunityPopup/Slider";
import {ExceptionBox} from "@/src/components/pages/questionnaire-setting/TargetCommunityPopup/ExceptionBox";
import {ConditionCheckBoxSection, ConditionCheckboxTitle} from "@/src/styles/pages/questionnaire-setting/targets-popup";


export const AddTargetCommunity = ({targetData, setTargetData}:
                                       {
                                           targetData: Omit<I_Condition, 'id'>,
                                           setTargetData: T_SetState<Omit<I_Condition, 'id'>>
                                       }) => {
    const [genderCheckbox, setGenderCheckbox] = useState(false);
    const [majorCheckBox, setMajorCheckbox] = useState(false);
    const [entryYearCheckbox, setEntryYearCheckbox] = useState(false);

    useEffect(() => {
        if (targetData.from_year && targetData.to_year)
            setEntryYearCheckbox(true);
        else
            setEntryYearCheckbox(false);
        (targetData.major?.length) ? setMajorCheckbox(true) : setMajorCheckbox(false)

        if (targetData.gender)
            setGenderCheckbox(true);
        else
            setGenderCheckbox(false);
    }, [targetData]);

    const updateListHandler = (ListName: 'communication' | 'major', ListItem: I_Communication) => {
        setTargetData((prevState) => {
            if (prevState[ListName] === null)
                return {...prevState, [ListName]: [ListItem]}
            let prevCOMMList = prevState[ListName];
            const isItemSelected = prevState[ListName]!.some((Item) => Item.id === ListItem.id);
            if (isItemSelected)
                return {...prevState, [ListName]: prevCOMMList!.filter((Item) => Item.id !== ListItem.id)}
            else
                return {...prevState, [ListName]: [...prevCOMMList, ListItem]}
        })
    }

    return <>
        <p>عنوان</p>
        <AddTargetInput value={targetData.title}
                        onChange={(Event: T_InputEvent) => {
                            setTargetData(prevState => {
                                return {...prevState, title: Event.target.value}
                            });
                        }}
                        placeholder={'عنوان'}/>
        <span className={'gray-title'}>شرط</span>
        <CommunitySelector targetCommunications={targetData.communication}
                           updateCommunicationsData={(_, Communication: I_Communication) =>
                               updateListHandler('communication', Communication)
                           }/>
        <ConditionCheckBoxSection open={genderCheckbox} targetHeight={'102px'}>
            <ConditionCheckboxTitle onClick={() => {
                if (genderCheckbox)
                    setTargetData(prevState => ({...prevState, gender: null}))
                setGenderCheckbox(!genderCheckbox);
            }}>
                <Tick active={genderCheckbox} />
                <p>جنسیت</p>
            </ConditionCheckboxTitle>
            <GenderBox targetGender={targetData.gender} setTargetData={setTargetData}/>
        </ConditionCheckBoxSection>
        <MajorsSection setMajorCheckbox={setMajorCheckbox}
                       updateMajorsList={(_, Major: I_Communication) =>
                           updateListHandler('major', Major)}
                       majorCheckBox={majorCheckBox} setTargetData={setTargetData}
                       targetMajor={targetData.major as I_Communication[]}/>
        <ConditionCheckBoxSection open={entryYearCheckbox} targetHeight={'102px'}>
            <ConditionCheckboxTitle onClick={() => {
                if (entryYearCheckbox)
                    setTargetData(prevState => ({...prevState, from_year: null, to_year: null}))
                setEntryYearCheckbox(!entryYearCheckbox);
            }}>
                <Tick active={entryYearCheckbox}/>
                <p>سال ورود</p>
            </ConditionCheckboxTitle>
            <TargetSlider fromYear={targetData.from_year} setTargetData={setTargetData} toYear={targetData.to_year}/>
        </ConditionCheckBoxSection>
        <span className={'gray-title'}>افزودن استثناها</span>
        <ExceptionBox exceptionsList={targetData.except_users} setTargetData={setTargetData}
                      exceptionKey={'except_users'} title={'بجز'}/>
        <ExceptionBox exceptionsList={targetData.extra_users} setTargetData={setTargetData} exceptionKey={'extra_users'}
                      title={'همراه با'}/>
    </>

}
