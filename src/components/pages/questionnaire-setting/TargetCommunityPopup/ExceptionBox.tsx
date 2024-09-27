import {
    SelectedCommunicationsContainer
} from "@/src/styles/pages/questionnaire-setting";
import {Icon} from "@/src/styles/common/icon";
import {useState , useEffect} from "react";
import {ExceptionPopover} from "@/src/components/pages/questionnaire-setting/TargetCommunityPopup/ExceptionPopover";
import {T_SetState} from "@/src/utils/types/global";
import {I_Condition, T_ExceptionItem} from "@/src/utils/types/pages/questionnaireSetting";
import {
    AddConditionButton,
    ExceptionBoxContainer,
    ExceptionInnerContainer,
    ExceptionItemContainer,
    ExceptionItemsContainer
} from "@/src/styles/pages/questionnaire-setting/targets-popup";

type T_ExceptionBoxProps ={
    exceptionsList : T_ExceptionItem[] ,
    setTargetData : T_SetState<Omit<I_Condition, 'id'>> ,
    exceptionKey : 'except_users' | 'extra_users' ,
    title : string
}

export const ExceptionBox = ({ exceptionsList , setTargetData , exceptionKey , title } : T_ExceptionBoxProps)  => {
    const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
    const [ dropMenuOpen , setDropMenuOpen ] = useState(false);

    useEffect(() => {
        if(exceptionsList.length)
            setDropMenuOpen(true);
        else
            setDropMenuOpen(false);
    }, [dropMenuOpen, exceptionsList]);



    return <ExceptionBoxContainer style={{ marginBottom : (exceptionKey === 'extra_users' && !exceptionsList.length && popoverOpen) ? 60 : 0 }}>
        <ExceptionInnerContainer>
            <p className={'title'} onClick={() => {
                if(exceptionsList.length)
                    setDropMenuOpen(true)
            }}>{title}</p>
            <SelectedCommunicationsContainer>
                { popoverOpen && <ExceptionPopover setTargetData={setTargetData} setPopoverOpen={setPopoverOpen}
                                   exceptionKey={exceptionKey} popoverOpen={popoverOpen}/>}
                <AddConditionButton onClick={() => setPopoverOpen(!popoverOpen)}>
                    <Icon name={'plus'} style={{transform: popoverOpen ? 'rotate(45deg)' : 'none'}} width={15} height={15}/>
                </AddConditionButton>
            </SelectedCommunicationsContainer>
        </ExceptionInnerContainer>
        { dropMenuOpen && <ExceptionItemsContainer>
            {
                exceptionsList.map((Item,index) => <ExceptionItemContainer key={index}>
                    {Item.user ? `${Item.user}(${Item.national_code})` : Item.national_code}
                    <Icon name={'close'} height={14} onClick={() => {
                        setTargetData((prevState) => {
                            return {
                                ...prevState ,
                                [exceptionKey] : prevState[exceptionKey].filter((ExtraItem) =>
                                    ExtraItem.national_code !== Item.national_code)
                            }
                        })
                    }} />
                </ExceptionItemContainer>)
            }
        </ExceptionItemsContainer>}
    </ExceptionBoxContainer>
}

