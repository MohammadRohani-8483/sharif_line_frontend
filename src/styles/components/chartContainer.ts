import { T_ChartMode } from '@/src/utils/types/global'
import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'
import theme from '../theme'

export const ChartCont = styled.div<{ index: number, mode: T_ChartMode }>`
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 4px;
  background-color: white;
  border: 1px solid ${theme.colors.neutral.e};
  border-radius: 8px;
  justify-content: space-between;
  align-items: space-between;
  width: 100%;
  height: 478px;
  position: relative;

  .firstItem{
    max-width: 200px;
  }
  
  @media (min-width: ${theme.breakpoints.md}){
    ${p => (p.mode == 'ROW' || (p.mode == 'MESSED' && p.index % 3 === 1)) && css`
    grid-column: 1 / span 2;
    .firstItem{
      max-width: 1200px;
    }
    `
  }}

  @media (min-width: ${theme.breakpoints.lg}){
    ${p => p.mode === 'MIXED' ? css`
        grid-column: span 1;
      `
    :
    p.mode == 'ROW' ? css`
        grid-column: 1 / span 3;
        .firstItem{
          max-width: 1200px;
        }
        `
      :
      p.mode === 'MESSED' && p.index % 4 === 0 ? css`
        grid-column: 2 / span 2;
        .firstItem{
          max-width: 1200px;
        }
        `
        : p.index % 4 === 1 ? css`
          grid-column: 1 / span 2;
          .firstItem{
            max-width: 1200px;
          }
          `
          :
          css`
          grid-column: span 1;
          .firstItem{
            max-width: 200px;
          }
        `
  }}
`

export const ChartTitle = styled.div`
  height: 40px;
  display: flex;
  width: 100%;
  gap: 10px;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;

  .index{
    border-radius: 16px;
    background-color: ${theme.colors.neutral.fa};
    padding: 0 8px;
    height: 100%;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title{
    width: 100%;
    color: ${theme.colors.neutral[3]};
  }

  div{
    padding: 8px;
    cursor: pointer;
    border-radius: 8px;
    background-color: ${theme.colors.neutral.fa};
    border: 1px solid ${theme.colors.neutral.e};
    &:hover{
      background-color: ${theme.colors.neutral.e};
    }
  }
`

export const ContainerPopup = styled(motion.div)`
  padding: 8px;
  position: absolute;
  left: 10px;
  top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 8px;
  width: 116px;
  box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.25);
  align-items: center;
  justify-content: center;
  background-color: white;
  z-index: 10;
`

export const Legends = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
`

export const LegendCont = styled.div<{ color: string, bgcolor: string }>`
  padding: 4px 8px;
  /* cursor: pointer; */
  display: flex;
  gap: 4px;
  border-radius: 8px;
  color: ${p => p.color};
  background-color: ${p => p.bgcolor};

  p{
    font-size: 14px;
    font-weight: 700;
  }

  /* &:hover{
    backdrop-filter: brightness(.9);
  } */
`

export const ChartTableCont = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;

  .head{
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 8px;
    border-bottom: 1px solid ${theme.colors.neutral.e};
    
    h2{
      font-size: 16px;
      font-weight: 500;
      color: ${theme.colors.neutral[3]};
      white-space: nowrap;
    }
    h2:first-child{
      width: 100%;
    }
    h2:not(:first-child){
      text-align: center;
      min-width: 90px;
      border-right: 1px solid ${theme.colors.neutral.e};
    }
  }
  
  .item{
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 12px 8px;
    
    p{
      font-size: 16px;
      font-weight: 500;
      color: ${theme.colors.neutral[6]};
      white-space: nowrap;
    }
    p:first-child{
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    p:not(:first-child){
      text-align: center;
      min-width: 90px;
    }
  }
`

export const ChartParent = styled.div<{ aspect?: boolean }>`
  width: 100%;
  height: 100%;
  max-height: 220px;
  padding-block: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  canvas{
    height: 200px !important;
    width: ${p => p.aspect ? '200px' : 'auto'} !important;
    aspect-ratio: ${p=>p.aspect?1:2}/1 !important;
  }
  
  @media (max-width: ${p => p.theme.breakpoints.sm}){
    height: auto;
    
    canvas{
      height: 150px !important;
      width: ${p => p.aspect ? '150px' : 'auto'} !important;
      aspect-ratio: ${p=>p.aspect?1:2}/1 !important;
    }
  }
`