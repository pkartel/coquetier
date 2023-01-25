import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';

export type Props = {
  };

  const FONT_SIZE = 20;
  
  const SearchBar: React.FC<Props>  = () => {
    const [searchedIngredient, setSearchedIngredient] = useState('');
    return (
        <View style={styles.container}>
            <Feather
                name="search"
                size={FONT_SIZE}
                color="black"
                style={styles.searchIcon}
            />
            <TextInput
                style={styles.input}
                placeholder="Search for ingredients"
                value={searchedIngredient}
                onChangeText={setSearchedIngredient}>
            </TextInput>
        </View>
    );
  }

  const iconOffset = 6;
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: FONT_SIZE * 1.75,
      flexGrow: 0,
      flexShrink: 0,
      flexDirection: 'row',
      position: 'relative'
    },
    searchIcon: {
        marginLeft: 1,
        position: 'absolute',
        top: (FONT_SIZE * 1.75 / 2) - (FONT_SIZE / 2),
        left: iconOffset,
    },
    input: {
        paddingLeft: FONT_SIZE + (iconOffset * 2),
        width: "100%",
        height: '100%',
        fontSize: FONT_SIZE * 0.75,
        borderColor: '',
        borderWidth: 1,
        borderRadius: 4,
    }
});

  export default SearchBar;