// lib
import * as React from 'react';

// components
import Link from 'next/link';
import {
  Button,
  Typography,
  IconButton,
  Grid,
  Popover,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import MenuIcon from '@mui/icons-material/Menu';
import { LightModeButton } from './LightModeButton';
import { DesktopModeButton } from './DesktopModeButton';

// hooks
import { useRouter } from 'next/dist/client/router';
import { useLoginInfo } from 'contexts/LoginContext';
import { useToggle } from 'hooks';
import { useBreakpoint } from 'hooks/useBreakpoint';

// constants
import { NAV_BUTTONS, NAV_CONFIG } from './config';

const Header = (): JSX.Element => {
  const { pathname } = useRouter();
  const { isLoggedIn } = useLoginInfo();

  const selected = NAV_BUTTONS.find((btn) => btn.path === pathname)?.key;
  const theme = useTheme();

  const breakpoint = useBreakpoint();

  const config = NAV_CONFIG[breakpoint];

  const { value: isMenuOpen, set: showMenu, unset: hideMenu } = useToggle();
  const menuAnchorRef = React.useRef<HTMLButtonElement | null>(null);

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
              <ListItemButton selected={btn.key === selected} key={btn.key} onClick={hideMenu}>
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
        py={1}
        id="header"
        direction="row"
        borderBottom={1}
        borderColor={theme.palette.text.secondary}
        wrap="nowrap"
      >
        <Grid item container xs="auto" justifyContent="center" alignItems="center">
          <StarBorderIcon color="primary" fontSize="large" />
          <Typography variant="h6">Speed</Typography>
        </Grid>
        <Grid item container xs="auto" gap={2} alignItems="center">
          {listEl}
          {config.menu.length ? (
            <IconButton onClick={showMenu} ref={menuAnchorRef} size="small">
              <MenuIcon />
            </IconButton>
          ) : null}
          <LightModeButton sx={{ marginLeft: -1 }} />
          <DesktopModeButton sx={{ marginLeft: -1 }} />
        </Grid>
      </Grid>
      {menuEl}
    </>
  );
};

const MemoizedHeader = React.memo(Header);
export { MemoizedHeader as Header };
