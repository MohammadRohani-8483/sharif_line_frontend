"use client";
import styled from "styled-components";
import { PageCont } from "../common";
import theme from "../theme";

export const AnswerCont = styled(PageCont)`
  font-family: "IranYekan" !important;
  color: ${theme.colors.neutral[3]} !important;
  * {
    transition: all 0.1s;
  }

  .sv-header {
    display: none;
  }
  .sd-rating__min-text,
  .sd-rating__max-text {
    display: none;
  }
  .sd-body,
  .sd-body--responsive {
    padding: 50px 4px !important;
  }
  .sd-rating__item {
    border-radius: 16px;
    border: 1px solid ${(p) => p.theme.colors.neutral.e};
    box-shadow: none;
    cursor: pointer;
  }
  .sd-action-bar {
    justify-content: flex-end;
  }
  .sd-error {
    text-align: right;
  }
  .sd-completedpage {
    padding: 32px !important;
    border-radius: 12px;
    border: 1px solid ${theme.colors.neutral.e};
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: fit-content;
    margin: auto;
    margin-top: 80px;
    &::after,
    &::before {
      content: "";
      width: 0;
      height: 0;
      margin: 0 !important;
    }
    h3 {
      font-size: 20px;
      font-weight: 600;
    }
    h4 {
      font-size: 20px;
      font-weight: 300;
    }
  }
  .sd-action:not(.sd-action--pressed):hover,
  .sd-action:not(.sd-action--pressed):focus {
    background-color: ${theme.colors.neutral.hover};
  }
  .sv-ranking-item__index {
    background-color: ${theme.colors.mainBack.main};
    color: ${theme.colors.main};
    svg {
      fill: ${theme.colors.main};
    }
  }
  button,
  .svc-btn {
    border-radius: 8px;
    background-color: ${theme.colors.mainBack.main};
    padding: 8px;
    color: ${theme.colors.main};
    cursor: pointer;

    &:hover {
      background-color: ${theme.colors.mainBack.hover};
    }
  }
`;

export const TitleCont = styled.div`
  width: 100%;
  border-radius: 16px;
  background-color: white;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(p) => p.theme.colors.neutral.e};

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    p {
      font-size: 18px;
      font-weight: 600;
      max-width: 200px;
      line-height: 180%;

      @media (min-width: ${theme.breakpoints.sm}) {
        max-width: 400px;
      }
      @media (min-width: ${theme.breakpoints.md}) {
        font-size: 24px;
        max-width: 500px;
      }
      @media (min-width: ${theme.breakpoints.lg}) {
        max-width: 800px;
      }
    }

    .share {
      width: 44px;
      height: 44px;
      background-color: ${(p) => p.theme.colors.neutral.fa};
      border: 1px solid ${(p) => p.theme.colors.neutral.e};
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &:hover {
        background-color: ${(p) => p.theme.colors.neutral.e};
      }
    }
  }

  .desc {
    border-radius: 6px;
    width: 100%;
    padding: 12px;
    font-size: 14px;
    border: 1px solid ${(p) => p.theme.colors.neutral.e};
    color: ${theme.colors.neutral[6]};
    line-height: 180%;
    text-align: justify;

    @media (min-width: ${theme.breakpoints.md}) {
      padding: 18px;
      font-size: 16px;
    }
    @media (min-width: ${theme.breakpoints.lg}) {
      padding: 24px;
    }
  }
`;
