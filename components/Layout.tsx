import React from "react";

// components
import { Box } from "@mui/system";
import { Header } from "./Header";

export const Layout = ({ children }: { children: React.ReactChildren }) => (
  <Box>
    <Header />
    <Box>{children}</Box>
  </Box>
);
