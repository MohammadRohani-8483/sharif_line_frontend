import styled, { css } from "styled-components";
import theme from "@/src/styles/theme";

export const LayoutContainer = styled.section`
  display: flex;
  height: 100vh;
  background: white;
`

export const SideBarElement = styled('aside').withConfig({
    shouldForwardProp: prop => !['sidebaropen'].includes(prop)
})<{ sidebaropen: boolean }>`
  width: ${p => p.sidebaropen ? '297px' : '94px'};
  height: 100vh;
  max-width: 297px;
  transition: 0.3s;
  background: var(--sidebar-bg);
  overflow: hidden;
  flex: none;
  @media screen and (max-width: ${theme.breakpoints.md}) {
    position: absolute;
    width: 297px;
    right: ${p => p.sidebaropen ? '0' : '-1000px'};
    z-index: 10;
  }
`
export const SideBarHead = styled('div').withConfig({
    shouldForwardProp: prop => !['sidebaropen'].includes(prop)
})<{ sidebaropen: boolean }>`
  background: var(--Gray-2);
  //padding: 24px;
  width: ${p => p.sidebaropen ? '100%' : '94px'};
  position: relative; 
  display: flex;
  justify-content: center;
  align-items: center;
  height: 158px;
  transition: width 0.3s;
  /* overflow-y: hidden; */
   .openSideBarIcon {
     transition: 0.9s;
     opacity: ${p => p.sidebaropen ? 1 : 0};
     z-index: 2;
   }
  @media screen and (max-width: ${theme.breakpoints.md}) {
    width: 100%;
  }
`
export const SideBarBody = styled('div').withConfig({
    shouldForwardProp: prop => !['sidebaropen'].includes(prop)
})<{ sidebaropen: boolean }>`
  height: calc(100% - 158px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 18px 0;
  position: absolute;
  z-index: 3;
  bottom: 0;
  background: var(--sidebar-bg);
  overflow: hidden;
  max-width: ${p => p.sidebaropen ? '296px' : '94px'};
  width: ${p => p.sidebaropen ? '100%' : '94px'};
  transition: 0.3s;
  .SidebarBodyBox {
    width: 294px;
  }
  @media screen and (max-width: ${theme.breakpoints.md}) {
    width: 100%;
    max-width: 296px;
  }
`
export const SideBarToggleButton = styled('div').withConfig({
    shouldForwardProp: prop => !['sidebaropen'].includes(prop)
})<{ sidebaropen: boolean }>`
  position: absolute;
  bottom: -33px;
  right: -10px;
  padding-right: 10px;
  border-radius: 50%;
  
  & .CurveSVG {
    position: absolute;
    width: ${p => p.sidebaropen ? '120px' : '90px'};
    height: ${p => p.sidebaropen ? '190px' : '140px'} ;
    z-index: 1;
    right: ${p => p.sidebaropen ? '-109.5px' : '-80px'};
    transform: none;
    background-position: left;
    bottom: ${p => p.sidebaropen ? '-43px' : '-22px'};
    transition: 0.3s;
    background-size: auto;
    //background-size: ${p => p.sidebaropen ? 'cover' : 'contain'};
 
  }
  .toggleSideBarIcon {
    /* z-index: 2; */
    position: relative;
    cursor: pointer;
    transform : ${p => p.sidebaropen ? 'rotate(180deg)' : 'none'};
  }
  > span {
    z-index: 2;
    position: relative;
    padding: 10px;
    border: 1px solid var(--grey-e);
    border-radius: 50%;
    background: white;
    cursor: pointer;
  }
  & i {
    transition: 0.3s;
  }
  
  @media screen and (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`
