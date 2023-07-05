import { Box, Typography } from "@mui/material";
import React from "react";
import { selectPuzzleStatus } from "../../features/gameData/gameDataSlice";
import { useSelector } from "react-redux";

function MoveCounter() {
    const puzzleStatus = useSelector(selectPuzzleStatus)
    const remainingCount = puzzleStatus?.null ? puzzleStatus.null : 0

    return (
        <Box>
            <Typography>Remaining</Typography>
            <Typography align="right">{remainingCount} {remainingCount !== 1 ? 'Cells' : 'Cell '}</Typography>
        </Box>
    );
}

export default MoveCounter;
