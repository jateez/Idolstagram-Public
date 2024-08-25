import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackScreen from './StackScreen';
import { useEffect, useState, useContext } from "react";
import * as SecureStore from "expo-secure-store"
import { AuthContext } from '../contexts/authContext';
import LoadingScreen from '../components/LoadingScreen';

export default function MainStack(props) {
  const { isSignedIn, setIsSignedIn } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    SecureStore.getItemAsync("access_token").then(token => {
      if (token) {
        setIsSignedIn(true)
      }
    })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <>
        <LoadingScreen />
      </>
    )
  }

  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer>
          <StackScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  )
};
