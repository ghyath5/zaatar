import React, {Component} from "react";
import { I18nManager,KeyboardAvoidingView,Text,Button,View,StyleSheet} from 'react-native';
import io from "socket.io-client/dist/socket.io";
I18nManager.forceRTL(true);
class Setting extends Component {
   
    state = {
      endpoint: "http://192.168.0.106:4001",
    }
    constructor () {
        super();
        this.socket = io(this.state.endpoint,{jsonp:false});
    }
    async componentDidMount() {
      
    }
    render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={{flex:1}}>
        <KeyboardAvoidingView style={{flex:1}} behavior="padding" enabled>
           
         <Text>Setting</Text>
        </KeyboardAvoidingView>
        <View style={styles.container}>
            <View style={styles.button}>
                <Button 
                    title="المحادثة"
                    onPress={() => navigate('Chat', {name: 'Jane'})}
                />
            </View>
            <View style={styles.button}>
                <Button 
                    title="علمني"
                    onPress={() => navigate('Setting', {name: 'Jane'})}
                />
            </View>
         </View>
        </View>
      );
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
      backgroundColor: 'green',
      width: '50%',
    }
  });
export default Setting;