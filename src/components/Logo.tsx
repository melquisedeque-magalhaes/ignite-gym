import { Center, Text } from "native-base";

import LogoSvg from '@assets/logo.svg'

export function Logo() {
  return(
    <Center my={24}>
      <LogoSvg />

      <Text color="gray.100" fontSize="sm" fontFamily="body">
        Treine sua mente e o seu corpo
      </Text>
    </Center>
  )
}