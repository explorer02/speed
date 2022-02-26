import * as React from 'react';
import Link from 'next/link';

// components
import {
  Button,
  Typography,
  IconButton,
  Grid,
  Divider,
  Popover,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButtonWithTooltip } from 'reusable/iconButtonWithTooltip';

// hooks
import { useRouter } from 'next/dist/client/router';
import { useLoginInfo } from 'contexts/LoginContext';
import { PALETTE_MODE, useColorMode } from 'contexts/AppThemeProvider';
import { useToggle } from 'hooks';
import { useBreakpoint } from 'hooks/useBreakpoint';

// constants
import { NAV_BUTTONS, NAV_CONFIG } from './config';

const Header = (): JSX.Element => {
  const { pathname } = useRouter();
  const { isLoggedIn } = useLoginInfo();

  const selected = NAV_BUTTONS.find((btn) => btn.path === pathname)?.key;

  const colorMode = useColorMode();
  const breakpoint = useBreakpoint();
  const config = NAV_CONFIG[breakpoint];

  const { value: isMenuOpen, set: showMenu, unset: hideMenu } = useToggle();
  const menuAnchorRef = React.useRef<HTMLButtonElement | null>(null);

  const ModeIcon = colorMode.mode === PALETTE_MODE.DARK ? <DarkModeIcon /> : <LightModeIcon />;

  const listEl = config.list.map((btn) => {
    const { startIcon: Icon } = btn;
    if (btn.loginRequired && !isLoggedIn) return undefined;

    return (
      <Link href={btn.path} key={btn.key} prefetch={false}>
        <Button
          variant={btn.key === selected ? 'contained' : 'outlined'}
          sx={{ fontWeight: 400, height: 40 }}
          startIcon={<Icon />}
          size="small"
        >
          {btn.title}
        </Button>
      </Link>
    );
  });

  const menuEl = (
    <Popover
      id="nav-popover"
      open={isMenuOpen}
      anchorEl={menuAnchorRef.current}
      onClose={hideMenu}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <List>
        {config.menu.map((btn) => {
          const { startIcon: Icon } = btn;
          if (btn.loginRequired && !isLoggedIn) return undefined;

          return (
            <Link href={btn.path} key={btn.key} prefetch={false}>
              <ListItemButton selected={btn.key === selected} key={btn.key}>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText>{btn.title}</ListItemText>
              </ListItemButton>
            </Link>
          );
        })}
      </List>
    </Popover>
  );

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        height="100%"
        px={4}
        mt={1}
        id="header"
        direction="row"
      >
        <Grid item container xs="auto" justifyContent="center" alignItems="center">
          <StarBorderIcon color="primary" fontSize="large" />
          <Typography variant="h6">Speed</Typography>
        </Grid>
        <Grid item container xs="auto" gap={2} alignItems="center">
          {listEl}
          {config.menu.length ? (
            <IconButton onClick={showMenu} ref={menuAnchorRef}>
              <MenuIcon />
            </IconButton>
          ) : null}
          <IconButtonWithTooltip
            title="Change Light Mode"
            color="primary"
            onClick={colorMode.toggleColorMode}
          >
            {ModeIcon}
          </IconButtonWithTooltip>
        </Grid>
      </Grid>
      <Divider sx={{ marginTop: 1 }} />
      {menuEl}
    </>
  );
};

const MemoizedHeader = React.memo(Header);
export { MemoizedHeader as Header };
