import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import DropdownComponent from '../components/DropDown';
import ShowDetail from '../components/ShowDetail';
import { fetchMovies } from '../api/movieDb';
import debounce from 'lodash.debounce';
import { useNavigation } from '@react-navigation/native';

export default function Movie() {
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const navigation = useNavigation(); // Initialize useNavigation

  const data = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Now Playing', value: 'now_playing' },
    { label: 'Upcoming', value: 'upcoming' },
  ];

  const getMoviesByCategory = async (category) => {
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

  // Define a function to handle navigation to movie detail screen
  const navigateToMovieDetail = (movieId) => {
    // Navigate to the 'Detail' screen and pass the movie ID
    navigation.navigate('Detail', {
      movieId: movieId,
    });
  };

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
            key={index}
            posterPath={movie.poster_path}
            movieName={movie.title}
            popularity={movie.popularity}
            releaseDate={movie.release_date}
            onPress={() => navigateToMovieDetail(movie.id)} // Pass the onPress function
            title={movie.title}
          />
        ))}
      </ScrollView>
    </View>
  );
}
