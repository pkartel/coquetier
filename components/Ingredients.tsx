import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Checkbox from 'expo-checkbox';

enum IngredientsTypes {
    Spirits,
    Mixers,
    Juices,
    Garnishes
}

interface IIngredient {
    id: string;
    type: IngredientsTypes;
    name: string;
    isChecked?: boolean;
}

export type Props = {
    selectedIngredients: string[],
    onSelectedIngredientsChanged: (selectedIngredients: string[]) => void;
};

const Ingredients: React.FC<Props> = ({selectedIngredients, onSelectedIngredientsChanged}) => {
    // const [ingredients, setIngredients] = useState([]);
    const [categorizedIngredients, setCategorizedIngredients] = useState({});

    const mapIngredientsToCategories = (ingredients: IIngredient[]): {[key in IngredientsTypes]?: Pick<IIngredient, 'id' | 'name'>} => {
        const ingredientsMap = ingredients.reduce((acc, ingredient) => {
            const {type} = ingredient;
            acc[type] = (acc[type] || []).concat({...ingredient});
            return acc;
        }, {});

        return ingredientsMap;
    };

    const getIngredients = async () => {
        try {
            const response = await fetch('http://192.168.0.164:3000/ingredients');
            const json = await response.json();
            // setIngredients(json);

            const ingredientsCategoryMap =  mapIngredientsToCategories(json);
            setCategorizedIngredients(ingredientsCategoryMap);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getIngredients();
    }, []);

    const updateIngredients = (ingredient: IIngredient, isChecked: boolean) => {
        onSelectedIngredientsChanged(
          isChecked ?
            [...selectedIngredients, ingredient.id] :
            selectedIngredients.filter(i => i !== ingredient.id)
        );
    }

    const renderCategoryIngredients = (category: IngredientsTypes) => (
        <View>{categorizedIngredients[category].map((ingredient: IIngredient) => (
            <View
                key={ingredient.id}
                style={styles.filterItem}>
                <Text
                    onPress={(e: TouchEvent) => updateIngredients(ingredient, !selectedIngredients.includes(ingredient.id))}
                >{ingredient ? ingredient.name : ''}</Text>
                <Checkbox style={styles.checkbox}
                    value={selectedIngredients.includes(ingredient.id)}
                    onValueChange={(isChecked) => updateIngredients(ingredient, isChecked)}
                />
            </View>
        ))}
        </View>
    );

    return (
        <FlatList
            style={styles.container}
            data={Object.keys(categorizedIngredients)}
            renderItem={({item}) => {
                return (
                    <View style={styles.category}>
                        <Text style={styles.categoryLabel}>{item}:</Text>
                        {renderCategoryIngredients(item as unknown as IngredientsTypes)}
                    </View>
                )
            }}>
        </FlatList>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        paddingRight: 10,
        width: '100%',
        height: '85%',
        overflow: 'hidden',
        flexShrink: 1,
        flexGrow: 0,
    },
    category: {
        marginTop: 20,
    },
    categoryLabel: {
        fontSize: 20,
        marginBottom: 5,
    },
    filtersList: {
        flex: 0,
    },
    filterItem: {
        marginTop: 7,
        marginLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    checkbox: {
        marginRight: 7,
    },
  });

export default Ingredients;