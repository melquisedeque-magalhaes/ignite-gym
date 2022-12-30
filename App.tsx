import { StatusBar } from 'expo-status-bar';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { NativeBaseProvider } from 'native-base';

import { Loading } from '@components/Loading';
import { THEME } from './src/theme';
import { Routes } from '@routes/index';

export default function App() {

  const [isFontsLoaded] = useFonts({
    Roboto_400Regular, 
    Roboto_700Bold
  })

  return (
    <NativeBaseProvider theme={THEME}>
        <StatusBar 
          style='light'
          backgroundColor='transparent'
          translucent
        />
        {isFontsLoaded ? <Routes /> : <Loading />}
    </NativeBaseProvider>
  );
}

