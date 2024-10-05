import React from 'react'
import styled from 'styled-components'
import {Icon} from "@/src/styles/common/icon";

const Tick = ({ active, onClick , disabled }: { active?: boolean, onClick?: () => void , disabled? : boolean }) => {
  return (
    <Container $active={active} onClick={onClick} $disabled={disabled}>
        <Icon name={'check'} width={12} height={12} />
    </Container >
  )
}

export default Tick

const Container = styled.div<{ $active? : boolean , $disabled? : boolean }>`
    width: 16px !important;
    height: 16px !important;
    border-radius: 4px;
    border: 1px solid ${p => p.$active ? '#2979FF' : '#eee'};
    background-color: ${p => p.$active ? '#E6F3FF' : '#fff'};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    pointer-events: ${p => p.$disabled ? 'none' : 'all'};
    & i {
        opacity: ${p => p.$active ? 1 : 0};
    }
`