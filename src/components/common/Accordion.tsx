'use client'
import React, {useEffect, useState} from "react";
import styled from "styled-components";


type TAccordionProps = { children: React.ReactNode, accordionOpen: boolean, childID: string }

export const Accordion = ({children, accordionOpen, childID}: TAccordionProps) => {
    const accordionRef = React.useRef<HTMLDivElement | null>(null);
    const [showChildren, setShowChildren] = useState(false);
    const [showsAccordion, setShowAccordion] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            let accordionElement = document.getElementById('accordionElement352');
            if (!accordionElement) return;
            let accordionChild = document.getElementById(childID);
            if (accordionOpen) {
                if (!accordionChild) return;
                accordionElement!.style.height = accordionChild.clientHeight + 'px';
                setTimeout(() => {
                    accordionElement!.style.height = 'auto';
                }, 300)
            } else {
                if (!accordionChild || !accordionElement) return;
                accordionElement!.style.height = accordionChild.clientHeight + 'px';

                setTimeout(() => {
                    accordionElement!.style.height = '0';
                }, 80)

            }
        }, 150)
    }, [accordionOpen, accordionRef.current, document.getElementById('accordionElement352')]);

    useEffect(() => {
        setTimeout(() => {
            setShowAccordion(accordionOpen);
        }, accordionOpen ? 40 : 510)
        setTimeout(() => {
            setShowChildren(accordionOpen);
        }, accordionOpen ? 30 : 500)
    }, [accordionOpen]);

    return showsAccordion ? <AccordionContainer id={'accordionElement352'} ref={accordionRef}>
        {showChildren ? children : <></>}
    </AccordionContainer> : ''
}
const AccordionContainer = styled.div`
  transition: 0.3s;
  overflow: hidden;
  height: 0;
`