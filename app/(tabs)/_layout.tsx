import { Tabs } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';


function TabsLayout() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <Tabs>
        <Tabs.Screen name='index' options={{headerShown: false}}/>
        <Tabs.Screen name='Stats' options={{headerShown: false}}/>
      </Tabs>
    </SafeAreaProvider>
  );
}

export default TabsLayout;