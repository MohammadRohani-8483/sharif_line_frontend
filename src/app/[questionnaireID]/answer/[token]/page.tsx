import React from "react";
import PageAnswer from "../page";

export default function Page({
  params,
}: {
  params: { questionnaireID: string; token?: string };
}) {
  return <PageAnswer params={params} />;
}
