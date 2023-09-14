import { StyleSheet} from 'react-native';
import Main from './Main';
import {Provider} from 'react-redux'
import { store } from './redux/store';
import {StripeProvider} from '@stripe/stripe-react-native'

const stripeKey = "pk_test_51N2bpFSFQdK5YZZ7RWz9TZPM6NVt22XnOp1LQon6o7Vq5OuHrDzY6EYACPNyMat9nvVFFqdg2pLpKqx7dQO7GjD400dZVrD9Vf"
export default function App() {
  return (

    <StripeProvider threeDSecureParams={{
      backgroundColor: "#fff",
      timeout:5,

    }} merchantIdentifier='jumma-programmer.com' publishableKey={stripeKey}>
      <Provider store={store}>
      <Main />
    </Provider>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
