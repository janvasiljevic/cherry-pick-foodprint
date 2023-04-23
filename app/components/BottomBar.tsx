import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useLocation, useNavigate } from "react-router-native";

interface NavItemProps {
  name: string;
  icon: string;
}

export const NavItem = ({ icon, name }: NavItemProps) => {
  // auto track active route
  const location = useLocation();
  const active = location.pathname == "/app/" + name.toLowerCase();

  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/app/" + name.toLowerCase());
    // console.log("navigating to: ", name.toLowerCase());
  };

  if (!active) {
    // inactive
    return (
      <TouchableOpacity onPress={clickHandler}>
        <View className=" px-4 py-2 flex  items-center border-b-2 border-white">
          <Icon name={icon} size={20} color="#cbd5e1" />
          <Text className="text-gray-300 font-bold">{name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  // active
  return (
    <View className="px-4 py-2 flex items-center border-b-2 border-teal-400">
      <Icon name={icon} size={20} color="#2dd4bf" />
      <Text className="text-teal-400 font-bold">{name}</Text>
    </View>
  );
};

export const BottomBar = () => {
  const navigate = useNavigate();

  return (
    <View className="flex flex-row justify-evenly items-center bg-white shadow-lg p-2">
      {/* navigation buttons */}
      {/* <NavItem name="Profile" icon="user-alt" /> */}
      <NavItem name="Food" icon="utensils" />
      <NavItem name="Search" icon="bolt" />
      <NavItem name="Add" icon="plus-circle" />
      <NavItem name="Follow" icon="user-friends" />
    </View>
  );
};
