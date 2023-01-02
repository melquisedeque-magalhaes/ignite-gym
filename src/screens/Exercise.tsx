import { TouchableOpacity } from "react-native";
import { Heading, HStack, Icon, Text, VStack, Image, ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons'

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'

import { Button } from "@components/Button";

export function Exercise() {

  const { goBack } = useNavigation()

  return(

    <VStack flex={1}>
     
        <VStack px={8} bg="gray.600" pt={12} pb={8}>

          <TouchableOpacity onPress={goBack}>
            <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
          </TouchableOpacity>

          <HStack mt={3} justifyContent="space-between" alignItems="center">
            <Heading flexShrink={1} color="gray.100" fontSize="lg" fontFamily="heading">
                Puxada frontal
            </Heading>

            <HStack>
              <BodySvg />
              <Text color="gray.200" ml={1} textTransform="capitalize">
                Costas
              </Text>
            </HStack>
          </HStack>
          
        </VStack>

        <ScrollView pb={10}>
          <VStack px={6} mt={8}>
            <Image 
              source={{
                uri: 'http://conteudo.imguol.com.br/c/entretenimento/35/2019/04/09/pulley-frente-1554824315336_v2_1254x837.jpg'
              }}
              resizeMode="cover"
              w={364}
              h={364}
              alt="Puxada frontal"
              rounded="md"
            />

            <VStack p={4} rounded="md" h={33} justifyContent="center" mt={3} w="full" bg="gray.600">

              <HStack flex={1} alignItems="center" justifyContent="space-between">
                <HStack>
                  <SeriesSvg />
                  <Text ml={2} color="gray.200" fontSize="lg" flexShrink={1}>3 séries</Text>
                </HStack>

                <HStack>
                  <RepetitionsSvg />
                  <Text ml={2} color="gray.200" fontSize="lg" flexShrink={1}>12 repetições</Text>
                </HStack>
              </HStack>
              
              <Button title="Marcar como realizado" />
            </VStack>

          </VStack>
        </ScrollView>
      
    </VStack>
  )
}