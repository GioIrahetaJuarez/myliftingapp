import { useRouter } from 'expo-router';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SplitSetter from './(tabs)/SplitSetter';

const MyModal = () => {
    const router = useRouter();
  return (
    <View>
      <Modal>
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <SplitSetter/>
            <TouchableOpacity onPress={() => router.back()}>
            <Text>Exit</Text>
          </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',  // ← darkens background
    justifyContent: 'center',             // ← centers vertically
    alignItems: 'center',                 // ← centers horizontally
  },
  popup: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    height: '90%',
    }
});


export default MyModal;