import React from "react";
import KeySquare from "./KeySquare"
import { Box } from "@mui/material";

function KeyPad() {
    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{display: "flex", justifyContent: 'space-between'}}>
                <KeySquare value={1} />
                <KeySquare value={2} />
                <KeySquare value={3} />
                <KeySquare value={4} />
                <KeySquare value={5} />
            </Box>
            <Box sx={{display: "flex", justifyContent: 'space-between'}}>
                <KeySquare value={6} />
                <KeySquare value={7} />
                <KeySquare value={8} />
                <KeySquare value={9} />
                <KeySquare value={null} />
            </Box>
            
        </Box>
    );
}

export default KeyPad;
