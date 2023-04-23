import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useLocation, useNavigate } from "react-router-native";
import { Group, Stack } from "./Util";
import { Recipe } from "../api/model";

const Card = ({
  author,
  comments,
  description,
  image_url,
  foodTags,
  calculate_carbon_footprint,
  calculate_water_footprint,
  name,
  createdAt,
  bookmarkedBy,
}: Recipe) => (
  <View className="flex flex-col rounded-xl bg-white m-4 border-2 border-slate-200 ">
    {/* img */}
    <Image
      source={{ uri: "https://picsum.photos/seed/picsum/500/500" }}
      className="w-full h-36 bg-red-300 bg-contain rounded-lg"
    />
    <View className="flex flex-row justify-between">
      <View />
      <View className="flex flex-row">
        {calculate_carbon_footprint && (
          <View className="bg-purple-500 p-2 px-4 rounded-3xl -mt-6 mr-4 border-2 border-white">
            <Text className="text-white font-bold text-xs">
              {calculate_carbon_footprint} Co2
            </Text>
          </View>
        )}
        {calculate_water_footprint && (
          <View className="bg-blue-500 p-2 px-4 rounded-3xl -mt-6 mr-4  border-2 border-white">
            <Text className="text-white font-bold text-xs">
              {calculate_water_footprint}
            </Text>
          </View>
        )}
      </View>
    </View>

    <View className="p-2 px-6 flex">
      <Text className="text-xl font-bold text-slate-800 ">{name}</Text>

      <Text className="text-sm  text-slate-400 mt-4 text-justify">
        {description}
      </Text>
    </View>

    <View className="flex flex-row justify-end mt-2 pb-2 pr-2">
      <TouchableOpacity>
        <View className=" px-4 py-2 flex  items-center">
          <Icon name="comment-alt" size={14} color="#cbd5e1" />
          <Text className="text-gray-300 text-sm">
            comment {comments.length}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View className=" px-4 py-2 flex  items-center ">
          <Icon name="heart" size={14} color="#cbd5e1" />
          <Text className="text-gray-300 text-sm">
            save {bookmarkedBy.length}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

export default Card;
