'use client'
import styled from 'styled-components'
import theme from '../theme'

export const PaymentBox = styled.div`
  margin: auto;
  border: 1px solid ${theme.colors.neutral.e};
  background-color: white;
  padding: 16px;
  border-radius: 16px;
  width: 280px;
  gap: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  .title{
    font-size: 18px;
    font-weight: 700;
  }
  .subtitle{
    font-size: 14px;
    font-weight: 500;
    text-align: justify;
    text-align-last: center;
    color: ${theme.colors.neutral[7]};
  }
  .item{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 8px;
    background-color: ${theme.colors.neutral.fa};
    border: 1px solid ${theme.colors.neutral.e};
    border-radius: 8px;
    h4{
      font-size: 14px;
      font-weight: 300;
      color: #757575;
    }
    h3{
      font-size: 18px;
      font-weight: 500;
      color: #555555;
    }
    .price{
      display: flex;
      gap: 4px;
      align-items: center;
      justify-content: center;
    }
  }
  button{
    font-size: 16px;
    font-weight: 500;
    width: 100%;
    padding: 8px 0;
    border-radius: 4px;
    color: ${theme.colors.main};
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${theme.colors.mainBack.main};

    &:hover{
      background-color: ${theme.colors.mainBack.hover};
    }
  }
  
  @media (min-width: ${theme.breakpoints.md}) {
    width: 360px;
    .title{
      font-size: 20px;
    }
    .subtitle{
      font-size: 16px;
    }
    .item{
      padding: 12px;
      h4{
        font-size: 16px;
      }
      h3{
        font-size: 20px;
      }
    }
  }
`