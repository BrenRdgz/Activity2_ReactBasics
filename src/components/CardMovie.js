import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActions } from '@mui/material';
import { images } from '../utils/images'
import ModalOpening from './ModalOpening';
import PropTypes from 'prop-types';

export default function CardMovie({ title, episode_id, opening_crawl, director, release_date }) {
    return (
        <Card sx={{ maxWidth: 445 }}>

            <CardMedia
                component="img"
                height="500"
                image={
                    episode_id < 7 ?
                    images.find((x) => x.id === episode_id).img
                    :
                    'https://images.everyeye.it/img-notizie/star-wars-arrivo-cofanetto-saga-skywalker-4k-v3-417969.jpg'
                }
                alt={title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {director}
                </Typography>
                <Typography variant="body3" color="text.secondary">
                    {release_date}
                </Typography>
            </CardContent>
            <CardActions>
                <ModalOpening title={title} opening_crawl={opening_crawl} />
            </CardActions>
        </Card>
    );
}

CardMovie.propTypes = {
    title: PropTypes.string.isRequired,
    episode_id:PropTypes.number.isRequired,
    opening_crawl:PropTypes.string.isRequired, 
    director:PropTypes.string.isRequired,
    release_date:PropTypes.string.isRequired
}
