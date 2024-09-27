'use client'
import { ReactSVG } from '@/node_modules/react-svg'
import styled from 'styled-components'
import { MouseEventHandler } from 'react'

type Props = {
    active?: boolean
    icon: string
    onClick: MouseEventHandler<HTMLDivElement>
}

const ModeSelect = ({ active, icon, onClick }: Props) => {
    return (
        <Container active={active} onClick={onClick}>
            <ReactSVG src={`/images/svg/${icon}.svg`} />
        </Container>
    )
}

export default ModeSelect

const Container = styled.div<{ active?: boolean }>`
    cursor: pointer;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid ${p => !p.active ? "#eee" : p.theme.colors.main};
    background: ${p => !p.active ? "#fff" : p.theme.colors.main};
    width: 46px;
    height: 46px;

    &:hover{
        border: 1px solid ${p => !p.active ? "#eee" : p.theme.colors.hover_main};
        background: ${p => !p.active ? p.theme.colors.neutral.hover : p.theme.colors.hover_main};
    }

    div{
        height: 24px;
        width: 24px;

        path{
            fill: ${p => p.active ? 'white' : "black"};
        }
    }
`