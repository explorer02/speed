//lib
import * as React from "react";

//components
import { Box } from "@mui/material";
import { Login } from "components/Login";

//types
import { NextPage } from "next";

const Home: NextPage = () => {
  return false ? <Box>Home</Box> : <Login />;
};

export default Home;
