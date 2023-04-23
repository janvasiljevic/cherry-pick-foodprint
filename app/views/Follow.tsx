import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import Card from "../components/Card";
import {
  useUserControllerFindAll,
  useUserControllerFollow,
  userControllerFollow,
} from "../api/user/user";
import { useRecipeControllerTimeline } from "../api/recipes/recipes";
import React, { useState } from "react";
import { Group } from "../components/Util";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigate } from "react-router-native";
import { useAuthControllerLogin } from "../api/authentication/authentication";

export const Follow = () => {
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  const navigate = useNavigate();

  const { data, isLoading } = useUserControllerFindAll({
    search: appliedSearch,
  });

  const { mutate } = useUserControllerFollow();

  return (
    <ScrollView>
      <View className="m-4">
        <Text className="font-medium mb-6">
          Follow people and see their dishes when they post
        </Text>
        <Text className="text-xs">User search</Text>
        <Group position="apart">
          <TextInput
            className="underline "
            placeholder="Username"
            onChangeText={(text) => {
              setSearch(text);
            }}
            value={search}
          />

          <Button
            title="search"
            color="#14b8a6"
            onPress={() => {
              setAppliedSearch(search);
            }}
          />
        </Group>

        {appliedSearch != "" && (
          <View className="mt-6">
            {isLoading && <ActivityIndicator />}
            <View className="flex flex-row justify-center">
              {data && data.length === 0 && (
                <Text className="font-bold text-red-600">No users found</Text>
              )}
            </View>

            {data?.map((user) => (
              <TouchableOpacity
                key={user.id}
                onPress={() => {
                  mutate(
                    { id: user.id },
                    {
                      onSuccess: () => {
                        console.log("success");
                        alert("Followed user");
                      },
                      onError: () => {
                        console.log("error");
                      },
                    }
                  );
                }}
              >
                <View className="border border-gray-300 px-4 py-1 my-2 rounded-md bg-white">
                  <Group>
                    <Icon name={"user"} size={20} color="#cbd5e1" />

                    <Text className="p-2">{user.username}</Text>
                    <Text className="p-2">{user.firstName}</Text>
                    <Text className="p-2">{user.lastName}</Text>
                    <Text className="p-2 font-medium text-teal-500">
                      Follow user
                    </Text>
                  </Group>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};
