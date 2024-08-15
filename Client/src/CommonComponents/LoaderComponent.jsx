import { CircularProgress } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';

const LoaderComponent = () => {
    return (
        <Backdrop
            sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.modal + 1, // Ensure it is above other components
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            open={true} // Ensure the backdrop is open
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default LoaderComponent;
