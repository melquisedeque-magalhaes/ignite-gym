import { Box, useTheme } from "native-base";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { Loading } from "@components/Loading";
import { useAuth } from "@hooks/useAuth";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() { 

  const { colors } = useTheme()

  const { user, isLoadingUserStorage } = useAuth()

  const theme = DefaultTheme

  theme.colors.background = colors.gray[700]

  if(isLoadingUserStorage){
    return <Loading />
  }

  const isAuthenticated = !!user?.id

  return(
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        {isAuthenticated ? <AppRoutes /> : <AuthRoutes />} 
      </NavigationContainer>
    </Box>
  )
}