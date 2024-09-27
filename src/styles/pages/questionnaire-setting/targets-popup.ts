import styled from "styled-components";
import theme from "@/src/styles/theme";
import {motion} from "framer-motion";

export const PopupFooter = styled.div`
  padding: 24px 32px 32px 32px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-top: 1px solid var(--grey-e);
  width: 100%;
  gap: 8px;
  @media screen and (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
  }
`
export const NoCondition = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`
export const TargetCommunityPopupHeader = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  
  
`
export const TargetCommunityPopupBodyContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 16px 32px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  max-height: 100%;
  overflow: auto;
  height: 100%;
  > p {
    font-size: 1.6rem;
    color: var(--sidebar-bg);
    font-weight: 500;
  }
  .gray-title {
    color: var(--gray-a);
    font-size: 1.4rem;
    font-weight: 500;
  }
  & .infinite-scroll-component__outerdiv {
    width: 100%;
    & .infinite-scroll-component {
      gap: 8px;
      display: flex;
      flex-direction: column;
    }
  }
`
export const SearchTargetsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`
export const CreateTargetButton = styled.div`
  display: flex;
  padding: 8px 16px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  color: var(--Main);
  border-radius: 4px;
  cursor: pointer;
  background: var(--Main10);
  font-size: 1.6rem;
   > span {
     display: flex;
     width: 22px;
     justify-content: center;
     padding: 4px;
     border-radius: 4px;
     align-items: center;
     gap: 10px;
     background: var(--Main10);
     height: 22px;
   }
  & .addIcon {
      filter: var(--Main-filter);
  }
`
export const TargetCommunityItem = styled.div<{ selected?: boolean }>`
  display: flex;
  padding: 16px;
  justify-content: flex-start;
  cursor: pointer;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid ${p => p.selected ? 'var(--Main)' : 'var(--grey-e)'};
  background: var(--gray-fa);
  color: var(--sidebar-bg);
  font-size: 1.6rem;
  font-weight: 500;
  transition: 0.3s;
`
export const SearchInput = styled.input`
  outline: none;
  border: none;
  width: 100%;
  background: none;
  font-size: 1.6rem;
  &::placeholder {
    color: var(--gray-c);
    font-weight: 400;
  }
`
export const AddConditionButton = styled.button<{ background?: string, bordercolor?: string, disabled?: boolean }>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${p => p.background ? p.background : 'var(--gray-fa)'};
  cursor: pointer;
  border: 1px solid ${p => p.bordercolor ? p.bordercolor : 'var(--grey-e)'};
  border-radius: 8px;
  pointer-events: ${p => p.disabled ? 'none' : 'all'};
`
export const ConditionCheckBoxSection = styled.div<{ open: boolean, targetHeight: number | string }>`
  display: flex;
  flex-direction: column;
  height: ${p => p.open ? p.targetHeight : '40px'};
  padding: 10px 0;
  justify-content: flex-start;
  gap: 10px;
  flex-shrink: 0;
  align-self: stretch;
  overflow: ${p => p.open ? 'visible' : 'hidden'};
  transition: 0.3s;
`
export const ConditionCBInnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`
export const ConditionCheckboxTitle = styled.div`
  gap: 8px;
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  > p {
    color: var(--sidebar-bg);
    font-size: 1.6rem;
    font-weight: 500;
  }
`
export const NoTargetContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 32px 0;
`
export const CommunityPopoverContainer = styled(motion.div)<{ open: boolean }>`
  position: absolute;
  left: 0;
  top: 50px;
  transition: opacity 0.3s;
  opacity: ${p => p.open ? 1 : 0};
  z-index: ${p => p.open ? 2 : -1};
  width: 240px;
  display: flex;
  padding: 8px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  border-radius: 8px;
  background: white;
  border: 1px solid var(--grey-e);
  box-shadow: 0 0 24.6px 0 rgba(0, 0, 0, 0.15);
`
export const PopoverSearchBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--grey-e);
`
export const ExceptionBoxContainer = styled.div`
  display: flex;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid var(--grey-e);
  transition: 0.3s;
`
export const ExceptionInnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  position: relative;
  & .title {
    color: var(--sidebar-bg);
    font-size: 1.6rem;
    font-weight: 500;
    flex: 1 1 0;
    cursor: pointer;
  }
`
export const ExceptionItemsContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`
export const ExceptionItemContainer = styled.div`
  display: flex;
  padding: 12px;
  justify-content: flex-end;
  align-items: center;
  border-radius: 8px;
  border: 1px solid var(--grey-e);
  background: var(--gray-fa);
  color: var(--sidebar-bg);
  font-size: 1.6rem;
  font-weight: 400;
  gap: 6px;
  & i {
    width: 0;
    transform: rotate(45deg);
    transition: 0.3s;
    cursor: pointer;
  }
  &:hover i {
    width: 14px;
    transform: none;
  }
`
export const SearchTargetInputContainer = styled.div`
  display: flex;
  padding: 12px;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;
  border-radius: 4px;
  border: 1px solid var(--grey-e);
  background: white;
`
export const CommunityItemContainer = styled.div<{ active: boolean }>`
  display: flex;
  padding: 8px;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border: 1px solid var(--grey-e);
  background: var(--gray-fa);
  transition: 0.3s;
  color: ${p => p.active ? 'var(--Main)' : '#333'};
  font-size: 1.6rem;
  cursor: pointer;
  border-radius: 8px;
  
`
export const SelectedCommunicationItem = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gray-fa);
  cursor: pointer;
  border: 1px solid var(--grey-e);
  border-radius: 8px;
  transition: 0.3s;
  font-size: 1.6rem;
  padding: 2px 8px;
  gap: 6px;
  & i {
    width: 0;
    transform: rotate(45deg);
    transition: 0.3s;
  }
  &:hover i {
    width: 14px;
    transform: none;
  }
`