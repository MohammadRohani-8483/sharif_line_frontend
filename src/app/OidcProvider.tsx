"use client";
import * as Oidc from "@axa-fr/react-oidc";
import { CustomHistory } from "@axa-fr/react-oidc/dist/core/routes/withRouter";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import Loading from "./loading";
import ErrorComp from "./ErrorComp";

const configuration = {
  client_id: `${process.env.NEXT_PUBLIC_SSO_CLIENT}`,
  token_request_extras: {
    client_secret: `${process.env.NEXT_PUBLIC_SSO_SECRET}`,
  },
  redirect_uri: `${process.env.NEXT_PUBLIC_DOMAIN}/authentication/callback`,
  silent_redirect_uri: `${process.env.NEXT_PUBLIC_DOMAIN}/authentication/silent-callback`, // Optional activate silent-signin that use cookies between OIDC server and client javascript to restore the session
  scope: "openid profile offline_access",
  authority: `${process.env.NEXT_PUBLIC_AUTHORITY_URL}`,
  preload_user_info: true,
  service_worker_relative_url: "/OidcServiceWorker.js",
};

const onEvent = (configurationName: string, eventName: string, data: any) => {
  console.log(`oidc: ${configurationName}: ${eventName}`, data);
};

export default function OidcProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const withCustomHistory: () => CustomHistory = () => {
    return {
      replaceState: (url) => {
        router.replace(url || "");
        window.dispatchEvent(new Event("popstate"));
      },
    };
  };

  return (
    <Oidc.OidcProvider
      configuration={configuration}
      onEvent={onEvent}
      withCustomHistory={withCustomHistory}
      loadingComponent={Loading}
      callbackSuccessComponent={() => children}
      authenticatingErrorComponent={() => (
        <ErrorComp statusCode={401} message="شما احراز هویت نشده اید." />
      )}
    >
      <Oidc.OidcSecure>{children}</Oidc.OidcSecure>
    </Oidc.OidcProvider>
  );
}
