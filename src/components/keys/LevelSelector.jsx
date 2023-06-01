import { MenuItem, TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedLevel, updateSelectedLevel } from '../../features/gameData/gameDataSlice';

function LevelSelect() {
    const dispatch = useDispatch();
    const currentLevel = useSelector(selectSelectedLevel)
    const difficulties = ['EASY', 'MEDIUM', 'HARD']

    return (
        <TextField
            select
            variant="outlined"
            label="LEVEL"
            size="small"
            defaultValue={currentLevel}
            sx={{width: '49%', mt: 1, }}
            onChange={(e) => {dispatch(updateSelectedLevel(e.target.value))}}
            >
            {difficulties.map((option, index) => (
                <MenuItem key={index} value={index}>
                    {option}
                </MenuItem>
            ))}
        </TextField>
    );
}

export default LevelSelect;