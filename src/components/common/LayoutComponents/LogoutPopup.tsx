import styled from "styled-components";
import {SpinnerLoading} from "@/src/components/common/SpinnerLoading";

export const LogoutPopup = ({ closeModal , title , confirmText , onOkay , loading } :
        { confirmText : string , closeModal : () => void , title : string , onOkay : () => void , loading : boolean }) => {
    return <LogoutContainer>
        <p>{title}</p>
        <LogoutButtonsContainer>
            <span onClick={() => closeModal()}>لغو</span>
            <span className={'logout'} onClick={onOkay}>{loading ? <SpinnerLoading color={'white'} width={20} height={20} /> : confirmText}</span>
        </LogoutButtonsContainer>
    </LogoutContainer>
}


const LogoutContainer = styled.div`
  display: flex;
  padding: 32px 24px 24px 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  align-self: stretch;
  > p {
    color: var(--sidebar-bg);
    font-size: 1.6rem;
    font-weight: 700;
  }
`
const LogoutButtonsContainer = styled.div`
  display: inline-flex;
  gap: 10px;
  > span {
    display: flex;
    padding: 8px 64px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    flex: 1 0 0;
    align-self: stretch;
    border-radius: 4px;
    background: var(--grey-e);
    color: var(--Gray-2);
    cursor: pointer;
    height: 37px;
    font-size: 1.6rem;
    font-weight: 500;
  }
  span.logout {
    background: #FF2929;
    color: white;
  }
`