import styled from "styled-components";
import theme from "@/src/styles/theme";

export const FadePopupContainer = styled.div<{ popup_open : boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity , height 0.3s;
  opacity: ${p => p.popup_open ? 1 : 0};
  z-index: ${p => p.popup_open ? 11 : -1};
  display: flex;
  background: white;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  justify-content: space-between;
  border-radius: 32px;

  @media screen and (max-width: ${theme.breakpoints.lg}) {
    width: 70% !important;
  } 
  @media screen and (max-width: ${theme.breakpoints.md}) {
    width: 85% !important;
    border-radius: 16px;
  }
  
  @media screen and (max-width: ${theme.breakpoints.sm}) {
    width: 95% !important
  }
`

export const PopupMask = styled.mask<{ popup_open : boolean}>`
  position: fixed;
  top: 0;
  transition: opacity 0.3s;
  left: 0;
  background: rgb(0 0 0 / 37%);
  opacity: ${p => p.popup_open ? 1 : 0};
  z-index: ${p => p.popup_open ? 10 : -1};
  width: 100%;
  height: 100%;
`

export const PopupHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 32px 32px 24px 32px;
  gap: 8px;
  
  border-bottom: 1px solid var(--grey-e);

`
export const PopupTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  color: var(--Main);
  font-size: 1.6rem;
  font-weight: 700;

  > i {
    cursor: pointer;
  }
`