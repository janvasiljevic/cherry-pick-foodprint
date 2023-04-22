import { Text, View } from "react-native";
import { Login } from "./views/login/Login";
import { Register } from "./views/login/Register";
import { NativeRouter, Route, Link, Routes } from "react-router-native";

export default function App() {
  return (
    <View className="flex justify-center align-middle w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 ">
      {/* <Register />r */}
      <NativeRouter>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
        </Routes>
      </NativeRouter>

      {/* <Text className="w-full text-center">ojla</Text> */}
    </View>
  );
}

// import { NativeWindStyleSheet } from "nativewind";

// NativeWindStyleSheet.setOutput({
//   default: "native",
// });
