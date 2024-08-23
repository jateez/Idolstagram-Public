import AuthProvider from "./contexts/authContext"
import { ApolloProvider } from '@apollo/client';
import client from './config/apollo';
import MainStack from './navigators/MainStack';

export default function App() {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <MainStack />
      </ApolloProvider>
    </AuthProvider>
  );
}
