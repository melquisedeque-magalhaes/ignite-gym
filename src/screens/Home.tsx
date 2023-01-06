import { useCallback, useEffect, useState } from "react";
import { FlatList, Heading, HStack, useToast, VStack } from "native-base";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { CardExercise } from "@components/CardExercise";
import { Group } from "@components/Group";
import { HeaderHome } from "@components/HeaderHome";

import { AppNavigationRoutesProps } from '@routes/app.routes'
import { api } from "@services/api";
import { AppError } from "@errors/AppError";
import { Exercise } from "@typings/exercise";
import { Loading } from "@components/Loading";

export function Home() {
  const [isLoading, setIsLoading] = useState(true)

  const { navigate } = useNavigation<AppNavigationRoutesProps>()


  const toast = useToast()

  const [groupSelected, setGroupSelected] = useState('')
  const [groups, setGroups] = useState<string[]>([])

  const [exercises, setExercises] = useState<Exercise []>([])

  async function getGroupExercise() {
    try {
      const response = await api.get('/groups')

      setGroups(response.data)
      setGroupSelected(response.data[0])
    }catch(error) {
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : 'Não foi possível carregar os grupos de exercícios!'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  async function getExerciseByGroup() {
    try {
      setIsLoading(true)

      const response = await api.get(`/exercises/bygroup/${groupSelected}`)

      setExercises(response.data)
    }catch(error) {
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : 'Não foi possível carregar os exercícios!'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getGroupExercise()
    
  }, [])

  useFocusEffect(
    useCallback(() => { 
      getExerciseByGroup() 
    },[groupSelected])
  )

  return(
    <VStack flex={1} pb={10}>
      <HeaderHome />

      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => 
          <Group 
            isActive={item === groupSelected} 
            name={item} 
            onPress={() => setGroupSelected(item)}
          />
        }
        _contentContainerStyle={{
          px: 8
        }}
        my={10}
        maxH={10}
        minH={10}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      {
        isLoading ? <Loading /> : (
          <VStack px={6}>
            <HStack justifyContent="space-between">
              <Heading 
                color="gray.200" 
                fontFamily="heading" 
                fontSize="md" 
              >
                Exercícios
              </Heading>

              <Heading 
                color="gray.200" 
                fontFamily="heading" 
                fontSize="md"
              >
                {exercises.length}
              </Heading>
            </HStack>

        
            <FlatList 
              data={exercises}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => 
                <CardExercise 
                  title={item.name} 
                  description={item.name}
                  img={item.thumb}
                  onPress={() => navigate('exercise', { id: String(item.id) })} 
                />
              }
              _contentContainerStyle={{
                pb: 20
              }}
              my={3}
              showsVerticalScrollIndicator={false}
            /> 
        </VStack>
       )
      }

      
      
    </VStack>
  )
}