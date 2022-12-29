import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'

export default function App() {

  const [isFontsLoaded] = useFonts({
    Roboto_400Regular, 
    Roboto_700Bold
  })

  return (
    <View>
      <StatusBar 
        style='light'
        backgroundColor='transparent'
        translucent
      />
      {isFontsLoaded ? <Text>Hello World!</Text> : <Text>Carregando...</Text>}
    </View>
  );
}

