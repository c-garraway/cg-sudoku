import { createTheme } from '@mui/material';


export const theme = createTheme({
    palette: {
        type: 'light',
        primary: { main: '#1565c0' },
        secondary: { main: '#673ab7' },
        cellFont: { standard: 'black', selected: 'chocolate'},
        cell: { standard: 'white', selected: 'PowderBlue', error: 'PeachPuff'},
        keyFont: { standard: 'black', completed: 'RoyalBlue'},
    },
});

//MediumAquaMarine