import React from 'react';

import{ NavigationContainer } from '@react-navigation/native'; /**este pacote agrupa rotas da navegação e as gerência */
import { createStackNavigator } from '@react-navigation/stack'; /**cria pilha de navegação / */

const Stack = createStackNavigator();

import Home from './pages/Home'
import CreateRecord from './pages/CreateRecord';

const Routes = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator 
                headerMode="none"
                screenOptions={{ /**ele quem está definindo as configurações da home */
                    cardStyle: {
                        backgroundColor: '#0B1F34'
                    }
                }}
            >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="CreateRecord" component={CreateRecord} />
            </Stack.Navigator>{/**encapsula as rotas que vamos programar */}
        </NavigationContainer>
    )
};

export default Routes;