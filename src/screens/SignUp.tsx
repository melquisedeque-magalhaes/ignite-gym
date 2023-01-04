import { useState } from "react";
import { Image, VStack, Center, ScrollView, useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'

import BackgroundImg from '@assets/background.png'

import { Logo } from "@components/Logo";
import { Title } from "@components/Title";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { signUpSchema } from "@validators/signUpSchema"

import { api } from "@services/api";

import { AppError } from "@errors/AppError";

import { useAuth } from "@hooks/useAuth";

type InputsTypes = {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

export function SignUp() {

  const [isLoading, setIsLoading] = useState(false)

  const { goBack } = useNavigation()

  const toast = useToast()

  const { signIn } = useAuth()

  const { control, handleSubmit, formState: { errors } } = useForm<InputsTypes>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      passwordConfirm: ''
    },
    resolver: yupResolver(signUpSchema)
  })

  async function handleCreateAccount({ email, name, password }: InputsTypes){
    try {
      setIsLoading(true)
      await api.post('/users', {
        name,
        email,
        password
      })

      await signIn({ email, password })
    }catch(error) {
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : 'Não foi possivel criar a conta. tente novamente mais tarde!'
      
      toast.show({
        title: title,
        placement: 'top',
        bgColor: 'red.500'
      })
      
    }finally {
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
            Crie sua conta
          </Title>
        </Center>

        <Controller
          name="name"
          control={control} 
          rules={{
            required: 'Digite um nome!'
          }}
          render={({ field: { onChange, value } }) => (
            <Input 
              placeholder="Nome"
              autoCapitalize="words"
              onChangeText={onChange}
              value={value}
              erroMessage={errors.name?.message}
            />
          )}
        />
        
        <Controller
          name="email"
          control={control} 
          render={({ field: { onChange, value } }) => (
              <Input 
                placeholder="E-mail"
                keyboardType="email-address" 
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
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

        <Controller
          name="passwordConfirm"
          control={control} 
          render={({ field: { onChange, value } }) => (
            <Input 
              placeholder="Confirme sua senha"
              secureTextEntry
              onChangeText={onChange}
              value={value}
              erroMessage={errors.passwordConfirm?.message}
              onSubmitEditing={handleSubmit(handleCreateAccount)}
              returnKeyType="send"
            />
          )}
        />

        <Button 
          title="Criar e acessar" 
          onPress={handleSubmit(handleCreateAccount)} 
          isLoading={isLoading} 
        />

        <Button 
          onPress={() => goBack()} 
          mt={16} 
          title="Voltar para o login" 
          variant="outline" 
        />
  
      </VStack>
    </ScrollView>
  )
}