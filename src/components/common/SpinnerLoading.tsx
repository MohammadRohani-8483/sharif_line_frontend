"use client";
import { CSSProperties } from "react";
import styled from "styled-components";

type SpinnerLoadingProp = {
  width?: number;
  height?: number;
  color: string;
  style?: CSSProperties;
};

export const SpinnerLoading = (props: SpinnerLoadingProp) => {
  return (
    <Spinner
      style={props.style}
      $size={props.width || props.height}
      color={props.color}
    />
  );
};

const Spinner = styled.div<{ $size?: number }>`
  @keyframes spin {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  width: ${(p) => p.$size || 50}px;
  height: ${(p) => p.$size || 50}px;
  border: 3px solid ${(p) => p.color};
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-radius: 50%;
  animation: spin 1s infinite linear;
`;
