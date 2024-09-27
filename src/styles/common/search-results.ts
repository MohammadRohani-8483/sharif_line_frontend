import styled from "styled-components";

export const SearchResultsContainer = styled.div`
  display: inline-flex;
  width: 100%;
  cursor: auto;
  //height: 600px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 16px;
  border: 1px solid #EEE;
  background: #FFF;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.15);
  position: absolute;
  top: 80px;
  left: 0;
  z-index: 6;
  overflow: hidden;
  & .questionnaireContainer {
    flex-direction: column !important;
  }
  & .questionnaireBody{
    flex-wrap: wrap;
  }
  & .settingButton {
    border-left: 1px solid #eee;
  }
  & .popoverButton {
    display: none;
  }
  .notFoundText {
    font-size: 1.6rem;
    margin: 1.6rem;
  }

  & .seeAllLink {
    color: var(--Main);
    font-size: 1.4rem;
    font-weight: 700;
    width: 100%;
    border-top: 1px solid #EEE;
    text-align: center;
    padding: 24px 0;
    cursor: pointer;
  }

  .questionnaireFooterButtons {
    width: 100%;
    border-top: 1px solid var(--grey-e);
    height: 51px;
  }
`

export const ResultItemsContainer = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 450px;
  overflow: auto;
  width: 100%;
`

export const NotFoundSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px 0;
  cursor: auto;
`
export const NotFoundTitle = styled.div`
  color: var(--sidebar-bg);
  font-size: 1.4rem;
  font-weight: 700;
  display: flex;
  gap: 5px;
`