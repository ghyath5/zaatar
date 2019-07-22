import React, {Component} from "react";
import { I18nManager,AsyncStorage,StyleSheet,KeyboardAvoidingView,Button,View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import io from "socket.io-client/dist/socket.io";
import DialogInput from 'react-native-dialog-input';
I18nManager.forceRTL(true);
class Chat extends Component {
    onSend = (messages = [])=>{
      this.socket.emit('msg',messages[0]);
      this.setState(previousState => {
        messages[0].user = {
          name:"Ghyath"
        }
        return {messages: GiftedChat.append(previousState.messages, messages)}
      })
      this.setState({message:""})
    }
    onRec = (msg)=>{
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, msg)
      }))
      
    }
    sendName = (name)=>{
      this.socket.emit('set user',{name},async (user)=>{
        try {
          await AsyncStorage.setItem('@users:id', user.id.toString());
        } catch (error) {
          console.log(error)
        }
      });
      this.setState({isDialogVisible:false})
    }
    showDialog = ()=>{
      this.setState({isDialogVisible:false})
    }
    state = {
      endpoint: "http://192.168.0.106:4001",
      messages:[],
      me:""
    }
    constructor () {
        super();
        this.socket = io(this.state.endpoint,{jsonp:false});
    }
    async componentDidMount() {
        var user =  await AsyncStorage.getItem('@users:id');
        if(user){
          this.showDialog();
        }
        this.socket.on("res",(e)=>{
          this.onRec(e);
        });
    }
    static navigationOptions = {
        header: null,
    };
    render() {
    const {navigate} = this.props.navigation;
      return (
        <View style={{flex:1}}>
        <KeyboardAvoidingView style={{flex:1}} behavior="padding" enabled>
           
          <DialogInput style={{alignItems:"flex-start",textAlign:"right"}} isDialogVisible={this.state.isDialogVisible}
            title={"زعتر يرحب بك"}
            message={"من فضلك ادخل اسمك للمتابعة"}
            hintInput ={"اسمك هنا"}
            submitInput={ (name) => {this.sendName(name)} }
            closeDialog={ () => {this.showDialog()}}>
          </DialogInput>
          <GiftedChat 
            messages={this.state.messages}
            onSend={this.onSend}
            user={this.user}
            isAnimated={true}
          />
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
export default Chat;