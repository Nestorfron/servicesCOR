import React, { useEffect } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";


export const Dashboard = () => {
  const { actions } = useContext(Context);

  useEffect(() => {
  }, []);
  

  const users = actions.users;




  return <div></div>;
};