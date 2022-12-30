import { Image, VStack, Center, ScrollView } from "native-base";

import BackgroundImg from '@assets/background.png'

import { Logo } from "@components/Logo";
import { Title } from "@components/Title";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";

export function SignUp() {

  const { goBack } = useNavigation()

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

        <Input 
          placeholder="Nome"
          autoCapitalize="words"
        />

        <Input 
          placeholder="E-mail"
          keyboardType="email-address" 
          autoCapitalize="none"
        />

        <Input 
          placeholder="Senha"
          secureTextEntry 
        />

        <Input 
          placeholder="Confirme sua senha"
          secureTextEntry 
        />

        <Button title="Criar e acessar" />

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