"use client";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/src/utils/helper/axios";
import ENDPOINTS from "@/src/utils/jsons/endpoints.json";
import { useDispatch } from "react-redux";
import { setProfile, setToken, Tokens } from "@/src/utils/store/slices/base";
import Schema from "Schema";
import Loading from "@/src/app/loading";
import { usePathname } from "next/navigation";
import { Icon } from "@/src/styles/common/icon";
import styled from "styled-components";
import { PageCont } from "@/src/styles/common";
import theme from "@/src/styles/theme";
import ErrorComp from "@/src/app/ErrorComp";

export const loginNeededUrl = ["/setting", "/statistics", "/archive"];

export const RootAuthorization = ({
  children,
  tokens,
}: {
  children: React.ReactNode;
  tokens: Tokens;
}) => {
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  let loginNeeded = pathname === "/";
  loginNeededUrl.forEach((url) => {
    if (pathname.includes(url)) loginNeeded = true;
  });

  useEffect(() => {
    dispatch(setToken(tokens));
    setLoading(true);
    axiosInstance()
      .get<Schema.Profile>(ENDPOINTS.USER.ME)
      .then((res) => {
        dispatch(setProfile({ user: res?.data }));
        setAuthorized(true);
      })
      .catch((err) => {
        console.log(err)
        setAuthorized(false)})
      .finally(() => setLoading(false));
    return () => {
      dispatch(setToken({ access: null, refresh: null }));
    };
  }, []);

  if (loading) return <Loading />;
  else if (loginNeeded && !authorized)
  return <ErrorComp statusCode={401} message="شما احراز هویت نشده اید." />;
  else if (!loginNeeded || authorized) return children;
  return <></>;
  return children;
};
