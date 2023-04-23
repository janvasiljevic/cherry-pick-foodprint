import { Text, View } from "react-native";
import { Login } from "./views/login/Login";
import { Register } from "./views/login/Register";
import { AppShell } from "./views/AppShell";
import { NativeRouter, Route, Link, Routes } from "react-router-native";
import { Feed } from "./views/Feed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { User } from "./views/User";

const queryClient = new QueryClient();

export default function App() {
  return (
    <View className="flex justify-center align-middle w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 ">
      {/* <Register />r */}
      <QueryClientProvider client={queryClient}>
        <NativeRouter>
          <Routes>
            <Route path="/login" Component={Login} />
            <Route path="/" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/app/*" Component={AppShell} />
          </Routes>
        </NativeRouter>
      </QueryClientProvider>
    </View>
  );
}
