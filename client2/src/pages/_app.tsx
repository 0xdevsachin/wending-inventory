import { CartProvider } from "@/context/cartContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <CartProvider>
      <SnackbarProvider anchorOrigin={{
        horizontal: "right",
        vertical: "top"
      }}
        autoHideDuration={3000}
        maxSnack={5}
      >
        <Component {...pageProps} />
      </SnackbarProvider>
    </CartProvider>
  </>;
}
