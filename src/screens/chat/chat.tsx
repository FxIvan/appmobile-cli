import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
  ScrollView,
} from 'react-native';
import tw from 'twrnc';
import React, {useState, useEffect, useRef} from 'react';
import {useLinkTo} from '@react-navigation/native';
import socketService from '../../utils/helper';

interface Message {
  id: number;
  message: string;
}

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [data, setData] = useState<Message[]>([]);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    socketService.initializeSocket();
  }, []);

  //useEffect(() => {
  socketService.on('received_message', (args: string) => {
    try {
      //setData(prevData => [...prevData, {id: Date.now(), message: args}]);
      setData([...data, {id: Date.now(), message: args}]); //asi funciona pero lento
    } catch (error) {
      console.log('error', error);
    }
  });
  //},[]);

  const handleSendMessage = (message: string) => {
    socketService.emit('send_message', message);
    setMessage('');
    scrollViewRef.current?.scrollToEnd({animated: true});
  };

  const linkTo = useLinkTo();

  return (
    <SafeAreaView style={tw`w-11/12 py-4 mx-auto`}>
      <View style={styles.containerLogin}>
        <ScrollView
          contentContainerStyle={styles.messagesContainer}
          ref={scrollViewRef}>
          {data.map((val, id) => (
            <View key={id} style={styles.message}>
              <Text>{val.message}</Text>
            </View>
          ))}
        </ScrollView>
        <TextInput
          value={message}
          onChangeText={text => setMessage(text)}
          style={tw`border-2 border-gray-200 rounded-lg py-1 px-2 my-4`}
        />
        <Button title="Send" onPress={() => handleSendMessage(message)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerLogin: {
    height: '100%',
    justifyContent: 'space-evenly',
  },
  messagesContainer: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  message: {
    backgroundColor: '#ECECEC',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
});
