import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import Card from "../components/Card";
import {
  useUserControllerFindAll,
  useUserControllerFindOne,
} from "../api/user/user";
import { useRecipeControllerTimeline } from "../api/recipes/recipes";
import { useParams, useSearchParams } from "react-router-native";
import { Group } from "../components/Util";
import Icon from "react-native-vector-icons/FontAwesome5";

export const User = () => {
  // const { data, isLoading } = useUserControllerFindAll();
  // console.log(data);
  let { userId } = useParams();

  const { data, isLoading, error } = useUserControllerFindOne(userId);
  console.log("RECIPES", data.recipes);

  if (!data && error) {
    return (
      <View className="h-full w-full flex justify-center items-center">
        <Text>Something went wrong</Text>
      </View>
    );
  }

  return (
    <ScrollView className="h-full w-full">
      <View className="flex flex-col items-center justify-center w-full py-8 bg-slate-50 border-b-2 border-teal-400">
        <Group>
          <Icon name="seedling" size={24} color="#16a34a" />

          <View className="flex flex-col justify-center items-center mx-8">
            <Text className="font-bold text-md text-teal-600">
              {data?.username}
            </Text>
            <Group>
              <Text className="font-bold text-md text-teal-600 px-1¸">
                {data?.firstName}
              </Text>
              <Text className="font-bold text-md text-teal-600 px-1">
                {data?.lastName}
              </Text>
            </Group>
          </View>
          <Icon name="seedling" size={24} color="#16a34a" />
        </Group>
      </View>

      {isLoading && <ActivityIndicator size="large" />}

      {data && data.recipes.length === 0 && <Text>No recipes found</Text>}
      {data &&
        data.recipes.length > 0 &&
        data?.recipes?.map((recipe) => <Card {...recipe} />)}
    </ScrollView>
  );
};
