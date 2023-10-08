import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { selectShareModalMessage, selectShareModalOpen, updateShareModalOpen } from '../../features/gameData/shareDataSlice';
import { theme } from '../../theme/theme'

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

function ShareModal() {
    const dispatch = useDispatch()
    const headingFontColor = theme.palette.highlightFont.main

    const openModal = useSelector(selectShareModalOpen)
    const modalMessage = useSelector(selectShareModalMessage)

    const handleClose = () => {
        dispatch(updateShareModalOpen(false))
    }

    async function handleShare() {
        if ( navigator.canShare ) {
            try {
                await navigator.share({
                url: window.location.protocol + '//' + window.location.hostname,
                text: `My New Best Time in CG SUDOKU: ${modalMessage}`,
                });
            } catch (error) {
                console.error('There was an error sharing score:', error);
            }
        } else {
            alert('Your system does not support sharing.');
        }
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
                    <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'/* , border: '1px solid black' */}}>
                        <Box sx={{textAlign: 'center'}}>
                            <Typography id="transition-modal-title" variant="h6" component="h2" sx={{color: headingFontColor}}>
                                CONGRATULATIONS!
                            </Typography>
                            <Typography>
                                You set a new best time!
                            </Typography>
                            <Typography sx={{mb: 2, fontWeight: 'bold'}}>
                                {modalMessage}
                            </Typography>
                        </Box>
                        <Box paddingBottom={1}>
                            <Button variant="contained" onClick={handleShare} >SHARE</Button>
                            <Button variant="contained" onClick={handleClose} sx={{ml: 3}}>CLOSE</Button>
                        </Box>
                        
                    </Box>
                </Box>
            </Fade>
        </Modal>

    );
}

export default ShareModal;
