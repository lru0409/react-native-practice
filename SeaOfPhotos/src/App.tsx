import { StatusBar, useColorScheme, View, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import LoginScreen from '@src/screens/login';
import HomeScreen from '@src/screens/home';
import SearchScreen from '@src/screens/search';
import CollectionScreen from '@src/screens/collection';
import PhotoDetailScreen from '@src/screens/photoDetail';
import SearchDetailScreen from '@src/screens/searchDetail';
import CollectionDetailScreen from '@src/screens/collectionDetail';
import CollectionCreationScreen from '@src/screens/collectionCreation';
import { Photo } from '@src/types/photo';
import { Collection } from '@src/types/collection';
import { AuthProvider, useAuth } from '@src/contexts/auth';
import commonStyles from '@src/styles/common';

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export type RootStackParamList = {
  Tabs: undefined;
  PhotoDetail: { photo: Photo };
  SearchDetail: { query: string };
  CollectionDetail: { collection: Collection  };
  CollectionCreation: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AppContent() {
  const isDarkMode = useColorScheme() === 'dark';
  const { isLoggedIn } = useAuth();

  if (isLoggedIn === null) {
    return (
      <View style={[commonStyles.initialLoadingContainer]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer>
          <Stack.Navigator>
            {isLoggedIn ? (
              <>
                <Stack.Screen
                  name="Tabs"
                  component={TabNavigator}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="PhotoDetail"
                  component={PhotoDetailScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SearchDetail"
                  component={SearchDetailScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="CollectionDetail"
                  component={CollectionDetailScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="CollectionCreation"
                  component={CollectionCreationScreen}
                  options={{ headerShown: false }}
                />
              </>
            ) : (
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
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

export default App;
