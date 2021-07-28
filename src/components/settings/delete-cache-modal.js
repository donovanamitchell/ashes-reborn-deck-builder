import React, {useContext, useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View, Modal, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MultiSelectBox from '../util/multi-select-box';

const DeleteCacheModal = ({
  releaseData,
  modalVisible,
  setModalVisible,
  deleteReleases,
}) => {
  const [releasesToDelete, setReleasesToDelete] = useState([]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}>
      <Pressable
        style={styles.centeredView}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalView}>
          <Text>
            All data for the selected packs, including images, will be deleted
            from the cache and re-downloaded.
          </Text>
          <View style={styles.selectBoxView}>
            <MultiSelectBox
              data={releaseData}
              value={releasesToDelete}
              onChangeValue={items => setReleasesToDelete(items)}
            />
          </View>
          <View style={styles.buttonGroup}>
            <View style={styles.buttonView}>
              <Button
                title="Delete Data"
                onPress={() => {
                  deleteReleases(releasesToDelete);
                  setReleasesToDelete([]);
                  setModalVisible(!modalVisible);
                }}
              />
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Cancel"
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  selectBoxView: {
    marginTop: 15,
    marginBottom: 15,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  buttonView: {
    width: '50%',
    padding: 5,
  },
  centeredView: {
    flex: 1,
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default DeleteCacheModal;
