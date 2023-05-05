/* import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux';

export default function LevelSelect() {
    const dispatch = useDispatch()
    const [level, setLevel] = React.useState('');

    const handleChange = (event) => {
    dispatch(updateSelectedLevel(event.target.value));
    setLevel(event.target.value)
    };

    return (
        <Box sx={{ width: 'fit-content' }}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label"></InputLabel>
            <Select
            variant='standard'
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={level}
            defaultValue={0}
            label="Level"
            size='small'
            onChange={handleChange}
            >
            <MenuItem value={0}>Easy</MenuItem>
            <MenuItem value={1}>Medium</MenuItem>
            <MenuItem value={2}>Hard</MenuItem>
            </Select>
        </FormControl>
        </Box>
    );
}
 */
import { MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { updateSelectedLevel } from '../../features/gameData/gameDataSlice';


function LevelSelect() {
    const dispatch = useDispatch();
    const difficulties = ['easy', 'medium', 'hard']

    return (
        <Box>
            <TextField
                select
                variant="filled"
                label="Difficulty"
                size="small"
                defaultValue=''
                sx={{width: '120px', margin: 1}}
                onChange={(e) => {dispatch(updateSelectedLevel(e.target.value))}}
                >
                {difficulties.map((option, index) => (
                    <MenuItem key={index} value={index}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    );
}

export default LevelSelect;