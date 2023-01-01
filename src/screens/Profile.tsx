import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { Center, Heading, ScrollView, Skeleton, useToast, VStack } from "native-base";
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { Avatar } from "@components/Avatar";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";

const AVATAR_SIZE = 148

export function Profile() {

  const [isAvatarLoading, setIsAvatarLoading] = useState(false)

  const [avatar, setAvatar] = useState('https://github.com/melquisedeque-magalhaes.png')

  const toast = useToast()

  async function handleAvatarSelect() {
    try {
      setIsAvatarLoading(true)

      const avatarSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true
      })
  
      if(avatarSelected.canceled)
        return

      if(avatarSelected.assets[0].uri){
        const avatarInfo = await FileSystem.getInfoAsync(avatarSelected.assets[0].uri)

        if(avatarInfo.size && (avatarInfo.size / 1024 / 1024) > 5){
          toast.show({
            title: 'Escolha uma imagem de ate 5MB.',
            placement: 'top',
            bgColor: 'red.500'
          })
          return
        }

        setAvatar(avatarSelected.assets[0].uri)
      }
  
    }catch(err) {
      console.log(err)
    }finally {
      setIsAvatarLoading(false)
    }
  }

  return(
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView px={6} mt={5}>

        <Center mb={9}>
          {
            isAvatarLoading ? 
              <Skeleton 
                h={AVATAR_SIZE}
                w={AVATAR_SIZE}
                rounded="full"
                startColor="gray.500"
                endColor="gray.400"
              />
            : 
              <Avatar 
                size={AVATAR_SIZE} 
                source={{ uri: avatar }} 
                alt="avatar do usuário"
              />

          }
          
          <TouchableOpacity onPress={handleAvatarSelect}>
            <Heading mt={3} color="green.500" fontSize="md">Alterar foto</Heading>
          </TouchableOpacity>
        </Center>

        <Input 
          bg="gray.600" 
          placeholder="Name" 
          value="Melqui" 
        />

        <Input 
          bg="gray.600" 
          isDisabled 
          placeholder="E-mail" 
          value="melqui.sodre15@gmail.com" 
        />

        <Heading mb={2} mt={3} color="gray.200" fontSize="md">
          Alterar senha
        </Heading>

        <Input
          bg="gray.600"  
          placeholder="Senha antiga"
          secureTextEntry 
        />

        <Input
          bg="gray.600"  
          placeholder="Nova senha"
          secureTextEntry 
        />

        <Input
          bg="gray.600"  
          placeholder="Confirme nova senha"
          secureTextEntry 
        />

        <Button mt={8} mb={9} title="Atualizar" />
        
      </ScrollView>
    </VStack>
  )
}