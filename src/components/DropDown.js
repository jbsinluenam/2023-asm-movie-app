import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const DropdownComponent = ({
  data,
  selectedCategory,
  setSelectedCategory,
  style,
}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Dropdown
      className='border border-gray-300 rounded-md px-2 self-center w-full'
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      maxHeight={300}
      labelField='label'
      valueField='value'
      // set placeholder value to be the first item in the data array

      placeholder={data[0].label}
      value={selectedCategory} // Use selectedCategory as the value
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        setSelectedCategory(item.value); // Update selectedCategory in the parent component
        setIsFocus(false);
      }}
      style={[
        style, // Add the provided style
        isFocus && { borderColor: '#273646' }, //
      ]}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
