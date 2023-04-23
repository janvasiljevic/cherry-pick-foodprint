import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import Card from "../components/Card";
import { useUserControllerFindAll } from "../api/user/user";
import { useRecipeControllerTimeline } from "../api/recipes/recipes";

export const Feed = () => {
  // const { data, isLoading } = useUserControllerFindAll();
  // console.log(data);

  const { data, isLoading } = useRecipeControllerTimeline({
    cursor: "",
  });

  return (
    <ScrollView>
      {isLoading && <ActivityIndicator />}
      {data?.map((recipe) => (
        <Card {...recipe} />
      ))}
    </ScrollView>
  );
};
