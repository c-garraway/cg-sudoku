import React from "react";
import ControlSquare from './ControlSquare'
import SelectSquare from './SelectSquare'
import { Box } from "@mui/material";

function ControlPad() {
    return (
        <Box sx={{display: "flex", border: '2px solid black', mt: 1, /* alignItems: 'start' */}}>
            <ControlSquare value={'<'} />
            <ControlSquare value={'Reset'} />
            <ControlSquare value={'New'} />
            <SelectSquare value={'Level'} />
            <ControlSquare value={'Resolve'} />
        </Box>
    );
}

export default ControlPad;
