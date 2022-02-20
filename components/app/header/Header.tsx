import * as React from 'react';
import Link from 'next/link';

// components
import { Button, Typography, IconButton, Grid, Divider } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

// hooks
import { useRouter } from 'next/dist/client/router';
import { useLoginInfo } from 'contexts/LoginContext';
import { useColorMode } from 'contexts/AppThemeProvider';

// constants
import { NAV_BUTTONS } from './config';

const Header = (): JSX.Element => {
  const { pathname } = useRouter();
  const { isLoggedIn } = useLoginInfo();
  const selected = NAV_BUTTONS.find((btn) => btn.path === pathname)?.key;
  const colorMode = useColorMode();

  const ModeIcon = colorMode.mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />;

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        height="100%"
        px={4}
        id="header"
        direction="row"
      >
        <Grid item container xs="auto" justifyContent="center" alignItems="center">
          <StarBorderIcon color="primary" fontSize="large" />
          <Typography variant="h5">Speed</Typography>
        </Grid>
        <Grid item container xs="auto" gap={2}>
          {NAV_BUTTONS.map((btn) => {
            const { startIcon: Icon } = btn;
            const ButtonComp = (
              <Link href={btn.path} key={btn.key}>
                <Button
                  variant={btn.key === selected ? 'contained' : 'outlined'}
                  startIcon={<Icon />}
                >
                  {btn.title}
                </Button>
              </Link>
            );
            if (btn.loginRequired && !isLoggedIn) return undefined;
            return ButtonComp;
          })}

          <IconButton color="primary" onClick={colorMode.toggleColorMode}>
            {ModeIcon}
          </IconButton>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};

const MemoizedHeader = React.memo(Header);
export { MemoizedHeader as Header };
