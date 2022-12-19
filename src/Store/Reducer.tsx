import { Movie } from "../Shared/Models/Movie.model";
import * as types from "./Constants";

const initialState = {
  movies: []
};

const Reducer = (state = initialState, action: any) => {
  switch(action.type) {
    case types.ADD_MOVIE:
      return {
        ...state,
        movies: action.payload
      };
    case types.DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter((movie: Movie) => movie.id !== action.payload)
      };
    default:
      return state;
  }
}

export default Reducer;