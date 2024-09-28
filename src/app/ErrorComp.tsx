"use client";
import React, { useEffect } from "react";
import styled from "styled-components";
import { Icon } from "../styles/common/icon";
import { PageCont } from "../styles/common";

type Props = { statusCode: number; message: string };

export default function ErrorComp({ statusCode, message }: Props) {
  useEffect(() => {
    document.getElementById("sidebar")?.classList.add("hidden");
    document.getElementById("headerbar")?.classList.add("hidden");
    return () => {
      document.getElementById("sidebar")?.classList.remove("hidden");
      document.getElementById("headerbar")?.classList.remove("hidden");
    };
  }, []);
  return (
    <Container>
      <Icon
        name="logo-answer"
        width={194}
        height={82}
        style={{ margin: "40px auto" }}
      />
      <h1>{statusCode}</h1>
      <p>{message}</p>
    </Container>
  );
}

const Container = styled(PageCont)`
  align-items: center;
  justify-content: center;
  h1 {
    color: ${(p) => p.theme.colors.main};
    font-size: 96px;
    font-weight: 900;
    margin-top: 150px;
  }
  p {
    color: ${(p) => p.theme.colors.neutral[6]};
    font-size: 24px;
    font-weight: 300;
  }
`;
