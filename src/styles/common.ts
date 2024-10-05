"use client";
import styled from "styled-components";

type ParentImageProps = {
  $w: number;
  $h: number;
  $sm_w?: number;
  $sm_h?: number;
  $md_w?: number;
  $md_h?: number;
  $lg_w?: number;
  $lg_h?: number;
};

export const PageCont = styled.main`
  width: 100%;
  padding: 16px;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 16px;

  @media (min-width: ${(p) => p.theme.breakpoints.md}) {
    padding-inline: 32px;
  }
`;

export const BlueBtn = styled.button`
  background-color: ${(p) => p.theme.colors.main};
  border-radius: 4px;
  padding: 8px 64px;
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: ${(p) => p.theme.colors.hover_main};
  }
`;

export const Overlay = styled.div<{ $zIndex: number }>`
  position: fixed;
  inset: 0;
  z-index: ${(p) => p.$zIndex};
`;

export const ParentImage = styled.div<ParentImageProps>`
  position: relative;
  width: ${(p) => p.$w}px;
  height: ${(p) => p.$h}px;
  @media (min-width: 640px) {
    width: ${(p) => p.$sm_w || p.$w}px;
    height: ${(p) => p.$sm_h || p.$h}px;
  }
  @media (min-width: 768px) {
    width: ${(p) => p.$md_w || p.$sm_w || p.$w}px;
    height: ${(p) => p.$md_h || p.$sm_h || p.$h}px;
  }
  @media (min-width: 1024px) {
    width: ${(p) => p.$lg_w || p.$md_w || p.$sm_w || p.$w}px;
    height: ${(p) => p.$lg_h || p.$md_h || p.$sm_h || p.$h}px;
  }
`;

export const Text = styled.p<{
  $fontSize?: number;
  $fontWeight?: number;
  $color?: string;
}>`
  font-size: ${(p) => p.$fontSize || 16}px;
  font-weight: ${(p) => p.$fontWeight || 500};
  color: ${(p) => p.$color || "#000"};
  white-space: nowrap;
`;