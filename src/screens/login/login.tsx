import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from 'twrnc';
import React, {useState} from 'react';

interface FormData {
  password: string;
  email: string;
}

export default function LoginScreen() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [rememberme, setRememberme] = useState<boolean>(false);

  const handleSubmit = () => {
    // Aquí puedes manejar la lógica de envío del formulario
    console.log('Form Data:', formData);
    console.log('Remember me:', rememberme)
  };

  return (
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
          <View style={tw`flex flex-row items-center justify-between`}>
            <View style={tw`flex flex-row justify-center items-center`}>
              <TouchableOpacity
                style={tw`border-2 border-gray-200 rounded-lg py-2 px-2 mx-2 my-4 ${rememberme ? 'bg-emerald-700' : ''}`}
                onPress={() =>
                  setRememberme(!rememberme)
                }></TouchableOpacity>
              <Text style={tw`text-center`}>Recordame</Text>
            </View>
            <Text style={tw`text-center text-blue-500`}>
              ¿Olvidaste tu contraseña?
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleSubmit}
            style={tw`bg-sky-700 py-2 rounded-lg my-4`}>
            <Text style={tw`text-center text-xl text-white`}>
              Iniciar Sesión
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tw``}>
          <Text style={tw`text-center`}>¿Todavia no tienes una cuenta?</Text>
          <TouchableOpacity
            onPress={() => console.log('Crear cuenta')}
            style={tw``}>
            <Text style={tw`text-center text-sm my-4 underline`}>
                Crea una ahora
            </Text>
          </TouchableOpacity>
        </View>
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
