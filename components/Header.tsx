import React from "react";

//components
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";

//icons
import StarBorderIcon from "@mui/icons-material/StarBorder";

//constants
import { centerVertically } from "utils/commonProps";

//types
import { StringAnyMap } from "types";

export const Header = ({
  isLoggedIn = false,
  containerStyles,
}: {
  containerStyles?: StringAnyMap;
  isLoggedIn?: boolean;
}) => (
  <Box
    {...containerStyles}
    borderBottom={1}
    borderColor="silver"
    {...centerVertically}
    justifyContent="space-between"
    px={4}
  >
    <Box display="flex" flexDirection="row">
      <StarBorderIcon color="primary" fontSize="large" />
      <Typography variant="h5" component="div" ml={1} {...centerVertically}>
        Speed
      </Typography>
    </Box>
    <Box>
      <Button variant="contained">Availability</Button>
      {isLoggedIn && (
        <>
          <Button variant="outlined" sx={{ marginLeft: 2 }}>
            Order
          </Button>
          <Button variant="outlined" sx={{ marginLeft: 2 }}>
            Profile
          </Button>
        </>
      )}
      <Button variant="outlined" sx={{ marginLeft: 2 }}>
        Locate us
      </Button>
    </Box>
  </Box>
);
