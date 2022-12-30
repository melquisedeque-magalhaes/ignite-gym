import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";

import { SignIn } from "@screens/SignIn";
import { SignUp } from "@screens/SignUp";

type AuthRoutes = {
  signIn: undefined
  signUp: undefined
}

export type AuthNavigationRoutesProps = NativeStackNavigationProp<AuthRoutes>

export function AuthRoutes() {

  const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

  return(
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signIn" component={SignIn} />
      <Screen name="signUp" component={SignUp} />
    </Navigator>
  )
}