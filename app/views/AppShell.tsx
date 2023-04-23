import { View, Text } from "react-native";
import { BottomBar } from "../components/BottomBar";
import { TopBar } from "../components/TopBar";
import { Outlet, Route, Routes } from "react-router-native";
import { Feed } from "./Feed";

export const AppShell = () => {
  // main app container. routes are defined here and rendered in the main container
  // added header and footer components

  return (
    <View className="h-full w-full flex flex-col justify-between">
      {/* header */}
      <TopBar />

      {/* routes */}
      <View className=" flex-1 bg-white">
        <Routes>
          <Route path="food" Component={Feed} />
          <Route path="*" Component={View} />
        </Routes>
      </View>

      {/* footer */}
      <BottomBar />
    </View>
  );
};
