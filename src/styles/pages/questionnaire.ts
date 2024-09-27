'use client'
import styled, { css } from '@/node_modules/styled-components'
import { T_Mode } from '@/src/utils/types/global'
import theme from '../theme'

export const Navbar = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    justify-content: center;
    align-items: flex-end;

    @media (min-width: ${p => p.theme.breakpoints.sm}) {
        flex-direction: row-reverse;
        justify-content: space-between;
    }
    `

export const ModeCont = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
`

export const Questionnaires = styled.div<{ mode: T_Mode, count: number }>`
    display: grid;
    justify-items: center;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(${p => p.count}, 1fr) ;
    width: 100%;
    gap: 8px;
    /* padding: 16px;
    margin: -16px;
    ${p => p.count < 3 && css`
        width: 100%;
    `} */

    ${p => p.mode === "MIXED" && css`
        @media (min-width: ${p => p.theme.breakpoints.sm}) {
            grid-template-columns: repeat(2, 1fr) ;
            grid-template-rows: repeat(${Math.ceil(p.count / 2)}, 1fr) ;
            gap: 12px;
        }

        @media (min-width: ${p => p.theme.breakpoints.lg}) {
            grid-template-columns: repeat(3, 1fr) ;
            grid-template-rows: repeat(${Math.ceil(p.count / 3)}, 1fr) ;
        }
    `}
`

export const Container = styled.div<{ mode: T_Mode, isArchive?: boolean, skleton?: boolean }>`
    display: flex;
    position: relative;
    flex-direction: ${p => p.mode === "MIXED" ? "row" : "column"};
    justify-content: center;
    align-items: center;
    width: 100%;
    ${p => p.mode === 'MIXED' && !p.isArchive &&
        css`
            height: 220px;
        `
    }
    border: 1px solid #eee;
    border-radius: 8px;
    background-color: white;

    @media (min-width: ${p => p.theme.breakpoints.md}) {
        flex-direction: row;
    }

    ${p => p.skleton && css`
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
       
    `}
`

export const Body = styled.div<{ mode: T_Mode }>`
    width: 100%;
    height: 100%;
    padding: 16px;
    display: flex;
    flex-direction: ${p => p.mode === 'MIXED' ? "column" : "row"};
    gap: 8px;
    justify-content: ${p => p.mode === 'MIXED' ? "center" : "space-between"};
`

export const Buttons = styled.div<{ mode: T_Mode, skleton?: boolean }>`
    transition: none;
    width: ${p => p.mode === "MIXED" ? "56px" : "100%"};
    min-width: ${p => p.mode === "MIXED" ? "56px" : "224px"};
    border-right: ${p => p.mode === 'MIXED' ? '0' : '1'}px solid #eee;
    height: 100%;
    display: flex;
    flex-direction: ${p => p.mode === "MIXED" ? "column" : "row"};
    justify-content: center;
    overflow: hidden;

    ${p => p.mode === "MIXED" ?
        css`
        border-right: 1px solid #eee;
        section:not(:last-child){
            border-bottom: 1px solid #eee;
        }
        `:
        css`
            border-top: 1px solid #eee;
            section, a{
                border-right: 1px solid #eee;
            }
            section:last-child,a:last-child{
                border-left: 1px solid #eee;
            }

            @media (min-width: ${p => p.theme.breakpoints.md}) {
                border-top: none;

                section:last-child,a:last-child{
                    border-left: none;
                }

                section,a{
                    height: 100%;
                }
            }
        `
    }

    section,a{
        transition: background 0.5s;
        padding: 0 16px;
        height: 54.5px;
        display: flex;
        align-items: center;
        cursor: ${p => p.skleton ? 'auto' : "pointer"};

    }
    @media (min-width: ${p => p.theme.breakpoints.md}) {
        section,a{ 
            height: 100%;
        }
        width: ${p => p.mode === "MIXED" ? "56px" : "auto"};
        }

        section:hover,a:hover{
        background: ${p => !p.skleton && p.theme.colors.neutral.hover};
    }

`

export const Footer = styled.div<{ mode: T_Mode }>`
    width: 100%;
    display: flex;
    gap: 8px;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ${p => p.mode === "ROW" && css`
        height: 100%;
        `}
`

export const FootItem = styled.div<{ mode: T_Mode }>`
    width: 100%;
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: ${p => p.mode === "MIXED" ? "flex-start" : "flex-end"};

    div{
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 14px;
        color: #777;
        font-weight: 500;
        white-space: nowrap;
    }

    p{
        color: #444;
        font-weight: 700;
        font-size: 14px;
    }
`

export const HeadItem = styled.div<{ mode: T_Mode, isArchive?: boolean }>`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
    ${p => p.mode === 'MIXED' && !p.isArchive &&
        css`
            height: 126px;
        `
    }

    div{
        display: flex;
        gap: 8px;
        align-items: center;
        justify-content: ${p => p.mode === 'MIXED' ? "space-between" : 'flex-start'};
    }

    p{
        color: #666;
        font-size: 12px;
        font-weight: 300;
    }

    h1{
        color: #333;
        font-size: 18px;
        font-weight: 700;
        max-width: ${p => p.mode === 'MIXED' ? 200 : 150}px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        
        @media (min-width: ${theme.breakpoints.sm}){
            max-width: ${p => p.mode === 'MIXED' ? 200 : 350}px;
        }
        @media (min-width: ${theme.breakpoints.md}){
            max-width: ${p => p.mode === 'MIXED' ? 200 : 140}px;
        }
        @media (min-width: ${theme.breakpoints.lg}){
            max-width: ${p => p.mode === 'MIXED' ? 200 : 385}px;
        }
        @media (min-width: ${theme.breakpoints.xl}){
            max-width: ${p => p.mode === 'MIXED' ? 270 : 640}px;
        }
    }

    h2{
        color: #333;
        font-size: 12px;
        font-weight: 300;
        padding: 2px 8px;
        border-radius: 4px;
        background-color: ${p => p.theme.colors.neutral.e};
    }
`