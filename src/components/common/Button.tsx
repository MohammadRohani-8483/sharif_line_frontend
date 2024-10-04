"use client";
import styled from "styled-components";
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import theme from "@/src/styles/theme";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {};

export default function Button(p: Props) {
  const { ...rest } = p;
  return <Container {...rest}></Container>;
}

const Container = styled.button`
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  background-color: #2979ff1a;
  color: ${theme.colors.main};
  opacity: ${(p) => (p.disabled ? 0.5 : 1)};
  cursor: ${(p) => (p.disabled ? "default" : "pointer")};
  &:hover {
    backdrop-filter: contrast(${(p) => (p.disabled ? 100 : 85)}%);
  }
`;
