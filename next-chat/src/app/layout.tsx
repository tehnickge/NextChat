"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import "./globals.scss";
import { Provider } from "react-redux";
import { setupStore } from "../../store/store";

// import { ServerStyleSheet } from "styled-components";
// import GlobalStyle from "../../styles/globalStyles";
// import { ThemeProvider } from "styled-components";
// import theme from "../../styles/theme";

const store = setupStore();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <AppRouterCacheProvider>
        <html lang="en">
          <head>
            <title>Next Chat</title>
          </head>
          <body>{children}</body>
        </html>
      </AppRouterCacheProvider>
    </Provider>
  );
}
