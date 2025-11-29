import React from 'react';
import { SafeAreaView, Platform, StatusBar, View } from 'react-native';


const AppLayout = ({ children, style }) => {
  return (
    <View style={[{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }, style]}>
      <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
    </View>
  );
};


// Exports
export default AppLayout;
