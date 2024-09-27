import {
    SaveButton,

} from "@/src/styles/pages/questionnaire-setting";
import {T_SetState} from "@/src/utils/types/global";
import {Icon} from "@/src/styles/common/icon";
import React from "react";
import {AddTargetCommunity} from "@/src/components/pages/questionnaire-setting/TargetCommunityPopup/AddTargetCommunity";
import {
    T_PopupFooter,
    T_TargetCommunityPopupProp
} from "@/src/utils/types/pages/questionnaireSetting";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {SpinnerLoading} from "@/src/components/common/SpinnerLoading";
import {TargetsLazyLoading} from "@/src/components/pages/questionnaire-setting/TargetCommunityPopup/TargetsLazyLoading";
import {
    CreateTargetButton,
    NoCondition,
    PopupFooter,
    SearchInput, SearchTargetInputContainer, SearchTargetsContainer, TargetCommunityPopupBodyContainer
} from "@/src/styles/pages/questionnaire-setting/targets-popup";


export const TargetCommunityPopupBody = (props: T_TargetCommunityPopupProp) => {

    return <TargetCommunityPopupBodyContainer>
        {
            (props.createMode) ?
                <AddTargetCommunity targetData={props.targetData}
                                    setTargetData={props.setTargetData}/> :
                props.conditions.length ? <TargetsLazyLoading targetsList={props.conditions}
                                                        totalSize={props.ConditionsQuery.data!.data.count}
                                                        setSelectedConditions={props.setSelectedConditions}
                                                        selectedConditions={props.selectedConditions}/>
                    : <NoCondition>موردی وجود ندارد</NoCondition>
        }
    </TargetCommunityPopupBodyContainer>
}
export const TargetCommunitySearchBar = ({setCreateMode}: { setCreateMode: T_SetState<boolean> }) => {
    const {push} = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const urlParams = new URLSearchParams(searchParams);
    let searchTimeout: ReturnType<typeof setTimeout>


    return <SearchTargetsContainer>
        <SearchTargetInputContainer>
            <Icon name={'Magnifer'} width={24} height={24}/>
            <SearchInput onChange={(Event) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    if (!Event.target.value)
                        urlParams.delete('search');
                    else
                        urlParams.set('search', Event.target.value);
                    push(`${pathname}?${urlParams.toString()}`);

                }, 900)
            }} placeholder={'جستجو کنید'}/>
        </SearchTargetInputContainer>
        <CreateTargetButton onClick={() => setCreateMode(true)}>
            <p>ایجاد</p>
            <span>
                <Icon width={14} height={14} name={`plus`} className={'addIcon'}/>
            </span>
        </CreateTargetButton>
    </SearchTargetsContainer>
}
export const TargetCommunityFooter = ({buttonText, onClick, loading, createMode, setCreateMode}: T_PopupFooter) => {
    return <PopupFooter>
        {createMode && <SaveButton background={'var(--grey-e)'}
                                   color={'var(--Gray-2)'}
                                   onClick={() => setCreateMode(false)}>بازگشت</SaveButton>}
        <SaveButton onClick={onClick}>
            {loading ? <SpinnerLoading color={'white'} width={20} height={20}/> : buttonText}
        </SaveButton>
    </PopupFooter>
}

