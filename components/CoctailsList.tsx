import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

interface ICoctail {
  name: string;
  ingredients: string[];
  'recipe html': string;
  glasses: string[];
}

export type Props = {
  coctails: ICoctail[];
};

const CoctailsList: React.FC<Props> = ({coctails}) => {
    return (
      <View style={styles.container}>
        <FlatList data={coctails} renderItem={({item}) => (
          <View style={styles.coctail}>
            <Text style={styles.coctailName}>{item.name}</Text>
          </View>
        )} />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    coctail: {
      flex: 1
    },
    coctailName: {
      flex: 1,
      color: 'black',
    }
  });

  export default CoctailsList;