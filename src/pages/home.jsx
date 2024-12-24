import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext.jsx";
import { useTheme } from "next-themes";
import { Button } from "@nextui-org/react";

function Home() {
    const { theme, setTheme } = useTheme();


  return (
    <div>
      <div>
        The current theme is: {theme}
        <Button color="primary" onClick={() => setTheme("light")}>
          Light Mode
        </Button>
        <Button color="primary" onClick={() => setTheme("dark")}>
          Dark Mode
        </Button>
      </div>
    </div>
  );
}

export default Home;
