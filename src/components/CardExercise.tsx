import { Heading, HStack, Icon, Image, Text, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'

interface CardExerciseProps extends TouchableOpacityProps {
  title: string
  description: string
}

export function CardExercise({ title, description, ...rest }: CardExerciseProps) {
  return(
    <TouchableOpacity {...rest}>
      <HStack borderRadius="md" p={2} bg="gray.500" w="full" h={20}>

        <Image 

        />

        <VStack>
          <Heading color="white" fontSize="lg" fontFamily="heading">
            {title}
          </Heading>
          <Text color="gray.200" fontFamily="body" fontSize="sm">
            {description}
          </Text>
        </VStack>

        <Icon 
          as={MaterialIcons}
          name="caret-right"
        />
        
      </HStack>
    </TouchableOpacity>
  )
}