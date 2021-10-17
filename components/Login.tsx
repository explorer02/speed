import React from "react";

// components
import {
  Typography,
  Box,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

//icons
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";

//constants
import { centerAll } from "utils/commonProps";

export const Login = () => {
  return (
    <Box height="100%" {...centerAll}>
      <Box
        minHeight="50%"
        minWidth="30%"
        maxWidth="50%"
        {...centerAll}
        flexDirection="column"
        gap="40px"
      >
        <Typography
          variant="h4"
          component="div"
          {...centerAll}
          gap="16px"
          mb={4}
        >
          <LoginOutlinedIcon fontSize="large" /> Login
        </Typography>
        <TextField
          label="Phone Number"
          color="primary"
          fullWidth
          required
          helperText="Please enter your phone number here..."
          type="tel"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocalPhoneOutlinedIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <LoadingButton
          variant="contained"
          fullWidth
          size="large"
          sx={{ padding: 2 }}
          startIcon={<DoneAllOutlinedIcon />}
          loading={true}
          loadingIndicator="Logging in... Please wait!!"
        >
          Submit
        </LoadingButton>
      </Box>
    </Box>
  );
};
