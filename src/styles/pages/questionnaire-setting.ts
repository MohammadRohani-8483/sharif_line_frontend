import styled from "styled-components";
import theme from "@/src/styles/theme";


export const SaveButton = styled.div<{ background? : string , color? : string }>`
  background: ${p => p.background ? p.background : 'var(--Main)'};
  display: flex;
  padding: 8px 64px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 8px;
  align-self: stretch;
  font-size: 1.6rem;
  font-weight: 500;
  border-radius: 4px;
  color: ${p => p.color ? p.color : 'white'};
`

export const TargetCommunityCheckbox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  cursor: pointer;
  > p {
    color: var(--sidebar-bg);
    font-size: 1.6rem;
    font-weight: 500;
  }
  & .tickLoading {
    width: 15px;
    height: 15px;
    background: var(--grey-e);
    border-radius: 4px;
  }
`


export const TargetCommunityBoxContainer = styled.div`
  display: flex;
  padding: 16px;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid var(--grey-e);
  background: white;
  width: 100%;
  
`

export const TargetCommunityBoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  > h3 {
    color: var(--sidebar-bg);
    font-size: 1.6rem;
    font-weight: 700;
  }
  > span {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--gray-fa);
    cursor: pointer;
    border: 1px solid var(--grey-e);
    border-radius: 8px;
  }
`

export const AddTargetInput = styled.input`
  display: flex;
  padding: 16px;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid var(--grey-e);
  background: white;
  outline: none;
  width: 100%;
  background: none;
  font-size: 1.6rem;
  &::placeholder {
    color: var(--gray-c);
    font-weight: 400;
  }
`
export const AddConditionBox = styled.div`
  display: flex;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid var(--grey-e);
  position: relative;
  & .title {
    color: var(--sidebar-bg);
    font-size: 1.6rem;
    font-weight: 500;
    flex: 1 1 0;
  }
`
export const SelectedCommunicationsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const TargetItemsContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill,minmax(332px,1fr));
  gap: 10px;
  
  @media screen and (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(1,1fr);
  }
`

