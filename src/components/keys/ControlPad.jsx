import React from "react";
//import ControlSquare from './ControlSquare'
import LevelSelect from "./LevelSelector";
import PauseButton from './PauseButton'
import BackButton from './BackButton'
import NewPuzzleButton from "./NewPuzzleButton";
import RestartButton from "./RestartButton";
import SolveButton from "./SolveButton";
import { Box } from "@mui/material";


function ControlPad() {
    const controlButtonWith = '10ch'
    return (
        <Box sx={{width: '100%', mt: 2}}>
            <Box sx={{display: "flex", justifyContent: 'space-between'}}>
                <BackButton width={controlButtonWith}/>
                <PauseButton width={controlButtonWith}/>
                <RestartButton />
                <SolveButton />
            </Box>
            <Box sx={{display: "flex", justifyContent: 'center', mt: 1}}>
                <NewPuzzleButton />
                <LevelSelect />
            </Box>
        </Box>
    );
}

export default ControlPad;
