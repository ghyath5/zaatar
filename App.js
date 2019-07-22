import {createStackNavigator, createAppContainer} from 'react-navigation';
import Chat from './Chat.js';
import Setting from './Setting.js';
const MainNavigator = createStackNavigator({
  Chat: {screen: Chat},
  Setting: {screen: Setting},
});

const App = createAppContainer(MainNavigator);

export default App;