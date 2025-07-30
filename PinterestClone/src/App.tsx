import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '@src/screens/home';
import SearchScreen from '@src/screens/search';
import CollectionScreen from '@src/screens/collection';
import PhotoDetailScreen from '@src/screens/photoDetail';
import { Photo } from '@src/types/photo';

export type RootStackParamList = {
  Tabs: undefined;
  PhotoDetail: { photo: Photo };
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="PhotoDetail" component={PhotoDetailScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}

function TabNavigator() {
  return (
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
          tabBarIcon: HomeTabIcon,
        }}
      />
      <Tab.Screen
        name="검색"
        component={SearchScreen}
        options={{
          tabBarIcon: SearchTabIcon,
        }}
      />
      <Tab.Screen
        name="저장됨"
        component={CollectionScreen}
        options={{
          tabBarIcon: CollectionTabIcon,
        }}
      />
    </Tab.Navigator>
  );
}

const HomeTabIcon = ({ focused }: { focused: boolean }) => (
  <Icon name={focused ? 'home' : 'home-outline'} size={24} />
);

const SearchTabIcon = ({ focused }: { focused: boolean }) => (
  <Icon name={focused ? 'search' : 'search-outline'} size={24} />
);

const CollectionTabIcon = ({ focused }: { focused: boolean }) => (
  <Icon name={focused ? 'person' : 'person-outline'} size={24} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
