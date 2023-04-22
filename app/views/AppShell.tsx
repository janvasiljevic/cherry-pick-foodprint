import { View, Text } from "react-native";
import { BottomBar } from "../components/BottomBar";

export const AppShell = () => {
  // main app container. routes are defined here and rendered in the main container
  // added header and footer components

  return (
    <View className="h-full w-full flex flex-col justify-between">
      {/* header */}
      <View className="p-6 pt-16 bg-teal-50">
        <Text>Header</Text>
      </View>

      {/* routes */}
      <View className=" flex-1 bg-orange-400" />

      {/* footer */}
      <BottomBar />
    </View>
  );
};
