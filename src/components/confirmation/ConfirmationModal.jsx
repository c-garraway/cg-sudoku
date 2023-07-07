import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { selectModalForComponent, selectModelOpen, updateModalForComponent, updateModalOpen, updateModalResponse } from '../../features/confirmationData/confirmationDataSlice';
import { Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 250,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

function ConfirmationModal() {
    const dispatch = useDispatch()
    const openModal = useSelector(selectModelOpen)
    const forComponent = useSelector(selectModalForComponent)

    const handleClose = () => {
        dispatch(updateModalOpen(false))
        dispatch(updateModalResponse(false))
        dispatch(updateModalForComponent(['', 0]))
    }

    const handleConfirm = () => {
        dispatch(updateModalResponse(true))
        dispatch(updateModalOpen(false))
    }

    return (

        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openModal}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
            >
            <Fade in={openModal}>
                <Box sx={style}>
                    <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly'/* , border: '1px solid black' */}}>
                        <Typography id="transition-modal-title" variant="h6" component="h2" marginBottom={1}>
                        {forComponent[0]}?
                        </Typography>
                        <Box paddingBottom={1}>
                            <Button variant="contained" onClick={handleConfirm} >CONFIRM</Button>
                            <Button variant="contained" onClick={handleClose} sx={{ml: 2}}>CANCEL</Button>
                        </Box>
                        
                    </Box>
                </Box>
            </Fade>
        </Modal>

    );
}

export default ConfirmationModal;
