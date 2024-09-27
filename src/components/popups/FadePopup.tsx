import React, {CSSProperties} from "react";
import {FadePopupContainer, PopupHeader, PopupMask, PopupTitleContainer} from "@/src/styles/common/popup";
import {Icon} from "@/src/styles/common/icon";



type T_FadePopupProp = {
    modalTitle : string | React.ReactNode ,
    modalBody : string | React.ReactNode ,
    modalHeaderAdditionalComponent? : React.ReactNode ,
    closeModal : () => void ,
    modalOpen : boolean ,
    wrapperStyles? : CSSProperties ,
    customCloseModalAction? : (() => void | Promise<any>) | null ,
    modalFooter : React.ReactNode ,
    hideHeader? : boolean
}
export const FadePopup = ({ modalOpen , modalTitle , modalBody , customCloseModalAction , hideHeader ,
      modalFooter , closeModal , wrapperStyles , modalHeaderAdditionalComponent } : T_FadePopupProp) => {
    return <>
        <PopupMask popup_open={modalOpen} onClick={() => customCloseModalAction ? customCloseModalAction() : closeModal()} />
        <FadePopupContainer style={wrapperStyles} popup_open={modalOpen}>
            { !hideHeader && <PopupHeader>
                <PopupTitleContainer>
                    {modalTitle}
                    <Icon name={'close'} width={15} height={15}
                          onClick={() => customCloseModalAction ? customCloseModalAction() : closeModal()}/>
                </PopupTitleContainer>
                {modalHeaderAdditionalComponent}
            </PopupHeader>}
            {modalBody}
            {modalFooter}
        </FadePopupContainer>
    </>
}