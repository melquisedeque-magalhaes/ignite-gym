import { Heading, HStack, Icon, Image, Text, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from '@expo/vector-icons'

import { api } from "@services/api";

interface CardExerciseProps extends TouchableOpacityProps {
  title: string
  description: string
  img: string
}

export function CardExercise({ title, description, img, ...rest }: CardExerciseProps) {
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
          source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${img}`}}
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