// lib
import * as React from 'react';
import { createTheme, PaletteMode, ThemeOptions, ThemeProvider } from '@mui/material';
import _noop from 'lodash/noop';

// colors
import { grey, purple, teal } from '@mui/material/colors';

// helpers
import { getFromLocalStorage, setToLocalStorage } from 'helper/localStorage';

const BLACK = '#000';
const WHITE = '#fff';

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
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
      color: mode === 'light' ? BLACK : WHITE,
    },
  },
});

type ColorMode = { mode: PaletteMode; toggleColorMode: () => void };

const ColorModeContext = React.createContext<ColorMode>({
  mode: 'light',
  toggleColorMode: _noop,
});

export const useColorMode = (): ColorMode => React.useContext(ColorModeContext);

export const AppThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const [mode, setMode] = React.useState<PaletteMode>(
    () => getFromLocalStorage('theme') ?? 'light',
  );

  const colorMode: ColorMode = React.useMemo(
    () => ({
      mode,
      toggleColorMode: (): void => {
        setToLocalStorage('theme', mode === 'light' ? 'dark' : 'light');
        setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [mode],
  );

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <ColorModeContext.Provider value={colorMode}>{children}</ColorModeContext.Provider>
    </ThemeProvider>
  );
};
