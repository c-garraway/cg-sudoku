import React from "react";
import Section from "./Section";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { selectSection1, selectSection2, selectSection3, selectSection4, selectSection5, selectSection6, selectSection7, selectSection8, selectSection9 } from "../../features/gameData/gameDataSlice";

function Puzzle() {
    const valuesSection1 = useSelector(selectSection1)
    const valuesSection2 = useSelector(selectSection2)
    const valuesSection3 = useSelector(selectSection3)
    const valuesSection4 = useSelector(selectSection4)
    const valuesSection5 = useSelector(selectSection5)
    const valuesSection6 = useSelector(selectSection6)
    const valuesSection7 = useSelector(selectSection7)
    const valuesSection8 = useSelector(selectSection8)
    const valuesSection9 = useSelector(selectSection9)

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', border: '2px solid black', width: 'fit-content', mb: 10}}>
            <Box sx={{display: 'flex'}}>
                <Section 
                    values={valuesSection1}
                    section={1}
                />
                <Section 
                    values={valuesSection2}
                    section={2}
                />
                <Section 
                    values={valuesSection3}
                    section={3}
                />
            </Box>
            <Box sx={{display: 'flex'}}>
                <Section 
                    values={valuesSection4}
                    section={4}
                />
                <Section 
                    values={valuesSection5}
                    section={5}
                />
                <Section 
                    values={valuesSection6}
                    section={6}
                />
            </Box>
            <Box sx={{display: 'flex'}}>
                <Section 
                    values={valuesSection7}
                    section={7}
                />
                <Section 
                    values={valuesSection8}
                    section={8}
                />
                <Section 
                    values={valuesSection9}
                    section={9}
                />
            </Box>
        </Box>
    );
}

export default Puzzle;

/* const row3Sec1 = [
    [values[6][0], values[6][1], values[6][2]], 
    [values[7][0], values[7][1], values[7][2]], 
    [values[8][0], values[8][1], values[8][2]]
]

const row3Sec2 = [
    [values[6][3], values[6][4], values[6][5]], 
    [values[7][3], values[7][4], values[7][5]], 
    [values[8][3], values[8][4], values[8][5]]
]

const row3Sec3 = [
    [values[6][6], values[6][7], values[6][8]], 
    [values[7][6], values[7][7], values[7][8]], 
    [values[8][6], values[8][7], values[8][8]]
]

const row2Sec1 = [
    [values[3][0], values[3][1], values[3][2]], 
    [values[4][0], values[4][1], values[4][2]], 
    [values[5][0], values[5][1], values[5][2]]
]

const row2Sec2 = [
    [values[3][3], values[3][4], values[3][5]], 
    [values[4][3], values[4][4], values[4][5]], 
    [values[5][3], values[5][4], values[5][5]]
]

const row2Sec3 = [
    [values[3][6], values[3][7], values[3][8]], 
    [values[4][6], values[4][7], values[4][8]], 
    [values[5][6], values[5][7], values[5][8]]
]

const row1Sec1 = [
    [values[0][0], values[0][1], values[0][2]], 
    [values[1][0], values[1][1], values[1][2]], 
    [values[2][0], values[2][1], values[2][2]]
]

const row1Sec2 = [
    [values[0][3], values[0][4], values[0][5]], 
    [values[1][3], values[1][4], values[1][5]], 
    [values[2][3], values[2][4], values[2][5]]
]

const row1Sec3 = [
    [values[0][6], values[0][7], values[0][8]], 
    [values[1][6], values[1][7], values[1][8]], 
    [values[2][6], values[2][7], values[2][8]]
] */