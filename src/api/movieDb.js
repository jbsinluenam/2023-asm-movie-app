import axios from 'axios';
import { api_key } from '../constants';

//endpoints
const apiBaseUrl = 'https://api.themoviedb.org/3';
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${api_key}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${api_key}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${api_key}`;
//search endpoint
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${api_key}`;

//dynamic movie endpoints

const movieDetailsEndpoint = (movieId) =>
  `${apiBaseUrl}/movie/${movieId}?api_key=${api_key}`;
const movieCreditsEndpoint = (movieId) =>
  `${apiBaseUrl}/movie/${movieId}/credits?api_key=${api_key}`;
const similarMoviesEndpoint = (movieId) =>
  `${apiBaseUrl}/movie/${movieId}/similar?api_key=${api_key}`;

//person details endpoint

const personDetailsEndpoint = (personId) =>
  `${apiBaseUrl}/person/${personId}?api_key=${api_key}`;
const personMoviesEndpoint = (personId) =>
  `${apiBaseUrl}/person/${personId}/movie_credits?api_key=${api_key}`;

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

// fallback images
export const fallbackMoviePoster =
  'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';

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

export const fetchTrendingMovies = async () => {
  return await apiCall(trendingMoviesEndpoint);
};

export const fetchUpcomingMovies = async () => {
  return await apiCall(upcomingMoviesEndpoint);
};

export const fetchTopRatedMovies = async () => {
  return await apiCall(topRatedMoviesEndpoint);
};

export const fetchMovieDetails = async (movieId) => {
  return await apiCall(movieDetailsEndpoint(movieId));
};

export const fetchMovieCredits = async (movieId) => {
  return await apiCall(movieCreditsEndpoint(movieId));
};

export const fetchSimilarMovies = async (movieId) => {
  return await apiCall(similarMoviesEndpoint(movieId));
};

export const fetchPersonDetails = async (personId) => {
  return await apiCall(personDetailsEndpoint(personId));
};

export const fetchPersonMovies = async (personId) => {
  return await apiCall(personMoviesEndpoint(personId));
};

export const searchMovies = (params) => {
  return apiCall(searchMoviesEndpoint, params);
};
