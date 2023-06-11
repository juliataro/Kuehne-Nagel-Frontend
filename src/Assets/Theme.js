import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  mixins: {
    toolbar: {
      minHeight: 40,
      maxWidth: 100,
    },
  },
  
    palette: {
      primary: {
        light: '#fff',
        main: '#4fc3f7',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#fc036b',
        dark: '#ba000d',
        contrastText: '#000',
      },
    }
});
