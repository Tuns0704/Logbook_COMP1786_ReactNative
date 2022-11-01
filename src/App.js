import React, { useEffect } from 'react';
// import { initDatabase } from "./services/db-service";
import { DbContextProvider } from "./context/DbContext";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, AddImage } from "./screens";

const Stack = createStackNavigator();

const App = () => {

  // useEffect(function () {
  //   async function init() {
  //     await initDatabase();
  //   }
  //   init();
  // }, []);

  return (
    <DbContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddImage" component={AddImage} />
        </Stack.Navigator>
      </NavigationContainer>
    </DbContextProvider>
  );
};

export default App;
