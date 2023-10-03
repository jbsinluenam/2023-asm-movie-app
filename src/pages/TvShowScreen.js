import { View, Text, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import DropdownComponent from '../components/DropDown';
import { fetchTvShows } from '../api/movieDb';
import debounce from 'lodash.debounce';
import ShowDetail from '../components/ShowDetail';
import { useNavigation } from '@react-navigation/native';

export default function TvShow() {
  const [tvShows, setTvShows] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState('popular');
  const navigation = useNavigation(); // Initialize useNavigation

  const data = [
    { label: 'Airing Today', value: 'airing_today' },
    { label: 'On The Air', value: 'on_the_air' },
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
  ];

  const getTvShowsByCategory = async (category) => {
    // console.log('category: ', category);

    const data = await fetchTvShows(category);
    // console.log('API Response:', data);
    // console.log(data.results[0].poster_path);
    if (data && data.results) {
      setTvShows(data.results);
    }
  };

  // Debounce the API call with a delay of 300 milliseconds
  const debouncedGetTvShows = debounce(getTvShowsByCategory, 300);

  useEffect(() => {
    // Use the debounced function when selectedCategory changes
    debouncedGetTvShows(selectedCategory);
  }, [selectedCategory]);

  // Define a function to handle navigation to movie detail screen
  const navigateToMovieDetail = (tvShowId) => {
    // Navigate to the 'Detail' screen and pass the movie ID
    navigation.navigate('Detail', {
      tvShowId: tvShowId,
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
        {tvShows.map((tvShow, index) => (
          <ShowDetail
            key={index}
            posterPath={tvShow.poster_path}
            movieName={tvShow.name}
            popularity={tvShow.popularity}
            releaseDate={tvShow.first_air_date}
            onPress={() => navigateToMovieDetail(tvShow.id)} // Pass the onPress function
          />
        ))}
      </ScrollView>
    </View>
  );
}
