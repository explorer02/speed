// lib
import { useContext, useMemo, createContext } from 'react';
import _noop from 'lodash/noop';

// components
import { createTheme, PaletteMode, ThemeOptions, ThemeProvider } from '@mui/material';

// hooks
import { useLocalStorage } from 'hooks/useLocalStorage';

// constants
import { grey, purple, indigo, deepOrange } from '@mui/material/colors';

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
          primary: indigo,
          secondary: purple,
          text: {
            primary: BLACK,
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: deepOrange,
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

const ColorModeContext = createContext<ColorMode>({
  mode: PALETTE_MODE.LIGHT,
  toggleColorMode: _noop,
});

export const useColorMode = (): ColorMode => useContext(ColorModeContext);

export const AppThemeProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [mode = PALETTE_MODE.LIGHT, setMode] = useLocalStorage<PaletteMode>(
    'theme',
    PALETTE_MODE.LIGHT,
  );

  const colorMode: ColorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: (): void => {
        setMode(mode === PALETTE_MODE.DARK ? PALETTE_MODE.LIGHT : PALETTE_MODE.DARK);
      },
    }),
    [mode, setMode],
  );

  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <ColorModeContext.Provider value={colorMode}>{children}</ColorModeContext.Provider>
    </ThemeProvider>
  );
};
