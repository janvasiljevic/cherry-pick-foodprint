import {
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Card from "../components/Card";
import { Formik } from "formik";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { MultiAdd, ing } from "../components/MultiAdd";
import { createFormData } from "../util/createFormdata";
import { useRecipeControllerCreate } from "../api/recipes/recipes";
import { useIngridientControllerCreate } from "../api/ingridients/ingridients";

export const AddView = () => {
  const [image, setImage] = useState(undefined);

  const [ingredients, setIngredients] = useState<ing[]>([]);

  const { data, isLoading, mutate } = useRecipeControllerCreate({
    mutation: {
      onError(error, variables, context) {
        console.log(error.cause);
        console.log(error.code);
        console.log(error.response.data);
        console.log(variables);
        console.log(context);
      },
    },
  });

  return (
    <ScrollView className="h-full p-4 ">
      <Text className="text-left font-medium text-teal-500">
        Publish your own recipe and share it with the world!
      </Text>
      <Formik
        initialValues={{
          description: "",
          name: "",
          image: null,
        }}
        onSubmit={(values) => {
          values.image = createFormData(image);
          console.log(values);
          mutate({
            data: {
              file: null,
              name: values.name,
              description: values.description,
              ingredients: ingredients,
            },
          });
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View className="mt-4 flex flex-col items-start">
            <View className="w-full flex">
              <Text className="text-xs text-gray-800 font-bold">Name</Text>
              <View className="flex flex-col flex-1">
                <TextInput
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  className="border border-slate-300 rounded-md  bg-white p-2"
                />
              </View>
            </View>
            <View className="w-full flex mt-8">
              <Text className="text-xs text-gray-800 font-bold">
                Description
              </Text>
              <View className="flex flex-col flex-1">
                <TextInput
                  multiline={true}
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  value={values.description}
                  className="border border-slate-300 rounded-md  bg-white p-2"
                />
              </View>
            </View>

            <View
              className="mt-1"
              style={{
                opacity: image ? 0.3 : 1,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  ImagePicker.launchImageLibraryAsync()
                    .catch((e) => {
                      console.log(e);
                    })
                    .then((result) => {});
                }}
              >
                <View className="flex flex-row items-center justify-center bg-teal-400/25 mt-4 p-2 rounded-md ">
                  <Text className="ml-2 mr-4 text-lg text-teal-600 ">
                    {image ? "Image selected" : "Select image"}
                  </Text>
                  <Icon name="plus-circle" size={20} color="#0d9488" />
                </View>
              </TouchableOpacity>
            </View>

            <View className="mt-8 w-full">
              <MultiAdd
                setIngredients={(value) => {
                  setIngredients(value);
                }}
                ingredients={ingredients}
              />
            </View>
            <View className="mt-16 w-full flex ">
              <Text className="text-left  text-gray-500 my-2">
                Your recipe will be shared wth others!
              </Text>

              <Button
                title="Add new recipe"
                color="#2dd4bf"
                onPress={() => {
                  handleSubmit();
                }}
              />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};
