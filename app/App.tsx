import { Text, View } from "react-native";
import { Login } from "./views/login/Login";
import { Register } from "./views/login/Register";
import { AppShell } from "./views/AppShell";
import { NativeRouter, Route, Link, Routes } from "react-router-native";
import { Feed } from "./views/Feed";

export default function App() {
  return (
    <View className="flex justify-center align-middle w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 ">
      {/* <Register />r */}
      <NativeRouter>
        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/" Component={AppShell} />
          <Route path="/app" Component={AppShell} />
          <Route path="/app/*" Component={AppShell} />
        </Routes>
      </NativeRouter>
    </View>
  );
}
