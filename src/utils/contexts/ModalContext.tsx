import React, {CSSProperties, useState} from "react";
import {FadePopup} from "@/src/components/popups/FadePopup";
import {T_SetState} from "@/src/utils/types/global";

type T_DefaultModalProps = {
    modalTitle? : string,
    modalBody? : React.ReactNode | JSX.Element ,
    modalFooter? : React.ReactNode,
    wrapperStyles? : CSSProperties ,
    modalHeaderAdditionalComponent? : React.ReactNode ,
    customCloseModalAction? : (() => void | Promise<any>) | null ,
    hideHeader? : boolean,
    setFlagNumber? : T_SetState<number>
}
const defaultModalProps = {
    modalTitle : '',
    modalBody : <></> ,
    modalFooter : <></> ,
    wrapperStyles : {} ,
    modalHeaderAdditionalComponent : <></> ,
    customCloseModalAction : undefined ,
}

export type T_ModalContext = {
    modalTitle? : string | React.ReactNode,
    modalBody : string | React.ReactNode ,
    modalFooter? : string | React.ReactNode ,
    // wrapperStyles? : CSSProperties ,
    setModalProp : (p: T_DefaultModalProps) => void ,
    openModal : () => void ,
    modalOpen : boolean ,
    closeModal : () => void ,
    customCloseModalAction? : (() => void | Promise<any>) | null ,
    setFlagNumber? : T_SetState<number>
}

export const ModalContext = React.createContext<T_ModalContext | null>(null);
export const ModalContextProvider = ({ children } : { children : React.ReactNode }) => {
    const [ modalOpen , setModalOpen ] = useState(false);
    const [ modalProps , setModalProps ] = useState<T_DefaultModalProps>(defaultModalProps);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const setModalProp = (Props : any) => {
        setModalProps(Props);
    }

    const InitialContextValue = {
        ...modalProps,
        setModalProp : setModalProp ,
        openModal ,
        modalOpen : modalOpen,
        closeModal ,
    }

    return <ModalContext.Provider value={InitialContextValue as any}>
        <FadePopup modalOpen={modalOpen}
                   hideHeader={modalProps.hideHeader}
                   modalFooter={modalProps.modalFooter}
                   modalHeaderAdditionalComponent={modalProps.modalHeaderAdditionalComponent}
                   wrapperStyles={modalProps.wrapperStyles}
                   modalTitle={modalProps.modalTitle}
                   customCloseModalAction={modalProps.customCloseModalAction}
                   modalBody={modalProps.modalBody}
                   closeModal={closeModal} />
        {children}
    </ModalContext.Provider>
}