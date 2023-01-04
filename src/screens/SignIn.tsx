import { Image, VStack, Center, Text, ScrollView, useToast } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";

import BackgroundImg from '@assets/background.png'

import { Logo } from "@components/Logo";
import { Title } from "@components/Title";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { AuthNavigationRoutesProps } from "@routes/auth.routes";
import { useAuth } from "@hooks/useAuth";
import { signInSchema } from "@validators/signInSchema";
import { AppError } from "@errors/AppError";
import { useState } from "react";

type InputTypes = {
  email: string
  password: string
}

export function SignIn() {

  const [isLoading, setIsLoading] = useState(false)

  const { navigate } = useNavigation<AuthNavigationRoutesProps>()

  const toast = useToast()

  const { control, handleSubmit, formState: { errors } } = useForm<InputTypes>({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { signIn } = useAuth()

  async function handleSignIn({ email, password }:InputTypes) {
    try {
      setIsLoading(true)
      await signIn({ email, password })
    }catch(error){
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde!'
      
      toast.show({
        title: title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }finally{
      setIsLoading(false)
    }
  }

  return(
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} px={6} pb={10}>
        <Image 
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <Logo />

        <Center mb={6}>
          <Title>
            Acesse sua conta
          </Title>
        </Center>

        <Controller
          name="email" 
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input 
              placeholder="E-mail"
              keyboardType="email-address" 
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
              erroMessage={errors.email?.message}
            />
          )}
        />
        
        <Controller
          name="password" 
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input 
              placeholder="Senha"
              secureTextEntry
              onChangeText={onChange}
              value={value} 
              erroMessage={errors.password?.message}
            />
          )}
        />

        <Button isLoading={isLoading} onPress={handleSubmit(handleSignIn)} title="Acessar" />

        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Ainda não tem acesso?
          </Text>
          <Button onPress={() => navigate('signUp')} title="Criar conta" variant="outline" />
        </Center>
   
      </VStack>
    </ScrollView>
  )
}