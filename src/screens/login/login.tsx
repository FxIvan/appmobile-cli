import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

export default function LoginScreen() {
  const backgroundStyle =
    'bg-neutral-300 dark:bg-slate-900 text-black text-9xl';
  return (
    <SafeAreaView>
      <View>
        <Text className={backgroundStyle}>LoginScreen</Text>
      </View>
    </SafeAreaView>
  );
}
