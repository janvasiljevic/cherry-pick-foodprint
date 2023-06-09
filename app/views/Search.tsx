import {
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Card from "../components/Card";
import { Formik } from "formik";
import { useRecipeControllerSearch } from "../api/recipes/recipes";
import { useState } from "react";

export const SearchView = () => {
  const [search, searchSet] = useState("carrot");
  const { data, isLoading } = useRecipeControllerSearch(search);
  console.log(data);

  return (
    <ScrollView className="h-full p-4">
      <View className="bg-blue-100 p-2 rounded-lg border border-blue-300 flex flex-row justify-around items-center">
        <Icon name="seedling" size={20} color="#16a34a" />
        <Text className="text-sm text-center text-sky-600 font-medium">
          Get your Co2 friendly meal! Enter a description of what you want to
          eat.
        </Text>
      </View>
      <Formik
        initialValues={{ description: "" }}
        onSubmit={(values) => {
          console.log(values);

          searchSet(values.description);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View className="mt-4 flex flex-row items-center">
            {/* <Text className="text-xs text-gray-800 font-bold">Description</Text> */}

            <View className="flex flex-col flex-1">
              <TextInput
                multiline={true}
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
                className="border border-slate-300 rounded-md  bg-white p-2"
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                handleSubmit();
              }}
            >
              <View className=" bg-green-200 text-teal-500 font-bold text-xl ml-4 px-4 py-2 rounded-md">
                <Text>Search</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      {isLoading ? <ActivityIndicator size="large" /> : null}

      {/* {(data && data.length === 0) ?? <Text>No recipes found</Text>}
      <Text>{(data && data.length) || 0}</Text> */}
      {data && data.length > 0
        ? data?.map((recipe) => <Card {...recipe} />)
        : null}
      {/* {(data && data.length > 0) ?? data?.map((recipe) => <Card {...recipe} />)} */}
    </ScrollView>
  );
};
