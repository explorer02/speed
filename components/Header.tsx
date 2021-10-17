import * as React from "react";
import _ from "lodash";

//components
import { Button, Typography, Box } from "@mui/material";

//icons
import StarBorderIcon from "@mui/icons-material/StarBorder";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

//hooks
import { useRouter } from "next/dist/client/router";

//constants
import { centerVertically } from "utils/commonProps";

//types
import { StringAnyMap } from "types";

const NAV_BUTTONS = {
  home: {
    title: "Home",
    loginRequired: false,
    path: "/",
    startIcon: <HomeOutlinedIcon />,
  },
  availability: {
    title: "Availability",
    loginRequired: false,
    path: "/availability",
    startIcon: <TrendingUpOutlinedIcon />,
  },
  order: {
    title: "Order",
    loginRequired: true,
    path: "/order",
    startIcon: <NoteAltOutlinedIcon />,
  },
  profile: {
    title: "Profile",
    loginRequired: true,
    path: "/profile",
    startIcon: <AccountCircleOutlinedIcon />,
  },
  locate: {
    title: "Locate Us",
    loginRequired: false,
    path: "/locate",
    startIcon: <LocationOnOutlinedIcon />,
  },
};

export const Header = ({
  isLoggedIn = true,
  containerStyles,
}: {
  containerStyles?: StringAnyMap;
  isLoggedIn?: boolean;
}) => {
  const { push } = useRouter();
  const [selected, setSelected] = React.useState("home");

  return (
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
      <Box display="flex" gap="16px">
        {_.map(
          NAV_BUTTONS,
          (btn, key) =>
            (!btn.loginRequired || isLoggedIn) && (
              <Button
                key={key}
                variant={key === selected ? "contained" : "outlined"}
                startIcon={btn.startIcon}
                onClick={() => {
                  push(btn.path);
                  setSelected(key);
                }}
              >
                {btn.title}
              </Button>
            )
        )}
      </Box>
    </Box>
  );
};
