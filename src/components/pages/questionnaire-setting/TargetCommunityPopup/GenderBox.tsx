import styled from "styled-components";
import {T_SetState} from "@/src/utils/types/global";
import {I_Condition} from "@/src/utils/types/pages/questionnaireSetting";

export const GenderBox = ({targetGender, setTargetData}: {
    targetGender: 'F' | 'M' | null,
    setTargetData: T_SetState<Omit<I_Condition, 'id'>>
}) => {
    return <GenderBoxContainer>
        <GenderOption $active={targetGender === 'M'}
                      onClick={() => setTargetData(prevState => ({...prevState, gender: 'M'}))}>
            مرد
        </GenderOption>
        <hr />
        <GenderOption $active={targetGender === 'F'}
                      onClick={() => setTargetData(prevState => ({...prevState, gender: 'F'}))}>
            زن
        </GenderOption>
    </GenderBoxContainer>
}

const GenderBoxContainer = styled.div`
  display: flex;
  border-radius: 8px;
  align-items: center;
  border: 1px solid var(--grey-e);
  
  & hr {
    height: 25px;
    width: 1px;
    background: var(--grey-e);
  }
`
const GenderOption = styled.div<{ $active: boolean }>`
  display: flex;
  padding: 16px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;
  background: ${p => p.$active ? 'var(--gray-fa)' : 'white'};
  transition: 0.3s;
  font-size: 1.6rem;
  color: var(--sidebar-bg);
  font-weight: 500;
  cursor: pointer;
  
  //&:first-child {
  //  border-left: 1px solid var(--grey-e);
  //}
`