import { View, Text, Pressable, ScrollView } from 'react-native';
import DropdownComponent from '../components/DropDown';
import SearchBox from '../components/SearchBox';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { useState, useEffect } from 'react';
import { searchMovies, searchMulti, searchTvShows } from '../api/movieDb';
import ShowDetail from '../components/ShowDetail';
import { useNavigation } from '@react-navigation/native';

export default function Search() {
  const data = [
    { label: 'Multi', value: 'multi' },
    { label: 'Movie', value: 'movie' },
    { label: 'TV Show', value: 'tv' },
  ];

  const [selectedCategory, setSelectedCategory] = useState('multi'); // Set an initial category
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchText, setSearchText] = useState('');
  const [isTextEmpty, setIsTextEmpty] = useState(false);
  // State to store the search query

  const navigation = useNavigation(); // Initialize useNavigation

  const handleSearch = async (text) => {
    try {
      if (text.length > 0 && text !== '') {
        setIsTextEmpty(false);
        setSearchQuery(text);
        let data = [];

        if (selectedCategory === 'multi') {
          data = await searchMulti({ query: text });
        } else if (selectedCategory === 'movie') {
          data = await searchMovies({ query: text });
        } else if (selectedCategory === 'tv') {
          data = await searchTvShows({ query: text });
        }

        if (data && data.results) {
          setSearchResults(data.results);
        }
      } else if (text.length === 0) {
        setIsTextEmpty(true);
        console.log('text is empty');
      } else {
        // Clear search results when the query is empty
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error performing search:', error);
      // Handle the error (e.g., show an error message)
    }
  };

  const handleSearchButtonPress = () => {
    setSearchText(searchQuery); // Set searchText to the current search query
    handleSearch(searchQuery); // Call handleSearch with the search query
  };

  // Define a function to handle navigation to movie detail screen
  const navigateToMovieDetail = (showId, type) => {
    console.log('ShowId before navigation:', showId);
    console.log('Type before navigation:', type);
    {
    }

    // Navigate to the 'Detail' screen and pass the show ID
    navigation.navigate('Detail', {
      showId: showId,
      type: type,
    });
  };

  return (
    <View className='flex flex-1 space-y-6 bg-white'>
      <View className='flex flex-column justify-between w-10/12 space-y-2 self-center mt-4'>
        <Text className='text-sm h-4 font-normal text-black'>
          Search Movie/TV Show Name <Text className='text-red-500'>*</Text>
        </Text>
        <SearchBox
          value={searchText}
          onChangeText={(text) => setSearchQuery(text)}
          placeholder='i.e. James Bond, the Matrix'
          style={{
            borderWidth: 1,
            borderColor: isTextEmpty ? '#de2626' : '#e5e7eb',
          }}
        />
      </View>
      <View className=' flex flex-column justify-between w-10/12 space-y-2 self-center'>
        <Text className='text-sm h-4 font-normal text-left text-black'>
          Search Movie/TV Show Name <Text className='text-red-500'>*</Text>
        </Text>
        <View className='flex flex-row w-full justify-between  items-center'>
          <View className='w-[70%]'>
            <DropdownComponent
              data={data}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              style={{
                borderWidth: 1,
                borderColor: isTextEmpty ? '#de2626' : '#e5e7eb',
              }}
            />
          </View>
          <Pressable
            onPress={handleSearchButtonPress} // Call handleSearchButtonPress when the button is pressed
            className='px-2 h-full flex flex-row justify-center rounded-md items-center bg-[#18accc]'>
            <MagnifyingGlassIcon color='white' size={18} />
            <Text className='p-2 text-center text-white'>Search</Text>
          </Pressable>
        </View>
        {isTextEmpty ? (
          <Text className='text-xs font-normal text-left text-red-500'>
            Movie/TV Show Name is required
          </Text>
        ) : (
          <Text className='text-xs font-normal text-left text-black'>
            Please select search type
          </Text>
        )}
      </View>
      <ScrollView
        className='flex flex-1 w-10/12 self-center'
        showsVerticalScrollIndicator={false}>
        {searchResults.length > 0 ? (
          searchResults.map((result, index) => (
            <ShowDetail
              key={index}
              id={result.id}
              movieName={result.title || result.name}
              posterPath={result.poster_path}
              popularity={result.popularity}
              releaseDate={result.release_date || result.first_air_date}
              overview={result.overview}
              onPress={() =>
                navigateToMovieDetail(result.id, result.media_type)
              } // Pass the onPress function
              title={result.title || result.name}
              type={result.media_type}
            />
          ))
        ) : (
          <View className='flex flex-1 justify-center text-neutral-800 items-center'>
            <Text className='flex-1 text-xl pt-8 font-bold'>
              Please initiate a search
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
