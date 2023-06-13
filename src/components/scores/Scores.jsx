import React from "react";
import { useSelector } from "react-redux";
import { selectEasyScore, selectHardScore, selectMediumScore } from "../../features/gameData/gameScoresSlice";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


function Scores() {
    const hardScore = useSelector(selectHardScore)
    const mediumScore = useSelector(selectMediumScore)
    const easyScore = useSelector(selectEasyScore)

    console.log()
    return (
    <TableContainer /* component={Paper} sx={{backgroundColor: insetColor}} */>
        <Table size='small' aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center">LEVEL</TableCell>
                    <TableCell align="center">COMPLETED TIME</TableCell>
                    <TableCell align="center">DATE</TableCell>
                    <TableCell align="center">TIME</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="center" component="th" scope="row">Hard</TableCell>
                    <TableCell align="center">{hardScore.completionTime}</TableCell>
                    <TableCell align="center">{hardScore.date}</TableCell>
                    <TableCell align="center">{hardScore.time}</TableCell>
                </TableRow>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="center" component="th" scope="row">Medium</TableCell>
                    <TableCell align="center">{mediumScore.completionTime}</TableCell>
                    <TableCell align="center">{mediumScore.date}</TableCell>
                    <TableCell align="center">{mediumScore.time}</TableCell>
                </TableRow>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="center" component="th" scope="row">Easy</TableCell>
                    <TableCell align="center">{easyScore.completionTime}</TableCell>
                    <TableCell align="center">{easyScore.date}</TableCell>
                    <TableCell align="center">{easyScore.time}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
    );
}

export default Scores;
