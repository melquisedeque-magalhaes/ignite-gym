import { CardExercise } from "@components/CardExercise";
import { Group } from "@components/Group";
import { HeaderHome } from "@components/HeaderHome";
import { FlatList, Heading, HStack, VStack } from "native-base";
import { useState } from "react";

export function Home() {

  const exercisesData = [{ id: '1', name: 'Puxada frontal', description: '3 séries x 12 repetições' }]

  const [groupSelected, setGroupSelected] = useState('Costas')
  const [groups, setGroups] = useState(['Costas', 'Bíceps', 'Tríceps', 'ombro'])

  const [exercises, setExercises] = useState(exercisesData)

  return(
    <VStack flex={1}  pb={10}>
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
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <VStack px={6}>
        <HStack>
          <Heading 
            color="gray.200" 
            fontFamily="heading" 
            fontSize="md" 
            flex={1}
          >
            Exercícios
          </Heading>

          <Heading 
            color="gray.200" 
            fontFamily="heading" 
            fontSize="md"
          >
            4
          </Heading>
        </HStack>

        <FlatList 
          data={exercises}
          keyExtractor={item => item.id}
          renderItem={({ item }) => 
            <CardExercise 
              title={item.name} 
              description={item.description} 
            />
          }
          my={3}
          showsVerticalScrollIndicator={false}
        />
      </VStack>

      
      
    </VStack>
  )
}