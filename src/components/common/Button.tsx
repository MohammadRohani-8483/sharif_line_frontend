"use client";
import styled from "styled-components";
import { ButtonHTMLAttributes, DetailedHTMLProps, useRef } from "react";
import theme from "@/src/styles/theme";
import { SpinnerLoading } from "./SpinnerLoading";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { $isLoading?: boolean; $colorMode?: "reversed" | "default" };

export default function Button(p: Props) {
  const { children, ...rest } = p;
  const refCont = useRef<HTMLButtonElement | null>(null);
  return (
    <Container {...rest} ref={refCont}>
      {p.$isLoading && (
        <SpinnerLoading
          style={{ position: "absolute" }}
          color={color(p)}
          height={(refCont.current?.clientHeight || 12) - 18}
        />
      )}
      <div style={{ opacity: p.$isLoading ? 0 : 1 }}>{children}</div>
    </Container>
  );
}

const Container = styled.button<Props>`
  border-radius: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  background-color: ${(p) => backgroundColor(p)};
  color: ${(p) => color(p)};
  opacity: ${(p) => (p.disabled ? 0.5 : 1)};
  cursor: ${(p) => (p.disabled ? "default" : "pointer")};
  &:hover {
    background-color: ${(p) =>
      p.disabled || p.$isLoading ? backgroundColor(p) : hoverBackground(p)};
  }
`;

const backgroundColor = (p: Props) => {
  const colorMode = p.$colorMode || "default";
  switch (colorMode) {
    case "default":
      return theme.colors.main;
    case "reversed":
      return theme.colors.mainBack.main;
  }
};

const hoverBackground = (p: Props) => {
  const colorMode = p.$colorMode || "default";
  switch (colorMode) {
    case "default":
      return theme.colors.hover_main;
    case "reversed":
      return theme.colors.mainBack.hover;
  }
};

const color = (p: Props) => {
  const colorMode = p.$colorMode || "default";
  switch (colorMode) {
    case "default":
      return theme.colors.neutral.f;
    case "reversed":
      return theme.colors.main;
  }
};
