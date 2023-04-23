import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useLocation, useNavigate } from "react-router-native";
import { Group } from "./Util";

export const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation()
    .pathname.replaceAll("/", "")
    .replace("app", "");

  return (
    <View className="flex flex-row mt-6 p-6 justify-between  bg-gray-50 shadow-lg">
      {/* left */}
      <Text className="font-bold text-md">{location}</Text>
      {/* right */}
      <Group>
        <TouchableOpacity onPress={() => navigate("/app/user")}>
          {location === "user" && (
            <View className="bg-teal-50 p-2 rounded-full">
              <Icon name="user-alt" size={18} color="#14b8a6" />
            </View>
          )}
          {location !== "user" && (
            <View className="bg-gray-50 p-2 rounded-full">
              <Icon name="user-alt" size={18} color="#cbd5e1" />
            </View>
          )}
        </TouchableOpacity>
      </Group>
    </View>
  );
};
