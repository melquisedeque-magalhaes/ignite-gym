import { Heading, HStack, Icon, Image, Text, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from '@expo/vector-icons'

interface CardExerciseProps extends TouchableOpacityProps {
  title: string
  description: string
}

export function CardExercise({ title, description, ...rest }: CardExerciseProps) {
  return(
    <TouchableOpacity {...rest}>
      <HStack 
        borderRadius="md" 
        p={2} 
        bg="gray.500" 
        w="full" 
        h={20} 
        alignItems="center" 
        mb={3}
      >

        <Image 
          source={{
            uri: 'http://conteudo.imguol.com.br/c/entretenimento/35/2019/04/09/pulley-frente-1554824315336_v2_1254x837.jpg'
          }}
          resizeMode="cover"
          w={16}
          h={16}
          alt={title}
          rounded="md"
          mr={4}
        />

        <VStack flex={1}>
          <Heading color="white" fontSize="lg" fontFamily="heading">
            {title}
          </Heading>
          <Text color="gray.200" fontFamily="body" fontSize="sm" numberOfLines={2}>
            {description}
          </Text>
        </VStack>

        <Icon 
          as={Entypo}
          name="chevron-thin-right"
          color="gray.300"
          size={6}
        />
        
      </HStack>
    </TouchableOpacity>
  )
}