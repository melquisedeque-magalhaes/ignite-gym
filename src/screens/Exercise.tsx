import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Heading, HStack, Icon, Text, VStack, Image, ScrollView, useToast, Box } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons'

import { Button } from "@components/Button";
import { Loading } from "@components/Loading";

import { AppError } from "@errors/AppError";
import { AppNavigationRoutesProps } from "@routes/app.routes";

import { api } from "@services/api";

import { Exercise as ExerciseType} from "@typings/exercise";

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'

interface RouteParams {
  id: string
}

export function Exercise() {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingExerciseFinished, setIsLoadingExerciseFinished] = useState(false)

  const [exercise, setExercise] = useState<ExerciseType>({} as ExerciseType)

  const toast = useToast()

  const routes = useRoute()

  const { id } = routes.params as RouteParams

  const { goBack, navigate } = useNavigation<AppNavigationRoutesProps>()


  async function getExercise() {
    try {
      setIsLoading(true)
      const response = await api.get(`/exercises/${id}`)

      setExercise(response.data)
    }catch(error) {
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : 'Não foi possível carregar o exercício!'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }finally{
      setIsLoading(false)
    }
  }

  async function handleFinishExercise() {
    try {
      setIsLoadingExerciseFinished(true)

      await api.post('history', {
        exercise_id: id
      })

      toast.show({
        title: 'Exercício marcado como realizado com sucesso!',
        placement: 'top',
        bgColor: 'green.700'
      })

      navigate('history')
    }catch(error){
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : 'Não foi possível exercício como realizado!'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }finally{
      setIsLoadingExerciseFinished(false)
    }
  }

  useEffect(() => {
    getExercise()
  }, [id])

  if(isLoading){
    return <Loading />
  }

  return(
    <VStack flex={1}>
     
        <VStack px={8} bg="gray.600" pt={12} pb={8}>

          <TouchableOpacity onPress={goBack}>
            <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
          </TouchableOpacity>

          <HStack mt={3} justifyContent="space-between" alignItems="center">
            <Heading flexShrink={1} color="gray.100" fontSize="lg" fontFamily="heading">
                {exercise.name}
            </Heading>

            <HStack>
              <BodySvg />
              <Text color="gray.200" ml={1} textTransform="capitalize">
                {exercise.group}
              </Text>
            </HStack>
          </HStack>
          
        </VStack>

        <ScrollView>
          <VStack px={6} mt={8} pb={10}>
            <Box rounded="lg" overflow="hidden">
              <Image 
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`
                }}
                resizeMode="cover"
                w={364}
                h={364}
                alt={exercise.name}
                rounded="lg"
              />
            </Box>

            <VStack p={4} rounded="md" h={33} justifyContent="center" mt={3} w="full" bg="gray.600">

              <HStack flex={1} alignItems="center" justifyContent="space-between">
                <HStack>
                  <SeriesSvg />
                  <Text 
                    ml={2} 
                    color="gray.200" 
                    fontSize="lg" 
                    flexShrink={1}
                  >
                    {exercise.series} séries
                  </Text>
                </HStack>

                <HStack>
                  <RepetitionsSvg />
                  <Text 
                    ml={2} 
                    color="gray.200" 
                    fontSize="lg" 
                    flexShrink={1}
                  >
                    {exercise.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>
              
              <Button 
                title="Marcar como realizado" 
                onPress={handleFinishExercise} 
                isLoading={isLoadingExerciseFinished} 
              />
            </VStack>

          </VStack>
        </ScrollView>
      
    </VStack>
  )
}