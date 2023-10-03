import { View, Text, TextInput } from 'react-native';
import React from 'react';

export default function SearchBox({ onChangeText, placeholder, style }) {
  return (
    <View>
      <View className='flex-column w-full max-h-min self-center rounded-md'>
        <TextInput
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={style}
          placeholderTextColor='#9CA3AF'
          className='pb-1 pl-2 h-9 text-sm mt-2 font-normal rounded-md text-neutral-800  bg-neutral-200'
        />
        <Text className='text-xs font-normal text-left text-black'>
          Choose Search Type
          <Text className='text-red-500'>*</Text>
        </Text>
      </View>
    </View>
  );
}