export const SideBarMask = styled.div.withConfig({
    shouldForwardProp: prop => !['sidebaropen'].includes(prop)
})<{ sidebaropen: boolean }>`
  position: fixed;
  display: none;
  width: 100%;
  height: 100vh;
  background: #00000030;
  top: 0;
  cursor: pointer;
  @media screen and (max-width: ${theme.breakpoints.md}) {
    display: block;
    z-index: ${p => p.sidebaropen ? 1 : -1};
    opacity: ${p => p.sidebaropen ? 1 : 0};
    transition: 0.3s opacity;
  }
`
export const SideBarCloseItems = styled.div<{sidebaropen:boolean}>`
  display: ${p => p.sidebaropen ? 'none' : 'flex'};
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  transition: 0.3s;
   opacity: ${p => p.sidebaropen ? 0 : 1};
  > i {
    z-index: 2;
  }

`
export const SideBarHomeItem = styled.div`
  display: flex;
  padding: 12px;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  border-radius: 16px;
  //background: rgba(255, 255, 255, 0.10);
  >  i {
    opacity: 0;
  }
`
export const SideBarContainer = styled.div`
  width: 296px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const LayoutMainContainer = styled.main.withConfig({
    shouldForwardProp : prop => !['sidebaropen','resultspage'].includes(prop)
})<{ sidebaropen : boolean , resultspage : boolean }>`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  flex: 1 0 0;
  background-color: ${p=>p.theme.colors.neutral.fa};
  max-width: calc(100% - ${p => p.resultspage ? p.sidebaropen ? '297px' : '94px' : 'unset'});
  //overflow: auto;

  @media screen and (max-width: ${theme.breakpoints.md}) {
    max-width: 100%;
  }
`

export const SideBarItemContainer = styled.div`
  padding: 4px 16px;
`
export const SideBarItemInnerContainer = styled('div').withConfig({
    shouldForwardProp: prop => !['sidebaropen','logout'].includes(prop)
})<{ sidebaropen: boolean , logout? : string | undefined, active?:boolean }>`
  display: flex;
  padding: 8px 12px;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;
  align-self: stretch;
  color: ${p => p.logout ? 'var(--grey-r)' : 'var(--grey-f)'};
  font-size: 1.6rem;
  cursor: pointer;
  > p {
    transition: 0.3s;
    opacity: ${p => p.sidebaropen ? '1' : '0'};
  }
  div,svg{
    width: 24px;
    height: 24px;
  }
  &:hover{
    path{
      fill: ${p=>p.theme.colors.main};
    }
  }
  ${p=>p.active && p.sidebaropen && css`
	  background: rgb(72, 72, 72);
	  border-radius: 8px;
  `}
`
export const LayoutMainHeader = styled.div`
  display: flex;
  width: 100%;
  /* height: 96px; */
  min-height: 96px;
  padding: 8px 32px;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid var(--grey-e);
  background: var(--grey-f);
  position: relative;
  justify-content: space-between;
  @media screen and (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    padding: 16px 32px;
    min-height: auto;
  }
`
export const LayoutMainBody = styled.div`
  width: 100%;
  overflow-y: auto;
  background-color: ${p=> p.theme.colors.neutral.fa};
  height: 100vh;
`
export const SearchBarContainer = styled.div<{ show_clear_icon? : string | null }>`
  display: flex;
  height: 57.6px;
  width: 437px;
  cursor: text;
  padding: 0 16px;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid var(--grey-e);
  background: var(--gray-fa);
  position: relative;
  @media screen and (max-width: ${theme.breakpoints.md}) {
    width: 100%;
  }
  & object svg * {
    fill: #777777 !important;
  }
  & .closeIcon {
    transition: 0.3s opacity;
    cursor: pointer;
    position: relative;
    opacity: ${p => p.show_clear_icon ? 1 : 0};
    z-index: ${p => p.show_clear_icon ? 1 : -1};
  }
`

export const LayoutHeaderTopPart = styled.div`
  display: none;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  
  @media screen and (max-width: ${theme.breakpoints.md}) {
    display: flex;
  }
`

export const HeaderToggleButton = styled.button`
  outline: none;
  border-radius: 12px;
  border: 1px solid var(--grey-e);
  display: flex;
  padding: 16px;
  align-items: center;
  gap: 10px;
  background: white;
  cursor: pointer;
`

export const Searchbar = styled.input`
    padding: 16px;
    padding-right: 47.5px;
    background: url(/images/svg/search.svg) no-repeat right 16px center ${p=> p.theme.colors.neutral.fa};
    border: solid 1px #eee;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 500;
    width: 437px;

    &:placeholder-shown{
        color: #777777;
    }
`


export const LayoutUserNameContainer = styled.div`
  display: flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid var(--grey-e);
  background: var(--gray-fa);
  > p {
    color: var(--sidebar-bg);
    font-weight: 500;
    font-size: 1.6rem;
  }
  > span {
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    border: 1px solid var(--grey-e);
    padding: 4px;
    background: var(--grey-f);
  }
  @media screen and (max-width: ${theme.breakpoints.md}) {
    &.mobile {
      display: none;
    }
  }
`