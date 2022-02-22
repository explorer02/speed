// lib
import * as React from 'react';
import _noop from 'lodash/noop';
import { createTheme, PaletteMode, ThemeOptions, ThemeProvider } from '@mui/material';
import { useLocalStorage } from 'react-use';

// colors
import { grey, purple, teal } from '@mui/material/colors';

export const PALETTE_MODE = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

const BLACK = '#000';
const WHITE = '#fff';

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === PALETTE_MODE.LIGHT
      ? {
          // palette values for light mode
          primary: purple,
          divider: purple[200],
          text: {
            primary: BLACK,
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: teal,
          divider: teal[700],
          background: {
            default: grey[900],
            paper: grey[900],
          },
          text: {
            primary: WHITE,
            secondary: grey[500],
          },
        }),
  },
  typography: {
    allVariants: {
      color: mode === PALETTE_MODE.LIGHT ? BLACK : WHITE,
    },
  },
});

type ColorMode = { mode: PaletteMode; toggleColorMode: () => void };

const ColorModeContext = React.createContext<ColorMode>({
  mode: PALETTE_MODE.LIGHT,
  toggleColorMode: _noop,
});

export const useColorMode = (): ColorMode => React.useContext(ColorModeContext);

export const AppThemeProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [mode = PALETTE_MODE.LIGHT, setMode] = useLocalStorage<PaletteMode>(
    'theme',
    PALETTE_MODE.LIGHT,
  );

  const colorMode: ColorMode = React.useMemo(
    () => ({
      mode,
      toggleColorMode: (): void => {
        setMode(mode === PALETTE_MODE.DARK ? PALETTE_MODE.LIGHT : PALETTE_MODE.DARK);
      },
    }),
    [mode, setMode],
  );

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <ColorModeContext.Provider value={colorMode}>{children}</ColorModeContext.Provider>
    </ThemeProvider>
  );
};
