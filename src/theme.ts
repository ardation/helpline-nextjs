import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Nunito Sans',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            'Helvetica',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    palette: {
        primary: {
            main: '#07838E',
        },
        secondary: {
            main: '#EB1317',
        },
        text: {
            primary: '#202020',
        },
        background: {
            default: '#fff',
        },
    },
    overrides: {
        MuiTypography: {
            gutterBottom: {
                marginBottom: '1rem',
            },
        },
    },
});

export default theme;
