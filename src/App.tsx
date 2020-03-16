import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { HomePage } from './pages/home-page';
import { ExpensePage } from './pages/expense-page';
import { SummaryPage } from './pages/summary-page';
import { Text } from 'react-native';
import { EPage } from './core/enums/page.enum';



const Tab = createBottomTabNavigator();
const myTheme = {
  ...DefaultTheme,
  color: {
    ...DefaultTheme.colors,
    backgroundColor: '#f6f8fa'
  }
}
export default function App() {
  const pages: any = {
    [EPage.HOME]: { label: "Início", icon: { default: 'ios-home', focused: 'ios-home' } },
    [EPage.EXPENSE]: { label: "Despesas", icon: { default: 'ios-add-circle-outline', focused: 'ios-add-circle' } },
    [EPage.SUMMARY]: { label: "Resumo", icon: { default: 'ios-list', focused: 'ios-list-box' } },
  };
  return (
    <NavigationContainer theme={myTheme}>
      <Tab.Navigator
        initialRouteName={EPage.HOME}
        screenOptions={({ route }) => ({
          tabBarLabel: () => <Text>{pages[route.name].label}</Text>,
          tabBarIcon: ({ focused, color, size }) => <Ionicons name={focused ? pages[route.name].icon.focused : pages[route.name].icon.default} size={size} color={color} />
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray'
        }
        }

      >
        <Tab.Screen name="Summary" component={SummaryPage} />
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Expense" component={ExpensePage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
