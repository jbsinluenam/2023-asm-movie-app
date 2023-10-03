import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import { image185, fallbackMoviePoster } from '../api/movieDb';

export default function ShowDetail({
  movieName,
  popularity,
  releaseDate,
  posterPath,
  movie,
  onPress,
  title,
}) {
  return (
    <View className='mb-2 pb-2 border-b border-b-neutral-200'>
      <ScrollView
        //vertical scroll

        showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback>
          <View className='flex-1 flex-row '>
            <Image
              source={{
                uri: image185(posterPath) || fallbackMoviePoster,
              }}
              className='w-24 h-24 mr-2'
            />
            <View className='text-neutral-700 text-base justify-between flex-1'>
              <Text className=' font-bold ml-1'>
                {movieName.length > 25
                  ? `${movieName.substring(0, 25)}...`
                  : movieName}
              </Text>
              <Text className='text-xs ml-1'>Popularity: {popularity}</Text>
              <Text className='text-xs ml-1'>Release Date: {releaseDate}</Text>
              <Pressable
                onPress={onPress} // Use the onPress prop
                className='px-2 flex justify-center rounded-md items-center bg-[#18accc]'>
                <Text className='p-2 text-center text-white'>More Details</Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
}
