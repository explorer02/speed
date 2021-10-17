import * as React from "react";

// components
import { Box } from "@mui/material";
import { Header } from "./Header";

//constants
import { expandXY } from "utils/commonProps";

export const Layout = ({ children }: { children: React.ReactChildren }) => (
  <Box display="flex" flexDirection="column" {...expandXY}>
    <Header containerStyles={{ height: 80, flexShrink: 0 }} />
    <Box sx={{ flexGrow: 1 }}>{children}</Box>
  </Box>
);
