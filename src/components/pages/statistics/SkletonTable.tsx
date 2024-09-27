import theme from '@/src/styles/theme'
import React, { Fragment } from 'react'
import styled from 'styled-components'

const trTable = () => {
  return (
    <>
      <SkletonTr>
        {Array(11).fill(1).map((_, i) => (
          <td key={i} rowSpan={2}>
            <div />
          </td>
        ))}
      </SkletonTr>
      <SkletonTr></SkletonTr>
      {Array(10).fill(1).map((_, i) => (
        <SkletonTr key={i}>
          {Array(11).fill(1).map((_, i) => (
            <td key={i}>
              <div />
            </td>
          ))}
        </SkletonTr>
      ))}
    </>
  )
}

export default trTable

const SkletonTr = styled.tr`
  td{
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: .5;
      }
    }
  }
  div{
    width: 80px;
    height: 20px;
    border-radius: 8px;
    background-color: ${theme.colors.neutral.e};
    margin: auto;
  }
`