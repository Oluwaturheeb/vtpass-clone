import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import {
  Provider as PaperProvider,
  configureFonts,
  MD2LightTheme,
} from 'react-native-paper';
import { pry } from './components/styles';

const font = {
  titleSmall: {
    fontFamily: 'san-serif',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  titleMedium: {
    fontFamily: 'san-serif',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  titleLarge: {
    fontFamily: 'san-serif',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0,
    lineHeight: 40,
  },
  bodySmall: {
    fontFamily: 'san-serif',
    fontSize: 10,
    fontWeight: '400',
  },
  bodyMedium: {
    fontFamily: 'san-serif',
    fontSize: 12,
    fontWeight: '400',
  },
  bodyLarge: {
    fontFamily: 'san-serif',
    fontSize: 14,
    fontWeight: '400',
  },
  default: 'san-serif',
};
const theme = {
  ...MD2LightTheme,
  fonts: configureFonts({ config: font, isV3: true }),
  roundness: 3,
  colors: {
    ...MD2LightTheme.colors,
    primary: pry,
    text: pry,
  },
};

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);
