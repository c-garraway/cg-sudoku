import { createTheme } from '@mui/material';


export const theme = createTheme({
    palette: {
        type: 'light',
        primary: { main: '#1565c0' },
        secondary: { main: '#673ab7' },
        highlightFont: { main: 'crimson'},
        cellFont: { standard: 'black', selected: 'chocolate'},
        cell: { standard: 'azure', selected: 'PowderBlue', error: 'PeachPuff', complete: 'MediumAquaMarine'},
        keyFont: { standard: 'black', completed: 'RoyalBlue'},
    },
});
