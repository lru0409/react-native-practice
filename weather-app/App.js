import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { OPEN_WEATHER_API_KEY } from "@env";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Rain: "rain",
  Snow: "snow",
  Atmosphere: "cloudy-gusts",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });
    const location = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    setCity(location[0].city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
    );
    const json = await response.json();
    setDays(json.list.filter(({ dt_txt }) => dt_txt.includes("00:00:00")));
  };
  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      {ok ? (
        <>
          <View style={styles.city}>
            <Text style={styles.cityName}>{city}</Text>
          </View>
          <ScrollView
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.weather}
          >
            {days.length === 0 ? (
              <View style={{ ...styles.day, alignItems: "center" }}>
                <ActivityIndicator
                  color="white"
                  size="large"
                  style={{ marginTop: 10 }}
                />
              </View>
            ) : (
              days.map((day) => (
                <View style={styles.day} key={day.dt}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Text style={styles.temp}>
                      {parseFloat(day.main.temp).toFixed(1)}
                    </Text>
                    <Fontisto
                      name={icons[day.weather[0].main]}
                      size={50}
                      color="black"
                    />
                  </View>
                  <Text style={styles.description}>{day.weather[0].main}</Text>
                  <Text style={styles.tinyText}>
                    {day.weather[0].description}
                  </Text>
                </View>
              ))
            )}
          </ScrollView>
        </>
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>위치 권한을 부여해 주세요.</Text>
        </View>
      )}
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "skyblue",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 60,
    fontWeight: "600",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "flex-start",
    padding: 20,
  },
  temp: {
    marginTop: 50,
    fontSize: 110,
    fontWeight: "600",
  },
  description: {
    marginTop: -10,
    marginBottom: -4,
    fontSize: 36,
  },
  tinyText: {
    fontSize: 24,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    fontSize: 15,
  },
});
