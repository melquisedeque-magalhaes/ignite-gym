import { Image, VStack, Center, ScrollView } from "native-base";

import BackgroundImg from '@assets/background.png'
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import { Logo } from "@components/Logo";
import { Title } from "@components/Title";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

type InputsTypes = {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

export function SignUp() {

  const { goBack } = useNavigation()

  const { control, handleSubmit } = useForm<InputsTypes>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      passwordConfirm: ''
    }
  })

  function handleCreateAccount(inputs: InputsTypes){
    console.log(inputs)
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
          render={({ field: { onChange, value } }) => (
            <Input 
              placeholder="Nome"
              autoCapitalize="words"
              onChangeText={onChange}
              value={value}
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
            />
          )}
        />

        <Button title="Criar e acessar" onPress={handleSubmit(handleCreateAccount)} />

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