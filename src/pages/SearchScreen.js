import { View, Text, Pressable, ScrollView } from 'react-native';
import DropdownComponent from '../components/DropDown';
import SearchBox from '../components/SearchBox';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';

// import search icon

export default function Search() {
  const data = [
    { label: 'Multi', value: '1' },
    { label: 'Movie', value: 'movie' },
    { label: 'TV Show', value: 'tv' },
  ];

  return (
    <View className='flex flex-1 space-y-6 bg-white'>
      <View className='flex flex-column justify-between w-10/12 space-y-2 self-center mt-4'>
        <Text className='text-sm h-4 font-normal text-black'>
          Search Movie/TV Show Name <Text className='text-red-500'>*</Text>
        </Text>
        <SearchBox />
      </View>
      <View className=' flex flex-column justify-between w-10/12 space-y-2 self-center'>
        <Text className='text-sm h-4 font-normal text-left text-black'>
          Search Movie/TV Show Name <Text className='text-red-500'>*</Text>
        </Text>
        <View className='flex flex-row w-full justify-between  items-center'>
          <View className='w-[70%]'>
            <DropdownComponent data={data} />
          </View>
          <Pressable className='px-2 h-full flex flex-row justify-center rounded-md items-center bg-[#18accc]'>
            <MagnifyingGlassIcon color='white' size={18} />
            <Text className='p-2 text-center text-white'>Search</Text>
          </Pressable>
        </View>
        <Text className='text-xs font-normal text-left text-black'>
          Please select search type
        </Text>
      </View>
      <ScrollView className='flex flex-1 w-full'>
        <View className='flex flex-col justify-center items-center w-10/12 self-center mt-4'>
          <Text className='flex-1 text-xl font-bold text-black'>
            Please initiate a search
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
