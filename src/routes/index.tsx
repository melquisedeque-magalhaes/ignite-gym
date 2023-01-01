import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Box, useTheme } from "native-base";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() { 

  const { colors } = useTheme()

  const theme = DefaultTheme

  theme.colors.background = colors.gray[700]

  const isAuthenticated = false

  return(
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        {isAuthenticated ? <AppRoutes /> : <AuthRoutes />} 
      </NavigationContainer>
    </Box>
  )
}