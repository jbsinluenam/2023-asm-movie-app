import axios from 'axios';
import { api_key } from '../constants';

//endpoints
const apiBaseUrl = 'https://api.themoviedb.org/3';

// movie endpoints
const movieEndpoint = (value) =>
  `${apiBaseUrl}/movie/${value}?api_key=${api_key}`;

export const fetchMovies = async (value) => {
  return await apiCall(movieEndpoint(value));
};

// tv show endpoints

const tvShowEndpoint = (value) =>
  `${apiBaseUrl}/tv/${value}?api_key=${api_key}`;

export const fetchTvShows = async (value) => {
  return await apiCall(tvShowEndpoint(value));
};

//search endpoint
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${api_key}`;
const searchMultiEndpoint = `${apiBaseUrl}/search/multi?api_key=${api_key}`;

//dynamic endpoints
const movieDetailsEndpoint = (movieId) =>
  `${apiBaseUrl}/movie/${movieId}?api_key=${api_key}`;

const tvShowDetailsEndpoint = (tvShowId) =>
  `${apiBaseUrl}/tv/${tvShowId}?api_key=${api_key}`;

const apiCall = async (endpoint, params) => {
  const options = {
    method: 'GET',
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log('error: ', error);
    return {};
  }
};

export const fetchMovieDetails = async (movieId) => {
  return await apiCall(movieDetailsEndpoint(movieId));
};

export const fetchTvShowDetails = async (tvShowId) => {
  return await apiCall(tvShowDetailsEndpoint(tvShowId));
};

export const searchMovies = (params) => {
  return apiCall(searchMoviesEndpoint, params);
};

export const searchMulti = (params) => {
  return apiCall(searchMultiEndpoint, params);
};

//image endpoints
export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

// fallback images
export const fallbackMoviePoster =
  'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
