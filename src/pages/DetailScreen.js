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
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchMovieDetails } from '../api/movieDb';
import { image185, fallbackMoviePoster } from '../api/movieDb';

const { width, height } = Dimensions.get('window');

export default function DetailScreen() {
  const { params: movie } = useRoute();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    console.log('movie.id: ', movie.id);
    const fetchDetails = async () => {
      try {
        const response = await fetchMovieDetails(movie.id);
        setMovieDetails(response);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        // Handle the error here, e.g., display an error message to the user
      }
    };

    fetchDetails();
  }, [movie]);

  return (
    <SafeAreaView className='flex flex-1 items-center space-y-3 px-8 text-neutral-800'>
      <Text className='text-2xl font-bold'>title</Text>
      {/* <Text className='text-2xl font-bold'>{movieDetails.title}</Text>
      <Image
        // source={require('../assets/adaptive-icon.png')}
        source={{
          uri: image185(movieDetails.poster_path) || fallbackMoviePoster,
        }}
        // style={{ width: width * 0.6, height: height * 0.3 }}
        className='my-4'
      />

      <View className='flex justify-between w-full space-y-3'>
        <Text className='text-sm text-neutral-800'>
          {movieDetails.overview}
        </Text>

        <View className='flex flex-row  w-full'>
          <Text className='text-sm  text-neutral-800'>
            Popularity: {movieDetails.popularity}
          </Text>
          <Text className='text-sm  text-neutral-800'> | </Text>
          <Text className='text-sm  text-neutral-800'>
            Release Date: {movieDetails.releaseDate}
          </Text>
        </View>
      </View> */}
    </SafeAreaView>
  );
}
