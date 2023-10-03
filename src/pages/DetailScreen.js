import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchMovieDetails, fetchTvShowDetails } from '../api/movieDb';
import { image342, fallbackMoviePoster } from '../api/movieDb';
import { CurrencyBangladeshiIcon } from 'react-native-heroicons/outline';

const { width, height } = Dimensions.get('window');

export default function DetailScreen(props) {
  const { params: item } = useRoute();

  const [details, setDetails] = useState({});

  useEffect(() => {
    // console.log('Received showId:', item.showId);
    if (item.movieId) getMovieDetails(item.movieId);
    if (item.tvShowId) getTvShowDetails(item.tvShowId);

    getMovieDetails(item.showId) || getTvShowDetails(item.showId);
  }, []);

  useEffect(() => {
    props.navigation.setOptions({
      /// Set the header title to the movie title
      title:
        details.title?.length > 18
          ? `${details.title.substring(0, 18)}...`
          : details.name?.length > 18
          ? `${details.name.substring(0, 18)}...`
          : details.title || details.name,
    });
  }, [details]);

  const getMovieDetails = async (movieId) => {
    const data = await fetchMovieDetails(movieId);
    // console.log('Movie Title:' + data.title);

    if (data) {
      setDetails(data);
    }
  };

  const getTvShowDetails = async (tvShowId) => {
    const data = await fetchTvShowDetails(tvShowId);
    // console.log('TV Show Title:' + data.name);

    if (data) {
      setDetails(data);
    }
  };

  return (
    <SafeAreaView className='flex flex-1 items-center space-y-4 px-8 text-neutral-800'>
      <Text className='text-2xl font-bold'>
        {details.title?.length > 25
          ? `${details.title.substring(0, 25)}...`
          : details.name?.length > 25
          ? `${details.name.substring(0, 25)}...`
          : details.title || details.name}
      </Text>
      <Image
        source={{
          uri: image342(details.poster_path) || fallbackMoviePoster,
        }}
        style={{ width: width / 1.6, height: height / 2.5 }}
      />

      <View className='flex justify-between w-full space-y-3'>
        <Text className='text-sm text-neutral-800'>{details.overview}</Text>

        <View className='flex flex-row  w-full'>
          <Text className='text-sm font-bold text-neutral-800'>
            Popularity: {details.popularity}
          </Text>
          <Text className='text-sm font-bold text-neutral-800'> | </Text>
          <Text className='text-sm font-bold text-neutral-800'>
            Release Date: {details.releaseDate}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
