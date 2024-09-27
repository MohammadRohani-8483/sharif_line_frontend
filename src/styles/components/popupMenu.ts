import { motion } from "framer-motion";
import Link from "next/link";
import styled from "styled-components";

export const Container = styled(motion.div)`
    padding: 8px;
    position: absolute;
    left: 52px;
    /* bottom: 0; */
    bottom: 50%;
    transform: translate(0, 50%);
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-radius: 8px;
    width: 156px;
    box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.25);
    align-items: center;
    justify-content: center;
    background-color: white;
    z-index: 10;
`

export const Item = styled.div<{ red?: boolean, active?: boolean }>`
    width: 100%;
    display: flex;
    gap: 4px;
    align-items: center;
    justify-content: flex-start;
    padding: 8px 4px;
    cursor: pointer;

    p{
        font-size: 16px;
        font-weight: 500;
        color: ${p => p.red ? '#FF0000' : p.active ? p.theme.colors.main : p.theme.colors.neutral[3]};
    }

    div{
        width: 24px;
        height: 24px;
    }

    svg{
        path{
            fill: ${p => p.red ? '#FF0000' : p.active ? p.theme.colors.main : p.theme.colors.neutral[3]};
        }
    }

    &:hover{
        p{
            text-shadow: 0px 0px 20px ${p => p.red ? 'rgba(198, 32, 32, 0.50)' : p.active ? 'rgba(10, 10, 80, 0.40)' : 'rgba(0, 0, 0, 0.50)'};
        }
    }
`

export const LinkItem = styled(Link)`
    width: 100%;
    display: flex;
    gap: 4px;
    align-items: center;
    justify-content: flex-start;
    padding: 8px 4px;
    cursor: pointer;

    p{
        font-size: 16px;
        font-weight: 500;
        color: ${p => p.theme.colors.neutral[3]};
    }

    &:hover{
        p{
            text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.50);
        }
    }
`