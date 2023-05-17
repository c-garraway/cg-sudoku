import React from "react";
import ControlSquare from './ControlSquare'
import LevelSelect from "./LevelSelector";
import { Box } from "@mui/material";

function ControlPad() {
    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{display: "flex", justifyContent: 'space-between'}}>
                <ControlSquare value={'<'} />
                <ControlSquare value={'Re-Start'} />
                <ControlSquare value={'Solve'} />
            </Box>
            <Box sx={{display: "flex", justifyContent: 'center', mt: 1}}>
                <ControlSquare value={'New Puzzle'} />
                <LevelSelect />
            </Box>
        </Box>
    );
}

export default ControlPad;
