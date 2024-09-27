import styled from 'styled-components'

export const Button = styled.div<{ open: boolean }>`
    cursor: pointer;
    z-index: 8;
    width: 64px;
    height: 64px;
    background-color: ${p => !p.open ? p.theme.colors.main : 'white'};
    border-radius: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    filter: drop-shadow(${p => p.open ? "0px 0px 16px rgba(0, 0, 0, 0.25)" : "0px 4px 8px rgba(41, 121, 255, 0.50)"});
    position: absolute;
    bottom: 24px;
    left: 32px;

    @media (max-width: ${p => p.theme.breakpoints.md}){
        display: none;
    }

    &:hover{
        background-color: ${p => p.open ? p.theme.colors.neutral.hover : p.theme.colors.hover_main};
    }

    div,svg{
        width: 24px;
        height: 24px;
    }

    svg{
        transform: rotate(${p => p.open ? "45deg" : "0"});
    }

    path{
        fill: ${p => p.open ? p.theme.colors.neutral[3] : "white"};
    }
`

export const Items = styled.div<{ open: boolean }>`
    display: flex;
    z-index: 5;
    gap: 8px;
    flex-direction: column;
    position: absolute;
    left: 32px;
    bottom: ${p => p.open ? "96px" : "-106px"};
    opacity: ${p => p.open ? "1" : "0"};
    align-items: flex-end;

    div,a{
        padding: 12px;
        color: ${p => p.theme.colors.main};
        font-size: 16px;
        font-weight: 500;
        border-radius: 8px;
        background-color: ${p => p.theme.colors.mainBack.main};
        cursor: pointer;
    }
    div:hover,a:hover{
        background-color: ${p => p.theme.colors.mainBack.hover};
    }
`