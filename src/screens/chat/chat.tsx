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
} from 'react-native';
import tw from 'twrnc';
import React, {useState, useEffect} from 'react';
import {useLinkTo} from '@react-navigation/native';
import {io, Socket} from 'socket.io-client';
import socketService from '../../utils/helper';

interface Message {
  message: string;
}

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [data, setData] = useState<Message[]>([]);

  useEffect(() => {
    socketService.on('received_message', (args: string) => {
      console.log('received_message', args);
      setData([...data, {message: args}]);
    });
  }, []);

  useEffect(() => {
    console.log(data);
    console.log('Message-->', message);
  }, [data, message]);

  useEffect(() => {
    socketService.initializeSocket();
  }, []);

  const handleSendMessage = (message: string) => {
    socketService.emit('send_message', message);
    setData([...data, {message}]);
  };

  const linkTo = useLinkTo();

  return (
    <SafeAreaView style={tw`w-11/12 mx-auto`}>
      <View style={styles.containerLogin}>
        {data.map((val, i) => {
          return (
            <View key={i}>
              <Text>{val.message}</Text>
            </View>
          );
        })}
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
});
