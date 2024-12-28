import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "../src/store/appContext.jsx";

import Home from "./pages/home.jsx";
import Navbar from "./components/navbar.jsx";
import { Dashboard } from "./pages/dashboard.jsx";
import { Tickets } from "./pages/tickets.jsx";
import { Branches } from "./pages/branches.jsx";
import { Client } from "./pages/client.jsx";
import { Providers } from "./pages/providers.jsx";
import { Ingeniers } from "./pages/ingeniers.jsx";
import { Factures } from "./pages/factures.jsx";

function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <BrowserRouter {...pageProps}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/client" element={<Client />} />
            <Route path="/providers" element={<Providers />} />
            <Route path="/ingeniers" element={<Ingeniers />} />
            <Route path="/factures" element={<Factures />} />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
        </BrowserRouter>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export default injectContext(App);
