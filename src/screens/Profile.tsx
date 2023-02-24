import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Center, Heading, ScrollView, Skeleton, useToast, VStack } from "native-base";
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { Avatar } from "@components/Avatar";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { useAuth } from "@hooks/useAuth";

import defaultAvatar from '@assets/userPhotoDefault.png'

import { api } from "@services/api";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileUpdateSchema } from "@validators/profileUpdateSchema";

import { AppError } from "@errors/AppError";

const AVATAR_SIZE = 148

interface ProfileForm {
  name: string
  email: string
  old_password: string
  new_password: string
  confirm_password: string
}

export function Profile() {
  const { user, updateUser } = useAuth()

  const [isAvatarLoading, setIsAvatarLoading] = useState(false)

  const [avatar, setAvatar] = useState<string | null>(`${api.defaults.baseURL}/avatar/${user.avatar}`)
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  const { control, handleSubmit, formState: { errors }, setError } = useForm<ProfileForm>({
    defaultValues: {
      name: user.name,
      email: user.email
    },
    resolver: yupResolver(profileUpdateSchema)
  })

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

        const fileExtension = avatarSelected.assets[0].uri.split('.').pop()

        const photoFile = {
          name: `${user.name.trim()}.${fileExtension}`.toLocaleLowerCase(),
          uri: avatarSelected.assets[0].uri,
          type: `${avatarSelected.assets[0].type}/${fileExtension}`
        } as any

        const avatarFormData = new FormData()

        avatarFormData.append('avatar', photoFile)

        const userDataUpdated = await api.patch('/users/avatar', avatarFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        const nameAvatar = userDataUpdated.data.avatar

        toast.show({
          title: 'Avatar atualizado com sucesso!',
          placement: 'top',
          bgColor: 'green.500'
        })

        setAvatar(avatarSelected.assets[0].uri)

        await updateUser({...user, avatar: nameAvatar }) 
      }
  
    }catch(err) {
      console.log(err)
    }finally {
      setIsAvatarLoading(false)
    }
  }

  async function handleProfileUpdate({ confirm_password, name, new_password, old_password }: ProfileForm) {
    try {
      setIsLoading(true)

      await api.put('/users', {
        name,
        old_password,
        password: new_password
      })

      toast.show({
        title: 'Informações atualizadas com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
      })

      await updateUser({...user, name })      
    }catch(error) {
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : 'Não foi possível atualizar as informações do usuário'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }finally{
      setIsLoading(false)
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
                source={ 
                  avatar ? 
                  { uri: avatar } 
                  : defaultAvatar 
                } 
                alt="avatar do usuário"
              />

          }
          
          <TouchableOpacity onPress={handleAvatarSelect}>
            <Heading mt={3} color="green.500" fontFamily="heading" fontSize="md">Alterar foto</Heading>
          </TouchableOpacity>
        </Center>

        <Controller 
          name="name"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input 
              bg="gray.600" 
              placeholder="Name" 
              value={value} 
              onChangeText={onChange}
              erroMessage={errors.name?.message}
            />
          )}
        />

        <Controller 
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input 
                bg="gray.600" 
                isDisabled 
                placeholder="E-mail" 
                value={value} 
                onChangeText={onChange}
              />
            )}
          />
      

        <Heading mb={2} mt={3} color="gray.200" fontFamily="heading" fontSize="md">
          Alterar senha
        </Heading>

        <Controller 
          name="old_password"
          control={control}
          render={({ field: { onChange } }) => (
            <Input
              bg="gray.600"  
              placeholder="Senha antiga"
              secureTextEntry 
              onChangeText={onChange}
            />
          )}
        />


        <Controller 
          name="new_password"
          control={control}
          render={({ field: { onChange } }) => (
            <Input
              bg="gray.600"  
              placeholder="Nova senha"
              secureTextEntry 
              onChangeText={onChange}
              erroMessage={errors.new_password?.message}
            />
          )}
        />

        <Controller 
          name="confirm_password"
          control={control}
          render={({ field: { onChange } }) => (
            <Input
              bg="gray.600"  
              placeholder="Confirme nova senha"
              secureTextEntry 
              onChangeText={onChange}
              erroMessage={errors.confirm_password?.message}
              onSubmitEditing={handleSubmit(handleProfileUpdate)}
              returnKeyType="send"
            />
          )}
        />

        <Button 
          mt={8} 
          mb={9} 
          title="Atualizar" 
          onPress={handleSubmit(handleProfileUpdate)} 
          isLoading={isLoading}
        />
        
      </ScrollView>
    </VStack>
  )
}