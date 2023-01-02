import { VStack, SectionList, Heading, Text } from "native-base";

import { CardHistory } from "@components/CardHistory";
import { ScreenHeader } from "@components/ScreenHeader";
import { useState } from "react";

export function History() {

  const data = [
    {
      title: '26.08.22',
      data: ['Costas', 'Puxada frontal']
    },
    {
      title: '25.08.22',
      data: ['Costas']
    }
  ]

  const [history, setHistory] = useState(data)

  return(
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList 
        sections={history}
        keyExtractor={item => item}
        renderItem={({ item }) => <CardHistory />}
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
    </VStack>
  )
}