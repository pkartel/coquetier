import { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Ingredients from './Ingredients';
import SearchBar from './SearchBar';

export type Props = {
  onSubmit: (selectedIngredients: any) => Promise<void>
};

const SearchForm: React.FC<Props> = ({onSubmit}) => {
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    return (
        <View style={styles.container}>
          <SearchBar />
          <Ingredients
            selectedIngredients={selectedIngredients}
            onSelectedIngredientsChanged={ (selectedIngredients) => setSelectedIngredients(selectedIngredients)}/>
          <Button
            onPress={() => onSubmit(selectedIngredients)}
            title="Submit"
            accessibilityLabel="Submit filters button"
          />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '80%',
      flex: 1,
      alignItems: 'flex-start',
    },
    ingredientsList: {
      
    }
  });
  

  export default SearchForm;