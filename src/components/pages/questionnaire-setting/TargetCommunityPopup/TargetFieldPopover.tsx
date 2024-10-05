import {Icon} from "@/src/styles/common/icon";
import {T_InputEvent, T_SetState} from "@/src/utils/types/global";
import {I_Communication} from "@/src/utils/types/pages/questionnaireSetting";
import {useEffect, useRef} from "react";
import {
    CommunityItemContainer,
    CommunityPopoverContainer,
    PopoverSearchBox,
    SearchInput
} from "@/src/styles/pages/questionnaire-setting/targets-popup";
import {SpinnerLoading} from "@/src/components/common/SpinnerLoading";

type TargetFieldPopoverProp = {
    popoverOpen : boolean ,
    updateListData : (List : I_Communication[],Item : I_Communication) => void ,
    listData : I_Communication[],
    availableList : I_Communication[],
    setMajorsSearchValue : T_SetState<string> ,
    searchLoading : boolean ,
    setPopoverOpen : T_SetState<boolean>
}

export const TargetFieldPopover = (props : TargetFieldPopoverProp) => {
    let SearchTimeout: ReturnType<typeof setTimeout>;
    const popOverRef = useRef<HTMLDivElement | null>(null);
    const handleClickOutside = (e: any) => {
        if(popOverRef.current === null)
            return

        if (!popOverRef.current!.contains(e.target))
            props.setPopoverOpen(false);
    };

    useEffect(() => {
        if(props.popoverOpen) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [props.popoverOpen]);

    return <CommunityPopoverContainer ref={popOverRef} autoFocus={true} $open={props.popoverOpen}>
        <PopoverSearchBox>
            { props.searchLoading ? <SpinnerLoading color={'var(--gray-c)'} width={24} height={24} /> :
                <Icon name={'search'} style={{opacity: 0.3}} width={24} height={24}/>}
            <SearchInput placeholder={'جستجو'}
                         onChange={(E: T_InputEvent) => {
                             clearTimeout(SearchTimeout);
                             SearchTimeout = setTimeout(() => {
                                 props.setMajorsSearchValue(E.target.value)
                             }, 900)
                         }}/>

        </PopoverSearchBox>
        {props.availableList.map((Item: I_Communication) =>
            <CommunityItemContainer onClick={() => props.updateListData(props.listData, Item)}
                                    $active={props.listData ? props.listData.some((TItem => TItem.id === Item.id)) : false}
                                    key={Item.id}>
                {Item.title}
            </CommunityItemContainer>)}
    </CommunityPopoverContainer>
}