import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeStack} from './home-stack';
import {Home2Stack} from './home-2-stack';
import {TabBarIcon} from '@components';
import {Triangle} from '@icons';

const Tab = createBottomTabNavigator();

const TABS = [
  {name: 'HomeStack', component: HomeStack, title: 'Home', icon: Triangle},
  {
    name: 'Home2Stack',
    component: Home2Stack,
    title: 'Home 2',
    icon: Triangle,
  },
];

const SCREEN_OPTIONS = {
  tabBarInactiveTintColor: 'grey',
  tabBarActiveTintColor: 'blue',
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    paddingTop: 5,
    shadowColor: '#00000040',
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: -20,
    },
  },
};

export function App() {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={SCREEN_OPTIONS}>
      {TABS.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            title: tab.title,
            tabBarIcon: props => <TabBarIcon {...props} Icon={tab.icon} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
