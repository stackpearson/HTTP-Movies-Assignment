import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import MovieList from './MovieList';
// import {setMovieList} from '../App';


const Movie = (props) => {
  console.log()
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const {goBack} = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

const handleDelete = (e) => {
  axios
    .delete(`http://localhost:5000/api/movies/${movie.id}`)
    .then((res) => {
      console.log('delete res from Movie', res)
      axios
        .get('http://localhost:5000/api/movies')
        .then((res) => {
          console.log('get request within delete function', res)
          props.setMovieList(res.data)
        })
      goBack('/')
    })
    .catch((err) => {
      console.error('failed delete from Movie', err.message)
    })
}

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <Link className='edit-button' to={`/update-movie/${movie.id}`}>
        Edit
      </Link>
      <div onClick={handleDelete} className="delete-button" >
        Delete
      </div>
    </div>
  );
}

export default Movie;
