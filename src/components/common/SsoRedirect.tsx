"use client";
import Loading from "@/src/app/loading";
import { PageCont } from "@/src/styles/common";
import { useMemo } from "react";
import styled from "styled-components";

export default function SsoRedirect(p: { type: "back" | "forth" }) {
  const text = useMemo(
    () =>
      p.type === "forth"
        ? "در حال احراز هویت"
        : "احراز هویت با موفقیت انجام شد",
    [p.type]
  );
  return (
    <Container>
      <h1 style={{ marginTop: 200 }}>{text}</h1>
      <div style={{ position: "absolute", top: "20%" }}>
        <Loading />
      </div>
    </Container>
  );
}

const Container = styled(PageCont)`
  align-items: center;
  justify-content: center;
  h1 {
    color: ${(p) => p.theme.colors.main};
    font-size: 48px;
    font-weight: 800;
    margin-top: 150px;
  }
`;
