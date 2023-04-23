import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { Ingridient } from "../api/model";
import Icon from "react-native-vector-icons/FontAwesome5";
import DropDownPicker from "react-native-dropdown-picker";
import { Dropdown } from "react-native-element-dropdown";
import { useSourceControllerSearch } from "../api/source/source";
import { Formik } from "formik";
import {
  useIngridientControllerCreate,
  useIngridientControllerRemove,
} from "../api/ingridients/ingridients";

export interface ing {
  name: string;
  weight: number;
}

export const MultiAdd = ({
  setIngredients,
  ingredients,
}: {
  setIngredients: (ingredients: ing[]) => void;
  ingredients: ing[];
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView className="w-full">
      <Text className="text-xs text-gray-800 font-bold">Ingredients</Text>
      <View className="bg-white p-4 mt-1">
        {ingredients.map((ingredient, i) => (
          <TouchableOpacity
            onPress={() => {
              setIngredients(ingredients.filter((_, index) => index !== i));
            }}
          >
            <View
              className="mt-2 flex flex-row items-center w-full justify-between"
              key={ingredient.name + i}
            >
              <Text className="px-2">{ingredient.name}</Text>
              <Text className="px-2">{ingredient.weight}</Text>

              <View>
                <Icon name="minus-circle" size={20} color="#cbd5e1" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
        {/* <Text>{sources?.map((source) => source.food_item).join(", ")}</Text> */}
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <View className="flex flex-row items-center justify-center bg-teal-400/25 mt-8 rounded-md">
            <Text className="ml-2 mr-4 text-lg text-teal-600 ">ingredient</Text>
            <Icon name="plus-circle" size={20} color="#0d9488" />
          </View>
        </TouchableOpacity>
      </View>

      <Modal
        animationType={"slide"}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View className="flex justify-center items-center w-full h-full bg-gray-200/75">
          <View className="p-2 bg-white rounded-lg w-full m-4">
            <Formik
              initialValues={{ item: "", weight: "" }}
              onSubmit={(values) => {
                console.log({
                  name: values.item,
                  weight: parseInt(values.weight),
                });
                setIngredients([
                  ...ingredients,
                  {
                    name: values.item,
                    weight: parseInt(values.weight),
                  },
                ]);
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View className="mt-4 mx-2 flex flex-col items-start">
                  <View className="w-full flex">
                    <Text className="text-xs text-gray-800 font-bold">
                      Name
                    </Text>
                    <TextInput
                      onChangeText={handleChange("item")}
                      onBlur={handleBlur("item")}
                      value={values.item}
                      className="border border-slate-300 rounded-md  bg-white p-2"
                    />
                  </View>

                  <View className="w-full flex mt-4">
                    <Text className="text-xs text-gray-800 font-bold">
                      Weight in grams
                    </Text>
                    <TextInput
                      onChangeText={handleChange("weight")}
                      onBlur={handleBlur("weight")}
                      value={values.weight.replace(/[^0-9]/g, "")}
                      className="border border-slate-300 rounded-md  bg-white p-2"
                    />
                  </View>

                  <View className="my-4">
                    <Button
                      title="Add ingredient"
                      color="#2dd4bf"
                      onPress={() => {
                        handleSubmit();
                        setModalVisible(false);
                      }}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
