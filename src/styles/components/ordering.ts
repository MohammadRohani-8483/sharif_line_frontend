'use client'
import styled, { css } from 'styled-components'

export const OrderContain = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
`

export const OrderTitle = styled.p`
    color: #666;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    `

export const OrderItem = styled.p<{ active: boolean, reverse: boolean }>`
    color: ${p => !p.active ? "#333" : 'var(--Main)'};
    padding: 4px;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;

    &:before{
        content: '';
        background: url(/images/svg/${p => p.reverse ? 'sort_top_to_bottom' : 'sort_bottom_to_top'}.svg);
        width: ${p => p.active ? '24px' : 0};
        height: 24px;
    }
`