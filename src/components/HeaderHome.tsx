import { TouchableOpacity } from "react-native";
import { Heading, HStack, Icon, Text, useToast, VStack } from "native-base";
import { MaterialIcons } from '@expo/vector-icons'

import { Avatar } from "./Avatar";

import { useAuth } from "@hooks/useAuth";
import defaultAvatar from '@assets/userPhotoDefault.png'

export function HeaderHome() {

  const { user, signOut } = useAuth()

  const toast = useToast()

  async function handleSignOut() {
    try {
      await signOut()
    }catch(error){
      toast.show({
        title: 'Ocorreu um erro ao sair da aplicação!',
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  return(
    <HStack pt={10} px={6} pb={5} bg="gray.600" alignItems="center">
      <Avatar 
        size={16} 
        source={ user.avatar ? { uri: user.avatar } : defaultAvatar} 
        mr={4}
        alt="avatar do usuário"
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize="md" fontFamily="body">
          Olá,
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={handleSignOut}>
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