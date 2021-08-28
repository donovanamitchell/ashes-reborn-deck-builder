import React, {useState} from 'react';
import {StyleSheet, FlatList, View, Modal, Text, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';

const SelectBox = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const {colors} = useTheme();

  return (
    <View style={props.style}>
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
          <View
            style={[styles.modalView, {backgroundColor: colors.background}]}>
            <FlatList
              data={props.data}
              renderItem={({item}) => (
                <Pressable
                  android_ripple={{color: colors.primary}}
                  style={styles.unpressedItem}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    props.onChangeValue(item);
                  }}>
                  <Text style={[styles.listItem, {color: colors.text}]}>
                    {item.text}
                  </Text>
                </Pressable>
              )}
              keyExtractor={(item, index) => index}
            />
          </View>
        </Pressable>
      </Modal>
      <Pressable
        style={[styles.button, {borderColor: colors.border}]}
        onPress={() => setModalVisible(!modalVisible)}>
        <Text style={[styles.dropdownSelectedValue, {color: colors.text}]}>
          {props.value.text}
        </Text>
        <Icon
          style={{color: colors.primary}}
          name="arrow-drop-down"
          size={25}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 2,
  },
  dropdownSelectedValue: {
    paddingLeft: 10,
    flex: 1,
  },
  centeredView: {
    flex: 1,
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  unpressedItem: {
    borderRadius: 8,
    padding: 6,
  },
  listItem: {
    fontSize: 20,
  },
});

export default SelectBox;
