import { createTheme } from '@mui/material';


export const theme = createTheme({
    palette: {
        type: 'light',
        primary: { main: '#1565c0' },
        secondary: { main: '#673ab7' },
        highlightFont: { main: 'crimson'},
        messageFont: {main: 'black', bestTime: 'crimson'},
        cellFont: { standard: 'black', selected: '#1565c0'},
        cell: { standard: 'azure', selected: 'lightblue', error: 'pink', complete: 'MediumAquaMarine'},
        keyFont: { standard: 'black', completed: '#1565c0'},
    },
});

