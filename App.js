import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import DashboardScreen from "./screens/DashboardScreen";
import FarmersScreen from './screens/FarmersScreen';
import FarmersListScreen from './screens/FarmersListScreen';
import AddFarmerScreen from './screens/AddFarmerScreen';
import BiomassDeliveryScreen from './screens/BiomassDeliveryScreen';
import SubmissionSuccessScreen from './screens/SubmissionSuccessScreen';
import ProductionScreen from './screens/ProductionScreen';
import BiocharEndUseScreen from './screens/BiocharEndUseScreen';
import ApplicationScreen from './screens/ApplicationScreen';
import MixingScreen from './screens/MixingScreen';
import InvoicingScreen from './screens/BioCharIvoicingScreen';
import MoistureContentScreen from './screens/MoistureContentScreen';
import DryOvenScreen from './screens/InternalScreens/DryOvenScreen';
import BulkDensityScreen from './screens/InternalScreens/BulkDensityScreen';
import MeterScreen from './screens/InternalScreens/MeterScreen';
import ReceiptScreen from './screens/ReceiptScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="FarmersScreen" component={FarmersScreen} />
        <Stack.Screen name="FarmersList" component={FarmersListScreen} />
        <Stack.Screen name="AddFarmer" component={AddFarmerScreen} />
        <Stack.Screen name="BiomassDelivery" component={BiomassDeliveryScreen} />
        <Stack.Screen name="SubmissionSuccess" component={SubmissionSuccessScreen} />
        <Stack.Screen name="Production" component={ProductionScreen} />
        <Stack.Screen name="BiocharEndUse" component={BiocharEndUseScreen} />
        <Stack.Screen name="Application" component={ApplicationScreen} />
        <Stack.Screen name="Mixing" component={MixingScreen} />
        <Stack.Screen name="Invoicing" component={InvoicingScreen} />
        <Stack.Screen name="MoistureContent" component={MoistureContentScreen} />
        <Stack.Screen name="DryOven" component={DryOvenScreen} />
        <Stack.Screen name="BulkDensity" component={BulkDensityScreen} />
        <Stack.Screen name="Meter" component={MeterScreen} />
        <Stack.Screen name="Receipt" component={ReceiptScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
