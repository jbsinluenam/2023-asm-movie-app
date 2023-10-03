import { View, Text, TextInput } from 'react-native';
import React from 'react';

export default function SearchBox({ onChangeText, placeholder }) {
  return (
    <View>
      <View className='flex-column w-full max-h-min self-center rounded-md'>
        <TextInput
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor='#9CA3AF'
          className='pb-1 pl-2 h-9 text-sm mt-2 font-normal rounded-md text-neutral-800  bg-neutral-200'
        />
      </View>
    </View>
  );
}
