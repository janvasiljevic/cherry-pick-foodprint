import { View } from "react-native";
// import view props
import { ViewProps } from "react-native";

interface GroupProps extends ViewProps {
  children: React.ReactNode;
  position?: "left" | "right" | "center" | "apart";
}

export const Group = ({
  children,
  position = "left",
  className,
}: GroupProps) => {
  const p =
    position === "left"
      ? "justify-start"
      : position === "right"
      ? "justify-end"
      : position === "center"
      ? "justify-center"
      : "justify-between";
  return (
    <View className={"flex flex-row items-center" + " " + p}>{children}</View>
  );
};

interface StackProps extends ViewProps {
  children: React.ReactNode;
}

export const Stack = ({ children, className }: StackProps) => {
  return <View className={"flex flex-col space-y-2 "}>{children}</View>;
};
