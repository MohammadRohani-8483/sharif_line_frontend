'use client'
import styled from "styled-components";
import theme from "@/src/styles/theme";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  padding: 8px 32px;

  @media screen and (max-width: ${theme.breakpoints.md}) {
    padding: 8px 24px;
  }
`
export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid var(--grey-e);
  background: #FFF;

  @media screen and (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
  }
`
export const PageFooter = styled.footer`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
export const PageHeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 4px;
  flex: 1 0 0;
  padding: 16px;
  > p {
    color: var(--gray-6);
    font-size: 1.2rem;
    font-weight: 300;
  }
  
  > h2 {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--sidebar-bg);
  }
  &.loading {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
     .headerTitle {
      background: var(--grey-e);
      color: var(--grey-e);
    } 
  }
`

export const PageHeaderCont=styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 8px 16px;
  gap: 16px;
  
  @media (min-width: ${theme.breakpoints.lg}) {
    flex-direction: row;
    align-items: center;
  }
`
export const TitleCont=styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 4px;
  flex: 1 0 0;
  padding: 8px 0;

  > p {
    color: var(--gray-6);
    font-size: 1.2rem;
    font-weight: 300;
  }
  
  > h2 {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--sidebar-bg);
  }
`

export const PageHeaderButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;

  > a {
    height: 100%;
  }
  @media screen and (max-width: ${theme.breakpoints.md}) {
    height: 75px;
    border-top: 1px solid var(--grey-e);
  }

`
export const PageHeaderButton = styled.button<{ isActive?: boolean, loading?: boolean }>`
  outline: none;
  background: none;
  border: none;
  height: 100%;
  padding: 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75px;
  border-right: 1px solid var(--grey-e);
  transition: 0.3s;
  cursor: pointer;
  pointer-events: ${p => p.loading ? 'none' : 'all'};

  &:hover {
    background: var(--grey-e);
  }

  background: ${p => p.isActive ? 'var(--grey-e)' : 'none'};

  & .headerButton {
    width: 30px;
    height: 30px;
    border-radius: 4px;
    background: var(--grey-e);
  }

  @media screen and (max-width: ${theme.breakpoints.md}) {
    &.deleteButton {
      border-left: 1px solid var(--grey-e);
    }
  }
`
export const QuestionnaireTimingContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
  gap: 8px;
  align-self: stretch;
  flex-wrap: wrap;
  padding-top: 16px;

  &.loading {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
`
export const TimingSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;

  &.titleSection {
    flex: 1 0 0;
  }

  &.timeSection {
    min-width: 35%;
    position: relative;
  }

  & .regular-title {
    color: var(--sidebar-bg);
    font-size: 1.6rem;
    font-weight: 500;
  }

  .timing-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    cursor: pointer;
    & .tickLoading {
      width: 15px;
      height: 15px;
      background: var(--grey-e);
      border-radius: 4px;
    }
  }

  @media screen and (max-width: ${theme.breakpoints.md}) {
    width: 100%;
  }
`
export const QuestionnaireTitle = styled.div`
  display: flex;
  padding: 16px;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid var(--grey-e);
  background: white;

  & .questionnaireNameInput {
    color: var(--sidebar-bg);
    font-size: 1.6rem;
    width: 100%;
  }

  .inputLoading {
    background: var(--grey-e);
    color: var(--grey-e);
  }
`
export const QuestionnaireTimerContainer = styled.div<{ timerOpen: boolean }>`
  display: flex;
  padding: 8px;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid var(--grey-e);
  opacity: ${p => !p.timerOpen ? 1 : 0.5};
  background: white;
  transition: 0.3s;
  position: relative;
  pointer-events: ${p => p.timerOpen ? 'none' : 'all'};
  cursor: auto;
  & .timeIconContainer {
    display: flex;
    padding: 8px;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    border: 1px solid var(--grey-e);
    background: var(--gray-fa);
    cursor: pointer;
  }
  > p {
    font-size: 2rem;
    font-weight: 500;
    color: var(--sidebar-bg);
    
    &.timer-value {
      background: var(--grey-e);
      color: var(--grey-e);
      font-size: 1.5rem;
    }
  }
`
export const TimeSelectorContainer = styled.div<{ selectorAppear: boolean }>`
  display: flex;
  //width: 408px;
  height: 113px;
  padding: 12px;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  overflow: hidden;
  position: absolute;
  top: 90px;
  opacity: ${p => p.selectorAppear ? 1 : 0};
  left: 0;
  transition: 0.3s;
  border-radius: 8px;
  border: 1px solid var(--grey-e);
  background: white;
  width: 100%;
  z-index: ${p => p.selectorAppear ? 10 : -1};
  & .swiper {
    height: 100px;
  }
`
export const TargetCommunityContainer = styled.section<{ targetSelectorOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: 0.3s;
  width: 100%;
  overflow: hidden;
  //height: ${p => p.targetSelectorOpen ? '310px' : '26px'};
   
  &.loading {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
`
export const TargetItemContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid var(--grey-e);
  background: var(--gray-fa);
  
  > p {
    font-size: 1.6rem;
    color: var(--sidebar-bg);
  }
  
  .target-buttons {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`

export const TimeColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  height: 100%;

  > span {
    color: var(--gray-9);
    font-weight: 700;
    font-size: 1.2rem;
  }
`
export const TimeOptionsContainer = styled.div`
  width: 100%;
  overflow: auto;
  font-size: 2rem;
  height: 100px;
  text-align: center;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 0;
    display: none;
  }
 
  & .swiper-slide {
    //height: 28px !important;
    opacity: 0.5;
  }

  & .swiper-slide-active {
    opacity: 1;
  }
`
export const TimeOptionContainer = styled.div`
  display: flex;
  height: 30px;
  padding: 10px;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
`
export const CommaContainer = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  font-size: 1.6rem;
  color: var(--gray-8);
`