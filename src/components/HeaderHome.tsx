import { Heading, HStack, Icon, Text, VStack } from "native-base";
import { MaterialIcons } from '@expo/vector-icons'

import { Avatar } from "./Avatar";
import { TouchableOpacity } from "react-native";

export function HeaderHome() {
  return(
    <HStack pt={10} px={6} pb={5} bg="gray.600" alignItems="center">
      <Avatar 
        size={16} 
        source={{ uri: 'https://github.com/melquisedeque-magalhaes.png' }} 
        mr={4}
        alt="avatar do usuário"
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize="md" fontFamily="body">
          Olá,
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          Melqui Sodre
        </Heading>
      </VStack>

      <TouchableOpacity>
        <Icon 
          as={MaterialIcons}
          name="logout"
          size={7}
          color="gray.200"
        />
      </TouchableOpacity>
    </HStack>
  )
}