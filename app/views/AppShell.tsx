import { View, Text } from "react-native";
import { BottomBar } from "../components/BottomBar";
import { TopBar } from "../components/TopBar";
import { Outlet, Route, Routes } from "react-router-native";
import { Feed } from "./Feed";
import { SearchView } from "./Search";
import { AddView } from "./Add";
import { Follow } from "./Follow";
import { User } from "./User";

export const AppShell = () => {
  // main app container. routes are defined here and rendered in the main container
  // added header and footer components

  return (
    <View className="h-full w-full flex flex-col justify-between">
      {/* header */}
      <TopBar />

      {/* routes */}
      <View className=" flex-1 bg-gray-100">
        <Routes>
          <Route path="food" Component={Feed} />
          <Route path="follow" Component={Follow} />
          <Route path="add" Component={AddView} />
          <Route path="search" Component={SearchView} />
          <Route path="user/:userId" Component={User} />

          <Route path="*" Component={View} />
        </Routes>
      </View>

      {/* footer */}
      <BottomBar />
    </View>
  );
};
