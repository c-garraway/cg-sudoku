import React from "react";
import ControlSquare from './ControlSquare'
import { Box } from "@mui/material";

function ControlPad() {
    return (
        <Box sx={{display: "flex", border: '2px solid black', mt: 1}}>
            <ControlSquare value={'<'} />
            <ControlSquare value={'Reset'} />
            <ControlSquare value={'New'} />
            <ControlSquare value={'Level'} />
        </Box>
    );
}

export default ControlPad;
