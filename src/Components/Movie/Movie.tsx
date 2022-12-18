import React, { useState } from 'react';
import { Movie } from '../../Shared/Models/Movie.model';
import './Movie.scss';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Movie(props: {movie: Movie}) {
const [id, setId] = useState(props.movie.id);
const [title, setTitle] = useState(props.movie.title);
const [category, setCategory] = useState(props.movie.category);
const [bio, setBio] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et porta diam. Aenean euismod lorem ut placerat tempor. Phasellus hendrerit consectetur fringilla.");
const [likes, setLikes] = useState(props.movie.likes);
const [dislikes, setDislikes] = useState(props.movie.dislikes);

  return (
    <div className="movie-card-container">
      <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
      <div className="movie-image"></div>
      <div className="movie-header">
        <div className="movie-title"></div>
        <div className="movie-category"></div>
      </div>
      <div className="movie-body">
        <div className="movie-bio">{bio}</div>
      </div>
      <div className="movie-actions">
        <div className="movie-preference"></div>
      </div>
    </div>
  )
}

export default Movie;