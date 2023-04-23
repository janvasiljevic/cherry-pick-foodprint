import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import Card from "../components/Card";
import { useUserControllerFindAll } from "../api/user/user";
import { useRecipeControllerTimeline } from "../api/recipes/recipes";

export const user = ({ id }: { id: string }) => {
  // const { data, isLoading } = useUserControllerFindAll();
  // console.log(data);

  const { data, isLoading } = useReci({
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
function useReci(arg0: { cursor: string }): { data: any; isLoading: any } {
  throw new Error("Function not implemented.");
}
