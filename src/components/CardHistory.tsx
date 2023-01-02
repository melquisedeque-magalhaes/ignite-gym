import { Heading, HStack, Text, VStack } from "native-base";

export function CardHistory() {
  return(
    <HStack 
      w="full" 
      px={5} 
      mb={3}
      bg="gray.600" 
      rounded="md" 
      alignItems="center" 
      justifyContent="space-between"
      h={20}
    >
      <VStack flex={1}>
        <Heading fontFamily="heading" color="white" fontSize="md" numberOfLines={1} textTransform="capitalize">
          Costas
        </Heading>
        <Text color="gray.100" fontSize="lg" numberOfLines={1}>
          Puxada frontal
        </Text>
      </VStack>

      <Text color="gray.300" fontSize="md">
        08:56
      </Text>
    </HStack>
  )
}