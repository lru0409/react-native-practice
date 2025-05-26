import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "./colors";

const Header = ({ onWorkClick, onTravelClick, working }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onWorkClick}>
        <Text
          style={{ ...styles.btnText, color: working ? "white" : theme.grey }}
        >
          Work
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onTravelClick}>
        <Text
          style={{
            ...styles.btnText,
            color: !working ? "white" : theme.grey,
          }}
        >
          Travel
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
  },
});

export default Header;
