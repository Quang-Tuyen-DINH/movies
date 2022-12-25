import React, { useEffect, useState } from 'react';
import { Movie } from '../../Shared/Models/Movie.model';
import MoviePhoto from '../../Assets/MovieImage.jpg';
import './MovieCard.scss';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ThumbUp from '@mui/icons-material/ThumbUp';
import ThumbDown from '@mui/icons-material/ThumbDown';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';

const MovieCard = (props: {movie: Movie, handleRemove: any, handleFavorite: any}) => {
  const [id, setId] = useState<string>(props.movie.id);
  const [image, setImage] = useState(MoviePhoto);
  const [title, setTitle] = useState<string>(props.movie.title);
  const [category, setCategory] = useState<string>(props.movie.category);
  const [bio, setBio] = useState<string>("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et porta diam.");
  const [liked, setLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(props.movie.likes);
  const [bar, setBar] = useState<number>(0);
  const [disliked, setDisliked] = useState<boolean>(false);
  const [dislikes, setDislikes] = useState<number>(props.movie.dislikes);

  useEffect(() => {
    calculateBar();
  }, [likes, dislikes])

  const handleLike = () => {
    setLiked(true);
    setLikes(likes + 1);
    if(disliked) {
      setDisliked(false);
      setDislikes(dislikes - 1);
      if(dislikes === 0) {
        setDislikes(0);
      }
    }
    calculateBar();
  }

  const handleDislike = () => {
    setDisliked(true);
    setDislikes(dislikes + 1);
    if(liked) {
      setLiked(false);
      setLikes(likes - 1);
      if(likes === 0) {
        setLikes(0);
      }
    }
    calculateBar();
  }

  const calculateBar = () => {
    setBar((likes/(likes + dislikes)) * 100);
  }

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
  }));

  return (
    <div className="movie-card-container">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="180"
          image={image}
          alt="green iguana"
        />
        <CardContent className="card-content">
          <div className="content-header">
            <IconButton aria-label="favorite" size="large" onClick={event => props.handleFavorite(category)}>
              <FavoriteIcon />
            </IconButton>
            <Typography className="title" variant="h5" component="div">
              {title}
            </Typography>
            <IconButton aria-label="delete" size="large" onClick={event => props.handleRemove(id)}>
              <DeleteIcon />
            </IconButton>
          </div>
          <Typography sx={{ mb: 1.5, fontStyle: "italic" }} color="text.secondary">
            {category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {bio}
          </Typography>
        </CardContent>
        <BorderLinearProgress className="likesBar" variant="determinate" value={bar} />
        <CardActions className="card-actions">
          {
            !liked ? 
            <Button variant="outlined" onClick={handleLike} startIcon={<ThumbUp />}>
              {likes}
            </Button>
            :
            <Button variant="contained" startIcon={<ThumbUp />}>
              {likes}
            </Button>
            }
          {
            !disliked ?
            <Button variant="outlined" onClick={handleDislike} endIcon={<ThumbDown />}>
              {dislikes}
            </Button>
            :
            <Button variant="contained" endIcon={<ThumbDown />}>
            {dislikes}
            </Button>
          }
        </CardActions>
      </Card>
    </div>
  )
}

export default MovieCard;