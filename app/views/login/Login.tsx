import { View, Text, TextInput, Button } from "react-native";
import { Group, Stack } from "../../components/Util";
import { Formik } from "formik";

import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigate } from "react-router-native";
import { useAuthControllerLogin } from "../../api/authentication/authentication";

import * as SecureStore from "expo-secure-store";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // if token exists, navigate to app
  SecureStore.getItemAsync("at").then((token) => {
    if (token) {
      navigate("/app");
    }
  });

  const { mutate, isLoading } = useAuthControllerLogin({
    mutation: {
      onSuccess: (data) => {
        // @ts-ignore
        if (data.access_token) {
          // @ts-ignore
          console.log(data.access_token);
          navigate("/app");
          // @ts-ignore
          SecureStore.setItemAsync("at", data.access_token);
        }
      },
    },
  });

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={(values) => {
        mutate({
          data: {
            password: values.password,
            username: values.username,
          },
        });
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View className="p-8">
          <Group position="center">
            <Text className="text-xl font-bold rounded-md">Welcome to</Text>
            <Text className="text-teal-500  font-bold text-xl p-1 px-2 ml-4 border rounded-lg border-teal-300">
              Foodprint
            </Text>
          </Group>
          <Text className="text-md mt-4 rounded-md text-center text-slate-500">
            Log in to your account
          </Text>
          <View className="my-4" />
          <View className="p-6 bg-teal-50 rounded-md shadow-lg">
            <Stack>
              <View className="w-full">
                <View className="border-b border-slate-300 ">
                  <TextInput
                    className="underline pt-2"
                    placeholder="Username"
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    value={values.username}
                  />
                </View>
                <View className="border-b border-slate-300 mt-4">
                  <TextInput
                    className="underline pt-2"
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  />
                </View>
              </View>

              <View className="my-4" />
              <Group position="apart">
                <Text
                  className="underline text-teal-500"
                  onPress={() => {
                    navigate("/register");
                  }}
                >
                  Don't have an account?{" "}
                </Text>
                <Button
                  disabled={loading}
                  onPress={() => {
                    handleSubmit();
                  }}
                  title={loading ? "Loading..." : "Login"}
                  color="#14b8a6"
                />
              </Group>
            </Stack>
          </View>
        </View>
      )}
    </Formik>
  );
};
