import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';
import React from 'react';
import MovieScreen from '../pages/MovieScreen';
import SearchScreen from '../pages/SearchScreen';
import TvShowScreen from '../pages/TvShowScreen';
import DetailScreen from '../pages/DetailScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Tabs() {
  const insets = useSafeAreaInsets();
  const Tab = createMaterialTopTabNavigator();
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Movies App'
          options={{
            headerStyle: { backgroundColor: '#273646' },
            headerTintColor: 'white',
            title: 'Movies App',
            headerTitleAlign: 'center',
          }}>
          {() => (
            <Tab.Navigator
              initialRouteName='Movie'
              screenOptions={{
                tabBarLabelStyle: { textTransform: 'none' },
              }}>
              <Tab.Screen
                name='Movie'
                component={MovieScreen}
                options={{
                  tabBarLabel: 'Movies',
                  tabBarActiveTintColor: '#273646',
                  tabBarIndicatorStyle: {
                    backgroundColor: '#273646',
                  },
                }}
              />
              <Tab.Screen
                name='Search'
                component={SearchScreen}
                options={{
                  tabBarLabel: 'Search Results',
                  tabBarActiveTintColor: '#273646',
                  tabBarIndicatorStyle: {
                    backgroundColor: '#273646',
                  },
                }}
              />
              <Tab.Screen
                name='TvShow'
                component={TvShowScreen}
                options={{
                  tabBarLabel: 'TV Shows',
                  tabBarActiveTintColor: '#273646',
                  tabBarIndicatorStyle: {
                    backgroundColor: '#273646',
                  },
                }}
              />
            </Tab.Navigator>
          )}
        </Stack.Screen>
        <Stack.Screen
          name='Detail'
          component={DetailScreen}
          options={{
            headerStyle: { backgroundColor: '#273646' },
            headerTintColor: 'white',
            title: 'Detail',
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
