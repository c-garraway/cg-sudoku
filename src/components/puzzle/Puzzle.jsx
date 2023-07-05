import React, { useEffect } from "react";
import Section from "./Section";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectPuzzleErrors, selectPuzzleFilled, selectPuzzleStatus, selectSection1, selectSection2, selectSection3, selectSection4, selectSection5, selectSection6, selectSection7, selectSection8, selectSection9, updatePuzzleComplete, updatePuzzleFilled } from "../../features/gameData/gameDataSlice";
import { checkPuzzleFilled } from "../../helpers/checkPuzzleStatus";

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

    const dispatch = useDispatch()
    const puzzleStatus = useSelector(selectPuzzleStatus)
    const puzzleErrors = useSelector(selectPuzzleErrors)
    const puzzleFilled = useSelector(selectPuzzleFilled)

    useEffect(()=> {
        dispatch(updatePuzzleFilled(checkPuzzleFilled(puzzleStatus)))

            if(puzzleErrors.count === 0 && puzzleFilled) {
                dispatch(updatePuzzleComplete(true))
            }

    }, [dispatch, puzzleErrors, puzzleFilled, puzzleStatus ])

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', border: '2px solid black', width: 'fit-content', mt: {xs: 0, sm: 1}}}>
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