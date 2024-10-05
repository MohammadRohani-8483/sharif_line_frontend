import {Icon} from "@/src/styles/common/icon";
import {T_InputEvent, T_SetState} from "@/src/utils/types/global";
import styled from "styled-components";
import {axiosInstance} from "@/src/utils/helper/axios";
import {useEffect, useRef, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {SpinnerLoading} from "@/src/components/common/SpinnerLoading";
import {AxiosResponse} from "axios";
import {I_Condition} from "@/src/utils/types/pages/questionnaireSetting";
import {handleNumberInputKeypress} from "@/src/utils/helper";
import {toast} from "react-toastify";
import {CommunityPopoverContainer, SearchInput} from "@/src/styles/pages/questionnaire-setting/targets-popup";

export const ExceptionPopover = ({ popoverOpen , setTargetData , exceptionKey , setPopoverOpen  } :
     { popoverOpen : boolean , setTargetData : T_SetState<Omit<I_Condition, 'id'>> , setPopoverOpen : T_SetState<boolean> , exceptionKey : 'except_users' | 'extra_users' }) => {
    const [ nationalCodeValue , setNationalCodeValue ] = useState('');
    const popOverRef = useRef<HTMLDivElement | null>(null);
    const fetchByNationalCode = useMutation({
        mutationFn : async () => await axiosInstance().post('/core/national_code',{
            national_code : nationalCodeValue
        }),
        onSuccess : (Response : AxiosResponse<{ name : string | null , national_code : string },any>) => {
            let { data } = Response;
            setTargetData((prevState) => {
                if(prevState[exceptionKey].find((Item) => Item.national_code === data.national_code)) {
                    toast.error('این کد ملی قبلا ثبت شده')
                    return {...prevState}
                }
                else {
                    toast.success('با موفقیت افزوده شد');
                    return {
                        ...prevState ,
                        [exceptionKey] : [...prevState[exceptionKey],{ name : data.name , national_code : data.national_code }]
                    }
                }

            })

        }
    })
    const handleClickOutside = (e: any) => {
        if(popOverRef.current === null)
            return

        if (!popOverRef.current!.contains(e.target))
            setPopoverOpen(false);
    };

    useEffect(() => {
        if(popoverOpen) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [popoverOpen]);

    return <CommunityPopoverContainer  ref={popOverRef}
                                       initial={{ opacity : 0 }}
                                       animate={{ opacity : popoverOpen ? 1 : 0 }}
                                       transition={{ duration : 0.3 }}
                                       autoFocus={true}
                                       $open={popoverOpen}>
        <ExceptionInnerContainer>
            <Icon name={'UserId'} style={{opacity: 0.4}} width={24} height={24}/>
            <SearchInput placeholder={'کدملی'}
                         value={nationalCodeValue}
                         inputMode={'numeric'}
                         onKeyDown={(Event) => {
                             if(Event.key === 'Enter')
                                 fetchByNationalCode.mutate()
                         }}
                         onKeyPress={handleNumberInputKeypress}
                         onChange={(E: T_InputEvent) => {
                             setNationalCodeValue(E.target.value);
                         }}/>
            <CheckIconContainer onClick={() => fetchByNationalCode.mutate()}>
                { fetchByNationalCode.isPending ? <SpinnerLoading color={'#2979FF'} width={24} height={24} /> :
                    <Icon name={'CheckSquare'} width={24} height={24}/>}
            </CheckIconContainer>
        </ExceptionInnerContainer>
    </CommunityPopoverContainer>
}
const ExceptionInnerContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 4px;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`
const CheckIconContainer = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 6px;
  background: var(--Main10);
  cursor: pointer;
`