"use client";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import theme from "@/src/styles/theme";
import { RootLayout } from "../components/common/LayoutComponents/RootLayout";
import { RootAuthorization } from "@/src/components/common/LayoutComponents/RootAuth";
import store from "@/src/utils/store";
import { ModalContextProvider } from "@/src/utils/contexts/ModalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { type Tokens } from "../utils/store/slices/base";
import { type ReactNode } from "react";
import OidcProvider from "./OidcProvider";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true,
      retry: false,
    },
  },
});

export default function ClientLayout(p: {
  pathname: string;
  children: ReactNode;
  tokens: Tokens;
}) {
  const pathname = usePathname();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ModalContextProvider>
          <ThemeProvider theme={theme}>
            <OidcProvider>
              <RootAuthorization tokens={p.tokens}>
                <RootLayout pathname={pathname}>{p.children}</RootLayout>
              </RootAuthorization>
            </OidcProvider>
          </ThemeProvider>
        </ModalContextProvider>
      </QueryClientProvider>
    </Provider>
  );
}
