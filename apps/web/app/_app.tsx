import { MantineProvider } from "@mantine/core";

import App, { AppContext, AppInitialProps, AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <MantineProvider>
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}

MyApp.getInitialProps = async (
  context: AppContext,
): Promise<AppInitialProps> => {
  const ctx = await App.getInitialProps(context);

  return { ...ctx };
};
