import { Image, VStack, Center, Text, ScrollView } from "native-base";

import BackgroundImg from '@assets/background.png'

import { Logo } from "@components/Logo";
import { Title } from "@components/Title";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigationRoutesProps } from "@routes/auth.routes";

export function SignIn() {

  const { navigate } = useNavigation<AuthNavigationRoutesProps>()

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

        <Input 
          placeholder="E-mail"
          keyboardType="email-address" 
          autoCapitalize="none"
        />
        <Input 
          placeholder="Senha"
          secureTextEntry 
        />

        <Button title="Acessar" />

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