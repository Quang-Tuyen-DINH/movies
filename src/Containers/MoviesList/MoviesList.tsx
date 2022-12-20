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
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Theme, useTheme } from '@mui/material/styles';
import  Pagination from "@mui/material/Pagination";
import UsePagination from "../../Components/Pagination/Pagination"
import Box from '@mui/material/Box';

const MoviesList = () => {
  const dispatch = useDispatch();
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
  //For pagination
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(4);
  const perPageoOptions: number[] = [2, 4, 8];
  const count = Math.ceil(movies.length / perPage);
  const displayedData = UsePagination(movies, perPage);

  const handlePaginationClick = (e: any, p: number) => {
    setPage(p);
    displayedData.jump(p);
  };

  const handleSelectPerPage = (event: any) => {
    setPerPage(event.target.value);
  }
  //End of pagination

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
          <InputLabel>Categories</InputLabel>
          <Select
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
        {selectedCategories.length === 0 && displayedData.currentData().map((movie: any) => {
          return <MovieCard key={movie.id} movie={movie} handleRemove={handleRemove} handleFavorite={handleFavorite}/>
        })}

        {selectedCategories.length > 0 && displayedData.currentData().filter((movie: Movie) => selectedCategories.includes(movie.category)).map((movie: any) => {
          return <MovieCard key={movie.id} movie={movie} handleRemove={handleRemove} handleFavorite={handleFavorite}/>
        })}
      </div>
      <div className="pagination">
        <Pagination
          className="pagination-pages"
          count={count}
          size="medium"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handlePaginationClick}
        />
        <Box className="pagination-options" sx={{ width: 60 }}>
          <FormControl fullWidth>
            <Select
              value={JSON.stringify(perPage)}
              label="Quantity"
              onChange={handleSelectPerPage}
            >
              {perPageoOptions.map((value: number, index) => {
                return<MenuItem key={index} value={value}>{value}</MenuItem>
              })}
            </Select>
          </FormControl>
        </Box>
      </div>
    </div>
  )
}

export default MoviesList