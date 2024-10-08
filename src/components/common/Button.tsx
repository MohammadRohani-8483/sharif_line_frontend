"use client";
import styled from "styled-components";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
  useRef,
} from "react";
import theme from "@/src/styles/theme";
import { SpinnerLoading } from "./SpinnerLoading";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { isLoading?: boolean };

export default function Button(p: Props) {
  const { isLoading, children, ...rest } = p;
  const refCont = useRef<HTMLButtonElement | null>(null);
  return (
    <Container {...rest} ref={refCont}>
      {isLoading && (
        <SpinnerLoading
          style={{ position: "absolute" }}
          color="#2979FF"
          height={(refCont.current?.clientHeight || 12) - 18}
        />
      )}
      <div style={{ opacity: isLoading ? 0 : 1 }}>{children}</div>
    </Container>
  );
}

const Container = styled.button`
  border-radius: 8px;
  position: relative;
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
