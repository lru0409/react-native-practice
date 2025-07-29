import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/screens/home';
import SearchScreen from './src/screens/search';
import CollectionScreen from './src/screens/collection';

const Tab = createBottomTabNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarLabelStyle: {
                fontSize: 12,
                marginTop: 3,
                color: 'black',
              },
            }}
          >
            <Tab.Screen
              name="홈"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <Icon name={focused ? 'home' : 'home-outline'} size={24} />
                ),
              }}
            />
            <Tab.Screen
              name="검색"
              component={SearchScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <Icon
                    name={focused ? 'search' : 'search-outline'}
                    size={24}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="저장됨"
              component={CollectionScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <Icon
                    name={focused ? 'person' : 'person-outline'}
                    size={24}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
