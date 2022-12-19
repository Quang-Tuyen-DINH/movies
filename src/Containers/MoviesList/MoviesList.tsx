import React, { useEffect, useState } from 'react';
import Store from '../../Store/Index';
import { useDispatch } from "react-redux";
import './MoviesList.scss';
import { movies$ } from "../../Shared/Services/Movies.service";
import { Movie } from '../../Shared/Models/Movie.model';
import MovieCard from '../../Components/Movie/MovieCard';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Theme, useTheme } from '@mui/material/styles';

const MoviesList = () => {
  const itemHeight = 48;
  const itemPaddingTop = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: itemHeight * 4.5 + itemPaddingTop,
        width: 250,
      },
    },
  };
  const theme = useTheme();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const dispatch = useDispatch();

  const fetchData = async() => {
    await movies$
      .then((res: any) => {
        dispatch({ type: "ADD_MOVIE", payload: res});
      })
      .catch((err) => {console.log(err)});
  }

  useEffect(() => {
    fetchData();
    Store.subscribe(() => {
      setMovies(Store.getState().movies);
      setCategories(Array.from(new Set(Store.getState().movies.map((movie: Movie) => movie.category))).sort());
    })
  }, []);

  const getStyles = (name: string, personName: string[], theme: Theme) => {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleSelect = (event: any) => {
    const {
      target: { value }
    } = event;
    setSelectedCategories(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleFavorite = (category: string) => {
    console.log(category)
  }

  const handleRemove = (id: string) => {
    dispatch({ type: "DELETE_MOVIE", payload: id});
    setCategories(Array.from(new Set(Store.getState().movies.map((movie: Movie) => movie.category))).sort());
  }

  return (
    <div className="movies-list-container">
      <div className="movies-filter">
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Categories</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={selectedCategories}
          onChange={handleSelect}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {categories.map((category, index) => (
            <MenuItem
              key={category}
              value={category}
              style={getStyles(category, selectedCategories, theme)}
            >
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>
      <div className="movies">
        {selectedCategories.length === 0 && movies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} handleRemove={handleRemove} handleFavorite={handleFavorite}/>
          })}
        {selectedCategories.length > 0 && movies.filter(movie => selectedCategories.includes(movie.category))
          .map((movie) => {
            return <MovieCard key={movie.id} movie={movie} handleRemove={handleRemove} handleFavorite={handleFavorite}/>
          })}
      </div>
    </div>
  )
}

export default MoviesList