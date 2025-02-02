import React from 'react';
import {faUser, faCalendarDays} from '@fortawesome/free-regular-svg-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHouse, faPills} from '@fortawesome/free-solid-svg-icons';
import {MedicinesStack} from './medicines-stack';
import {AccountStack} from './account-stack';
import {VisitsStack} from './visits-stack';
import {HomeStack} from './home-stack';
import {COLORS} from '@constants';

const Tab = createBottomTabNavigator();

const TABS = [
  {name: 'HomeStack', component: HomeStack, title: 'Home', icon: faHouse},
  {
    component: MedicinesStack,
    name: 'MedicinesStack',
    title: 'Medicines',
    icon: faPills,
  },
  {
    component: VisitsStack,
    name: 'VisitsStack',
    title: 'Visits',
    icon: faCalendarDays,
  },
  {
    component: AccountStack,
    name: 'AccountStack',
    title: 'Account',
    icon: faUser,
  },
];

const SCREEN_OPTIONS = {
  tabBarInactiveTintColor: COLORS.PRIMARY_BLUE,
  tabBarActiveTintColor: COLORS.ACTIVE_BLUE,
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    paddingTop: 5,
    shadowColor: '#00000040',
    backgroundColor: 'white',
    shadowOpacity: 0.1,
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
            tabBarIcon: props => (
              <FontAwesomeIcon {...props} icon={tab.icon} size={22} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
