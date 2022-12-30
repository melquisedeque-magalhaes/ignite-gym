import { Platform } from 'react-native'
import { useTheme } from "native-base";
import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { Exercise } from "@screens/Exercise";
import { History } from "@screens/History";
import { Home } from "@screens/Home";
import { Profile } from "@screens/Profile";

import HomeSvg from '@assets/home.svg'
import HistorySvg from '@assets/history.svg'
import ProfileSvg from '@assets/profile.svg'


type AppRoutes = {
  home: undefined
  history: undefined
  profile: undefined
  exercise: undefined
}

export type AppNavigationRoutesProps = BottomTabNavigationProp<AppRoutes>

export function AppRoutes() {

  const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

  const { sizes, colors } = useTheme()

  const iconSize = sizes[6]

  return(
    <Navigator 
      screenOptions={{ 
        headerShown: false, 
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          backgroundColor: colors.gray[600],
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 96,
          paddingBottom: sizes[8],
          paddingTop: sizes[8]
        }
      }}
    >
      <Screen 
        name="home" 
        component={Home} 
        options={{
          tabBarIcon: ({ color }) => <HomeSvg width={iconSize} height={iconSize} fill={color} />
        }}
      />

      <Screen 
        name="history" 
        component={History} 
        options={{
          tabBarIcon: ({ color }) => <HistorySvg width={iconSize} height={iconSize} fill={color} />
        }}
      />

      <Screen 
        name="profile" 
        component={Profile} 
        options={{
          tabBarIcon: ({ color }) => <ProfileSvg width={iconSize} height={iconSize} fill={color} />
        }}
      />

      <Screen 
        name="exercise" 
        component={Exercise} 
        options={{ 
          tabBarButton: () => null 
        }} 
      />
    </Navigator>
  )
}