import { useCallback, useState } from "react";
import { VStack, SectionList, Heading, Text, useToast } from "native-base";
import { useFocusEffect } from "@react-navigation/native";

import { CardHistory } from "@components/CardHistory";
import { ScreenHeader } from "@components/ScreenHeader";

import { AppError } from "@errors/AppError";
import { api } from "@services/api";
import { Loading } from "@components/Loading";

import { HistoryByDay } from "@typings/historyByDay";

export function History() {
  const toast = useToast()

  const [history, setHistory] = useState<HistoryByDay []>({} as HistoryByDay [])

  const [isLoading, setIsLoading] = useState(true)

  async function historyExercise() {
    try {
      setIsLoading(true)

      const response = await api.get('history')

      setHistory(response.data)
    }catch(error){
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : 'Não foi possível exercício como realizado!'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }finally{
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      historyExercise()
    }, [])
  )

  return(
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      {
        isLoading ? <Loading /> : (
          <SectionList 
            sections={history}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <CardHistory group={item.group} name={item.name} hour={item.hour} />}
            ListEmptyComponent={() => 
              <Text color="gray.100" textAlign="center">
                Não há exercícios registrados ainda.{'\n'}
                Vamos fazer exercícios hoje ?
              </Text>
            }
            contentContainerStyle={
              history.length === 0 && { flex: 1, justifyContent: 'center' }
            }
            renderSectionHeader={({ section }) => 
              <Heading 
                mt={10} 
                mb={3} 
                color="gray.200" 
                fontSize="md"
                fontFamily="heading"
              >
                {section.title}
              </Heading>}
            px={6}
          />
        )
      }      
    </VStack>
  )
}