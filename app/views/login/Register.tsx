import { View, Text, TextInput, Button } from "react-native";
import { Group, Stack } from "../../components/Util";
import { Formik } from "formik";

import { useState } from "react";
import { useNavigate } from "react-router-native";
import { useUserControllerCreate } from "../../api/user/user";

import * as SecureStore from "expo-secure-store";

export const Register = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useUserControllerCreate({
    mutation: {},
  });

  // if token exists, navigate to app
  SecureStore.getItemAsync("at").then((token) => {
    if (token) {
      navigate("/app");
    }
  });

  return (
    <Formik
      initialValues={{ email: "", password: "", name: "", surname: "" }}
      onSubmit={(values) => {
        mutate({
          data: {
            firstName: values.name,
            lastName: values.surname,
            password: values.password,
            socials: [],
            username: values.email,
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
            Register a new account
          </Text>

          <View className="my-4" />
          <View className="p-6 bg-teal-50 rounded-md shadow-lg">
            <Stack>
              <View className="w-full">
                <View className="border-b border-slate-300 ">
                  <TextInput
                    className="underline pt-2"
                    placeholder="Email"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                  />
                </View>
                <View className="border-b border-slate-300 mt-4">
                  <TextInput
                    secureTextEntry={true}
                    className="underline pt-2"
                    placeholder="Password"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  />
                </View>
                <View className="border-b border-slate-300 mt-4">
                  <TextInput
                    className="underline pt-2"
                    placeholder="Name"
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                  />
                </View>
                <View className="border-b border-slate-300 mt-4">
                  <TextInput
                    className="underline pt-2"
                    placeholder="Surname"
                    onChangeText={handleChange("surname")}
                    onBlur={handleBlur("surname")}
                    value={values.surname}
                  />
                </View>
              </View>

              <View className="my-4" />
              <Group position="apart">
                <Text
                  className="underline text-teal-500"
                  onPress={() => {
                    navigate("/login");
                  }}
                >
                  Have an account?{" "}
                </Text>
                <Button
                  disabled={isLoading}
                  onPress={() => {
                    handleSubmit();
                  }}
                  title={isLoading ? "Loading..." : "Register"}
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
