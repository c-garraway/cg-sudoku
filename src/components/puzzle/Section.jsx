import React from "react";
import Cell from "./Cell";
import { Box } from "@mui/material";
import PropTypes from 'prop-types'

function Section({values, section}) {

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', border: '2px solid black'}}>
            <Box sx={{display: 'flex'}}>
                <Cell
                    value = {values[0][0]}
                    sectionValues = {values}
                    section = {section}
                    row = {0}
                    column = {0} 
                />
                <Cell
                    value = {values[0][1]}
                    sectionValues = {values}
                    section = {section}
                    row = {0}
                    column = {1}  
                />
                <Cell
                    value = {values[0][2]}
                    sectionValues = {values}
                    section = {section}
                    row = {0}
                    column = {2}  
                />
            </Box>
            <Box sx={{display: 'flex'}}>
                <Cell 
                    value = {values[1][0]}
                    sectionValues = {values}
                    section = {section}
                    row = {1}
                    column = {0} 
                />
                <Cell 
                    value = {values[1][1]}
                    sectionValues = {values}
                    section = {section}
                    row = {1}
                    column = {1}  
                />
                <Cell 
                    value = {values[1][2]}
                    sectionValues = {values}
                    section = {section}
                    row = {1}
                    column = {2} 
                />
            </Box>
            <Box sx={{display: 'flex'}}>
                <Cell 
                    value = {values[2][0]}
                    sectionValues = {values}
                    section = {section}
                    row = {2}
                    column = {0} 
                />
                <Cell 
                    value = {values[2][1]}
                    sectionValues = {values}
                    section = {section}
                    row = {2}
                    column = {1} 
                />
                <Cell 
                    value = {values[2][2]}
                    sectionValues = {values}
                    section = {section}
                    row = {2}
                    column = {2} 
                />
            </Box>
        </Box>
    );
}

Section.propTypes = {
    values: PropTypes.array,
    section: PropTypes.number,
}

Section.defaultProps = {
    values: [],
    section: '',
}

export default Section;
