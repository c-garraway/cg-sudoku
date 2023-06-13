import React from "react";
import LevelSelect from "./LevelSelector";
import PauseButton from './PauseButton'
import BackButton from './BackButton'
import NewPuzzleButton from "./NewPuzzleButton";
import RestartButton from "./RestartButton";
import SolveButton from "./SolveButton";
import { Box } from "@mui/material";


function ControlPad() {
    const controlButtonWith = '8ch'
    return (
        <Box sx={{width: '100%', mt: 2, pb: 1, borderTop: '1px solid black', borderBottom: {sm:'1px solid black'}}}>
            <Box sx={{display: "flex", justifyContent: 'space-between',}}>
                <BackButton width={controlButtonWith}/>
                <PauseButton width={controlButtonWith}/>
                <RestartButton />
                <SolveButton />
            </Box>
            <Box sx={{display: "flex", justifyContent: 'space-between', mt: 1}}>
                <NewPuzzleButton />
                <LevelSelect />
            </Box>
        </Box>
    );
}

export default ControlPad;
