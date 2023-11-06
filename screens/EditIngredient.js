import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const EditIngredient = ({ route }) => {
  const [editedIngredient, setEditedIngredient] = useState(route.params.ingredient);
  const navigation = useNavigation();

  const handleSave = () => {
    
    navigation.navigate("IngredientList", { editedIngredient });
  };

  return (
    <View>
      <Text>Edit Ingredient:</Text>
      <TextInput
        value={editedIngredient}
        onChangeText={setEditedIngredient}
      />
      <TouchableOpacity onPress={handleSave}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditIngredient;
