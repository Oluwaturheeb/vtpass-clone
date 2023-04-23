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
    fontFamily: 'serif',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  titleMedium: {
    fontFamily: 'serif',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  titleLarge: {
    fontFamily: 'serif',
    fontSize: 22,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 40,
  },
  bodySmall: {
    fontFamily: 'serif',
    fontSize: 10,
    fontWeight: '400',
  },
  bodyMedium: {
    fontFamily: 'serif',
    fontSize: 14,
    fontWeight: '400',
  },
  bodyLarge: {
    fontFamily: 'serif',
    fontSize: 16,
    fontWeight: '400',
  },
  default: 'serif',
};
const theme = {
  ...MD2LightTheme,
  fonts: configureFonts({ config: font, isV3: false }),
  roundness: 5,
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
