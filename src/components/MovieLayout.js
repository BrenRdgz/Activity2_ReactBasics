import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Header from './Header';
import Loading from './Loading';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {getMovies} from '../services/index';
import ListMovies  from './ListMovies';
import CreateMovieForm from './CreateMovieForm';
import IconButton from '@mui/material/IconButton';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const MovieLayout = ()=>{
    const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );
        /////
    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    async function loadMovies(){
        const response = await getMovies();
        if(response.status ===200){
            setMovies(response.data.results)
        }
        setIsLoading(false);
    }

    useEffect(() => {
        loadMovies();
    }, []);
    //Boton
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //////////
    useEffect(() => {
        console.log('now is', isLoading, movies);
      }, [isLoading, movies]);
      const onAddMovie = (movie) =>{
        setMovies([...movies, movie]);
      };

    return (
        <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>         
        <div className='background' >
            {theme.palette.mode} mode
            <Box
                sx={{
                    display: 'flex',
                    width: '5%',
                    alignItems: 'rigth',
                    justifyContent: 'rigth',
                    bgcolor: 'background.default',
                    color: 'text.primary',
                    borderRadius: 1,
                    p: 3,
                }}
                >
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                 {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            </Box>
        <Container >
            <Header title='Star Wars Movies'/>  
            {
                isLoading && <Loading/>
            }
            {
                !isLoading&&!movies.length && <h2>There isn't movies to show</h2>
            }
            {
                !isLoading&&movies.length&&<ListMovies movies={movies}/>
            }
            <div color='white'>
                <div>
                <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'background.default',
                    color: 'text.primary',
                    borderRadius: 1,
                    p: 3,
                }}
                >
                    <Button variant="contained" onClick={handleOpen}>Create new movie</Button>   
                    </Box>   
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                        Create your own movie
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <CreateMovieForm onAddMovie={onAddMovie} />
                        </Typography>
                        <Box > 
                            <Button variant="contained" onClick={handleClose} align="right">Close</Button>
                        </Box>
                        </Box>
                    </Modal>
    </div>
            </div>
        </Container>
        <br></br>
        </div>
        </ThemeProvider>
    </ColorModeContext.Provider>
    )
}

export default MovieLayout;
