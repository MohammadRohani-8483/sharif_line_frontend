'use client'
import styled from "styled-components"
import theme from "../theme"

export const BodyCont=styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  justify-content: center;
  align-items: center;
  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
  }
`

export const Description=styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
`

export const TextareaDescription=styled.textarea`
  background-color: white;
  width: 100%;
  color: #333;
  resize: none;
  border: 1px solid #EEE;
  padding: 16px;
  border-radius: 8px;
  height: 176px;
`

export const LeftSideDesc=styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  @media (min-width: ${theme.breakpoints.md}) {
    width: 320px;
  }
`

export const StatusVersion=styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: flex-start;
  align-items: flex-start;
`