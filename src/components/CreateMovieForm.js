import React, {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { getPlanets } from '../services';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import LoadingForm from './LoadingPlanets';
import Button from '@mui/material/Button';


export default function CreateMovieForm({onAddMovie}){
    //episode
    const [episodeValue, setEpisode] = useState();
    //title
    const [titleValue, setTitle] = useState();
    //Producer
    const [producerValue, setProducer] = useState();
    //Date-Picker
    const [dateValue, setDate] = React.useState(null);
    //Director
    const [directorValue, setDirector] = useState();
    //Select planet
    const [planetValue, setPlanet] = React.useState('');
    const handleChange = (event) => {
    setPlanet(event.target.value);
    }
    //planets
    const [planets, setPlanets] = useState([]);
    const [isLoadingForm, setIsLoadingForm] = useState(true);

    const Input = styled('input')({
        display:'none',
    });
    async function loadPlanets(){
        const response = await getPlanets();
        if(response.status ===200){
            setPlanets(response.data.results)
        }
        //console.log(planets)
        setIsLoadingForm(false);
    }

    useEffect(() => {
        loadPlanets();
    }, []);

    //Form
    const handleOnSubmit = (e) =>{
        e.preventDefault();
        onAddMovie({
          title: titleValue,
          director: directorValue, 
          release_date: dateValue, 
          photo:'https://img.ecartelera.com/noticias/27700/27733-m.jpg',
          opening_crawl:`title: ${titleValue} producer: ${producerValue}  planet:${planetValue}`
        });
        
        setEpisode('');
        setTitle('');
        setEpisode('');
        setProducer('');
        setDirector('');
        setDate('');
      };
    return(
        <form onSubmit={handleOnSubmit}>
            <Box component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' }
            }}
            >
                {
                    isLoadingForm && <LoadingForm/>
                }
                {
                    !isLoadingForm&&!planets.length && <h2>There aren't planets to show</h2>
                }
                {
                    !isLoadingForm&&planets.length&&
                <div>
                     <div align='center'>   
                        <TextField
                            onChange={(e)=>setEpisode(e.target.value)}
                            value={episodeValue}
                            id="episode"
                            label="Episode"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            onChange={(e)=>setTitle(e.target.value)}
                            value={titleValue}
                            required
                            id="title"
                            label="Title"
                            placeholder="Title"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div align='center'>
                        <TextField
                        onChange={(e)=>setProducer(e.target.value)}
                        value={producerValue}
                        required
                        id="producer"
                        label="Producer"
                        placeholder="Producer"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                        <TextField
                            onChange={(e)=>setDate(e.target.value)}
                            value={dateValue}
                            id="release_date"
                            label="release_date"
                            type="date"
                            defaultValue="2021-11-16"
                            sx={{ width: 220 }}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </div>
                    <div align='center' >
                        <TextField
                            onChange={(e)=>setDirector(e.target.value)}
                            value={directorValue}
                            required
                            id="director"
                            label="Director"
                            placeholder="director"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                        <InputLabel id="demo-simple-select-label">Planet</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="planet"
                            value={planetValue}
                            label="Planet"
                            placeholder='Planet'
                            onChange={handleChange}
                            >
                                {
                                    planets.map((planet)=>(
                                        <MenuItem key={planet.name} value={planet.name}>{planet.name}</MenuItem>
                                    )
                                    )
                                }
                        </Select>
                    </div>
                    <p align='center'>
                        <label>Image</label>
                        <br/>
                        <input type='file'/>                
                    </p>
                        <Button variant="contained" onClick={handleOnSubmit} >Add Movie</Button>
    
            </div>
                }
            </Box>
            </form>
        );

}