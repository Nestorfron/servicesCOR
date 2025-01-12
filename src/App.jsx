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
import { Customers } from "./pages/customers.jsx";
import { Providers } from "./pages/providers.jsx";
import { Engineers } from "./pages/engineers.jsx";
import { Invoices } from "./pages/invoices.jsx";

import { TechAbstractShapes } from "./components/background/techAbstractShapes.jsx";

function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
    <NextThemesProvider attribute="class" defaultTheme="dark">
      <BrowserRouter {...pageProps}>
        <TechAbstractShapes />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/providers" element={<Providers />} />
          <Route path="/engineers" element={<Engineers />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route element={<h1>Not found!</h1>} />
        </Routes>
      </BrowserRouter>
    </NextThemesProvider>
  </NextUIProvider>
  );
}

export default injectContext(App);
