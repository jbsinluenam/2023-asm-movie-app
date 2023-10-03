import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import DropdownComponent from '../components/DropDown';
import ShowDetail from '../components/ShowDetail';
import { fetchMovies } from '../api/movieDb';
import debounce from 'lodash.debounce';

export default function Movie() {
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('popular');

  const data = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Now Playing', value: 'now_playing' },
    { label: 'Upcoming', value: 'upcoming' },
  ];

  const getMoviesByCategory = async (category) => {
    // console.log('category: ', category);

    const data = await fetchMovies(category);
    // console.log('API Response:', data);
    // console.log(data.results[0].id);
    if (data && data.results) {
      setMovies(data.results);
    }
  };

  // Debounce the API call with a delay of 300 milliseconds
  const debouncedGetMovies = debounce(getMoviesByCategory, 300);

  useEffect(() => {
    // Use the debounced function when selectedCategory changes
    debouncedGetMovies(selectedCategory);
  }, [selectedCategory]);

  return (
    <View className='flex flex-1 space-y-6 justify-center items-center bg-white'>
      <View className='flex flex-row justify-between w-10/12 mt-4'>
        <DropdownComponent
          data={data}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </View>
      <ScrollView
        className='flex flex-1 w-10/12 '
        showsVerticalScrollIndicator={false}>
        {movies.map((movie, index) => (
          <ShowDetail
            data={data}
            key={index}
            posterPath={movie.poster_path}
            movieName={movie.title}
            popularity={movie.popularity}
            releaseDate={movie.release_date}
          />
        ))}
      </ScrollView>
    </View>
  );
}
