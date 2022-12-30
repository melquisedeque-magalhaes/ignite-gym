import { useState } from "react";
import { FlatList, Heading, HStack, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { CardExercise } from "@components/CardExercise";
import { Group } from "@components/Group";
import { HeaderHome } from "@components/HeaderHome";

import { AppNavigationRoutesProps } from '@routes/app.routes'


export function Home() {

  const { navigate } = useNavigation<AppNavigationRoutesProps>()

  const exercisesData = [{ id: '1', name: 'Puxada frontal', description: '3 séries x 12 repetições' }]

  const [groupSelected, setGroupSelected] = useState('Costas')
  const [groups, setGroups] = useState(['Costas', 'Bíceps', 'Tríceps', 'ombro'])

  const [exercises, setExercises] = useState(exercisesData)

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
          keyExtractor={item => item.id}
          renderItem={({ item }) => 
            <CardExercise 
              title={item.name} 
              description={item.description}
              onPress={() => navigate('exercise')} 
            />
          }
          _contentContainerStyle={{
            pb: 20
          }}
          my={3}
          showsVerticalScrollIndicator={false}
        />
      </VStack>

      
      
    </VStack>
  )
}