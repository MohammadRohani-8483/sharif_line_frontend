import { CSSProperties, MouseEventHandler, useEffect, useState } from "react";

import {PopupProps} from "@/src/utils/types/global";
import styled from "styled-components";

interface BoxProps {
    $customStyles?: CSSProperties;
    $animation?: boolean;
};

export default function Popup(p: PopupProps): JSX.Element {
    const [animation, setAnimation] = useState<boolean>(false);
    const close = () => {
        setAnimation(false);
        setTimeout(p.onClose, 300, false);
    }
    const handleClose = () => {
        if (document.documentElement.clientWidth < 600 || p.dismisable)
            close();
    }
    const handleBoxClick: MouseEventHandler = e => {
        if (document.documentElement.clientWidth < 600 || p.dismisable)
            e.stopPropagation();
    }
    useEffect(() => {
        setTimeout(setAnimation, 100, true);
        
    }, [p.dismisable]);
    const children = typeof p.children === 'function' ? p.children(close) : p.children;
    return <Container $animation={animation} onClick={handleClose}>
        <Overlay $animation={animation} />
        <BoxComponent $customStyles={p.BoxStyle} className={p.className}
            $animation={animation}
            onClick={handleBoxClick}>
            {/* <Scrollbar> */}
                {children}
            {/* </Scrollbar> */}
        </BoxComponent>
    </Container>
}

const Container = styled.div<{ $animation: boolean }>`
    width: 100%;
    height: 100%;
    opacity: ${p => p.$animation ? 1 : 0};
    transition: .3s opacity;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 110;
    position: fixed;
    top: 0;
    right: 0;
    background: transparent !important;

    @media screen and (max-width: 600px) {
        align-items: end;
    }
`;

const Overlay = styled.div<{ $animation: boolean }>`
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    right: 0;
    opacity: ${p => p.$animation ? .3 : 0};
    background: #000 !important;
    transition: .3s opacity;
`;

const Box = styled.div<BoxProps>(p => ({ ...p.$customStyles }));
const BoxComponent = styled(Box)`
    transform: translateY(${p => p.$animation ? '0' : '100vh'}) !important;
    border-radius: 24px;
    background: #fff !important;
    overflow: hidden;
    transition: .3s transform;
    
    @media screen and (max-width: 600px){
        width: 100%;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }
    
    .ScrollbarsCustom-Content {
        flex-direction: column;
        height: 100%;
    }
`;