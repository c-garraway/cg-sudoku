import React from "react";
import KeySquare from "./KeySquare"
import { Box } from "@mui/material";

function KeyPad() {
    return (
        <Box sx={{display: "flex", border: '2px solid black'}}>
            <KeySquare value={1} />
            <KeySquare value={2} />
            <KeySquare value={3} />
            <KeySquare value={4} />
            <KeySquare value={5} />
            <KeySquare value={6} />
            <KeySquare value={7} />
            <KeySquare value={8} />
            <KeySquare value={9} />
        </Box>
    );
}

export default KeyPad;
