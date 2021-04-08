import { createMuiTheme } from '@material-ui/core/styles';
import { RatingClassKey } from '@material-ui/lab/Rating';

declare module '@material-ui/core/styles/overrides' {
    export interface ComponentNameToClassKey {
        MuiRating: RatingClassKey;
    }
}

// Create a theme instance.
const theme = createMuiTheme({
    typography: {
        fontFamily: ['"Source Sans Pro"', 'sans-serif'].join(','),
        h1: {
            fontFamily: ['"Source Serif Pro"', 'serif'].join(','),
            fontWeight: 600,
        },
        h2: {
            fontFamily: ['"Source Serif Pro"', 'serif'].join(','),
            fontWeight: 600,
        },
        h3: {
            fontFamily: ['"Source Serif Pro"', 'serif'].join(','),
            fontWeight: 600,
        },
        h4: {
            fontFamily: ['"Source Serif Pro"', 'serif'].join(','),
            fontWeight: 600,
        },
        h5: {
            fontFamily: ['"Source Serif Pro"', 'serif'].join(','),
            fontWeight: 600,
        },
        h6: {
            fontFamily: ['"Source Serif Pro"', 'serif'].join(','),
            fontWeight: 600,
        },
        subtitle1: {
            fontFamily: ['"Source Serif Pro"', 'serif'].join(','),
            fontWeight: 600,
        },
        subtitle2: {
            fontFamily: ['"Source Serif Pro"', 'serif'].join(','),
            fontWeight: 600,
        },
    },
    palette: {
        primary: {
            main: '#2B8E94',
        },
        secondary: {
            main: '#94BCD9',
            contrastText: '#FFFFFF',
        },
        text: {
            primary: '#0F2027',
            secondary: '#ABB2B5',
        },
        background: {
            default: 'rgba(148, 188, 217, 0.1)',
        },
    },
    overrides: {
        MuiTypography: {
            gutterBottom: {
                marginBottom: '1rem',
            },
        },
        MuiChip: {
            root: {
                backgroundColor: '#F7F7F7',
                color: 'rgba(15, 34, 61, 0.5)',
            },
        },
        MuiButton: {
            root: {
                borderRadius: '10px',
                fontWeight: 600,
                textTransform: 'capitalize',
            },
            contained: {
                boxShadow: 'none',
                backgroundColor: '#F7F7F7',
            },
            containedPrimary: {
                color: '#fff',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%), #2B8E94',
            },
            containedSecondary: {
                color: '#fff',
                background:
                    'linear-gradient(180deg, rgba(255, 255, 255, 0.125) 0%, rgba(0, 0, 0, 0.125) 100%), #E8886C',
            },
        },
        MuiFab: {
            root: {
                boxShadow: 'none',
            },
            primary: {
                color: '#fff',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%), #2B8E94',
            },
            secondary: {
                color: '#fff',
                background:
                    'linear-gradient(180deg, rgba(255, 255, 255, 0.125) 0%, rgba(0, 0, 0, 0.125) 100%), #E8886C',
            },
        },
        MuiTooltip: {
            tooltip: {
                fontSize: '0.8rem',
                backgroundColor: 'rgba(15,32,39,0.8)',
                borderRadius: 8,
            },
            arrow: {
                color: '#0F2027',
            },
        },
        MuiRating: {
            root: {
                color: '#ECE686',
            },
        },
        MuiTabs: {
            indicator: {
                backgroundColor: 'rgba(15,35,45,0.5)',
            },
        },
        MuiTab: {
            root: {
                borderBottom: '0.603865px solid #ABB2B5',
                textTransform: 'capitalize',
            },
        },
        MuiCssBaseline: {
            '@global': {
                html: {
                    WebkitFontSmoothing: 'auto',
                },
                h1: {
                    fontFamily: ['"Source Serif Pro"', 'serif'].join(','),
                    fontWeight: 600,
                },
                h2: {
                    fontFamily: ['"Source Serif Pro"', 'serif'].join(','),
                    fontWeight: 600,
                },
                h3: {
                    fontFamily: ['"Source Serif Pro"', 'serif'].join(','),
                    fontWeight: 600,
                },
                h4: {
                    fontFamily: ['"Source Serif Pro"', 'serif'].join(','),
                    fontWeight: 600,
                },
                h5: {
                    fontFamily: ['"Source Serif Pro"', 'serif'].join(','),
                    fontWeight: 600,
                },
                h6: {
                    fontFamily: ['"Source Serif Pro"', 'serif'].join(','),
                    fontWeight: 600,
                },
                'a:link, a:visited': {
                    color: '#0F2027',
                },
            },
        },
    },
});

export default theme;
