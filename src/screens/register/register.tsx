import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from 'react-native';
import tw from 'twrnc';
import React, {useState} from 'react';
import {useLinkTo} from '@react-navigation/native';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterScreen() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const linkTo = useLinkTo();

  const handleSubmit = () => {
    // Aquí puedes manejar la lógica de envío del formulario
    console.log('Form Data:', formData);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={tw`w-11/12 mx-auto`}>
        <View style={styles.containerLogin}>
          <View style={tw``}>
            <Text style={tw`text-4xl text-center text-cyan-600`}>COACH AI</Text>
          </View>
          <View>
            <Text>Email</Text>
            <TextInput
              onChangeText={text => setFormData({...formData, email: text})}
              value={formData.email}
              style={tw`border-2 border-gray-200 rounded-lg py-1 px-2 my-4`}
            />

            <Text>Password:</Text>
            <TextInput
              onChangeText={text => setFormData({...formData, password: text})}
              value={formData.password}
              secureTextEntry={true}
              style={tw`border-2 border-gray-200 rounded-lg py-1 px-2 my-4`}
            />

            <Text>Confirmar Password:</Text>
            <TextInput
              onChangeText={text =>
                setFormData({...formData, confirmPassword: text})
              }
              value={formData.confirmPassword}
              secureTextEntry={true}
              style={tw`border-2 border-gray-200 rounded-lg py-1 px-2 my-4`}
            />

            <TouchableOpacity
              onPress={handleSubmit}
              style={tw`bg-sky-700 py-2 rounded-lg my-4`}>
              <Text style={tw`text-center text-xl text-white`}>
                Registrarse
              </Text>
            </TouchableOpacity>
          </View>
          <View style={tw``}>
            <Text style={tw`text-center`}>¿Ya tienes cuenta?</Text>
            <TouchableOpacity
              onPress={() => {
                linkTo('/login');
              }}
              style={tw``}>
              <Text style={tw`text-center text-sm my-4 underline`}>
                Ingresa
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  containerLogin: {
    height: '100%',
    justifyContent: 'space-evenly',
  },
});
