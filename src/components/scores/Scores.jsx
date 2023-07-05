import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetGameScores, selectEasyScore, selectHardScore, selectLastCompletionTime, selectMediumScore, selectScoreUpdated, selectScoresExpanded, updateEasyScore, updateHardScore, updateMediumScore, updateScoresExpanded } from "../../features/gameData/gameScoresSlice";
import { Box, Button, Collapse, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { selectPuzzleComplete, selectSelectedLevel, selectSolveButtonSelected, updatePuzzlePause, updateStopwatchActive } from "../../features/gameData/gameDataSlice";
import { updateMessageBox } from "../../features/gameData/gameMessageSlice";

function Scores() {
    const dispatch = useDispatch()
    const hardScore = useSelector(selectHardScore)
    const mediumScore = useSelector(selectMediumScore)
    const easyScore = useSelector(selectEasyScore)

    const puzzleComplete = useSelector(selectPuzzleComplete)
    const solveButtonSelected = useSelector(selectSolveButtonSelected)
    const lastCompletionTime = useSelector(selectLastCompletionTime)
    const lastPuzzleLevel = useSelector(selectSelectedLevel)
    const scoreUpdated = useSelector(selectScoreUpdated)
    const scoresExpanded = useSelector(selectScoresExpanded)

    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric' };
    const localDateTime = new Date().toLocaleString('en-CA', options)

    //const [expanded, setExpanded] = React.useState(false);

    useEffect(()=> {
        setTimeout(() => {
            if(puzzleComplete && !solveButtonSelected && !scoreUpdated) {
                //easy level
                if(lastPuzzleLevel === 0) {
                    if(easyScore?.completionTime[0] === 0 || easyScore?.completionTime[0] > lastCompletionTime[0]) {
                        //console.log('easyScore')
                        dispatch(updateEasyScore({completionTime: lastCompletionTime, date: localDateTime}))
                    }
                    return
                }
                //medium level
                if(lastPuzzleLevel === 1) {
                    if(mediumScore?.completionTime[0] === 0 || mediumScore?.completionTime[0] > lastCompletionTime[0]) {
                        //console.log('mediumScore')
                        dispatch(updateMediumScore({completionTime: lastCompletionTime, date: localDateTime}))
                    }
                    return
                }
                //hard level
                if(lastPuzzleLevel === 2) {
                    if(hardScore?.completionTime[0] === 0 || hardScore?.completionTime[0] > lastCompletionTime[0]) {
                        //console.log('hardScore')
                        dispatch(updateHardScore({completionTime: lastCompletionTime, date: localDateTime}))
                    }
                    return
                }
            }
        }, 200);
        
        /* REFACTORING REQUIRED!
        if (puzzleComplete && !solveButtonSelected && !scoreUpdated) {
            const levelNames = ['easy', 'medium', 'hard'];
            const levelScore = [easyScore, mediumScore, hardScore];
            const updateScore = [updateEasyScore, updateMediumScore, updateHardScore];

            if (lastPuzzleLevel >= 0 && lastPuzzleLevel <= 2) {
                const currentLevel = levelNames[lastPuzzleLevel];
                const currentScore = levelScore[lastPuzzleLevel];
                const currentUpdateScore = updateScore[lastPuzzleLevel];

                if (currentScore?.completionTime[0] === 0 || currentScore?.completionTime[0] > lastCompletionTime[0]) {
                    dispatch(currentUpdateScore({ completionTime: lastCompletionTime, date: localDateTime }));
                }
            }
        }
        */
    })
    
    const handleExpandClick = () => {
        //setExpanded((prev) => !prev);
        dispatch(updateScoresExpanded(!scoresExpanded))
        if(!puzzleComplete) {
            dispatch(updatePuzzlePause(scoresExpanded ? false : true))
            dispatch(updateMessageBox(scoresExpanded ? 'Game resumed...' : 'Game paused, Best Times Opened'))
            dispatch(updateStopwatchActive(scoresExpanded ? true : false))
        }
    };

    const handleResetClick = () => {
        dispatch(resetGameScores())
    };

    return (
        <Box /* sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'space-between'}} */ >
            <Button onClick={handleExpandClick} sx={{width: '100%',margin: 'auto 0'}} endIcon={scoresExpanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>} size="small">BEST TIMES</Button>
            <Collapse in={scoresExpanded}>
                <TableContainer /* sx={{mb: 1, }} */>
                    <Table size='small' aria-label="simple table" sx={{border: '1px solid black'}}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">LEVEL</TableCell>
                                <TableCell align="left">TIME</TableCell>
                                <TableCell align="left">DATE</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="left" component="th" scope="row">Easy</TableCell>
                                <TableCell align="left">{easyScore?.completionTime[1]}</TableCell>
                                <TableCell align="left">{easyScore.date}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="left" component="th" scope="row">Medium</TableCell>
                                <TableCell align="left">{mediumScore?.completionTime[1]}</TableCell>
                                <TableCell align="left">{mediumScore.date}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="left" component="th" scope="row">Hard</TableCell>
                                <TableCell align="left">{hardScore?.completionTime[1]}</TableCell>
                                <TableCell align="left">{hardScore.date}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button onClick={handleResetClick} sx={{width: '100%',margin: 'auto 0'}} size="small">RESET BEST TIMES</Button>
            </Collapse>
        </Box>
    );
}

export default Scores;
