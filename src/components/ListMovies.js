import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CardMovie from './CardMovie';
import PropTypes from 'prop-types';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ListMovies = ({ movies }) => {
    return (
        <Grid container spacing={{ xs: 3, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {
                movies.map(({ title, episode_id, opening_crawl, director, release_date }) => (
                    <Grid item xs={4} sm={4} md={4} key={episode_id}>
                        <Item>
                            <CardMovie title={title} episode_id={episode_id} opening_crawl ={opening_crawl} director ={director} release_date ={release_date} />
                        </Item>
                    </Grid>
                ))
            }
        </Grid>
    )
}

ListMovies.propTypes = { 
    movies: PropTypes.array
}
export default ListMovies;