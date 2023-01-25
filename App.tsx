import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SearchForm from "./components/SearchForm";
import CoctailsList from "./components/CoctailsList";
import HomePage from "./pages/HomePage";

const Stack = createNativeStackNavigator();

const App: React.FC<void> = () => {
  const [coctails, setCoctails] = useState([]);

  const onSubmitHandler = async (selectedIngredients) => {
    try {
      const queryParams = new URLSearchParams({
        ingredients: selectedIngredients
    }).toString();
      const response = await fetch(`http://192.168.0.164:3000/coctails?${queryParams}`);
      const json = await response.json();
      setCoctails(json);
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <NavigationContainer>
        <View style={styles.container}>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomePage}
              options={{ title: 'Welcome' }}
            />
          </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
  }
});

export default App;