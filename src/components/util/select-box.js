import React, {useState} from 'react';
import {StyleSheet, FlatList, View, Modal, Text, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SelectBox = props => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FlatList
              data={props.data}
              renderItem={({item}) => (
                <Pressable
                  style={({pressed}) =>
                    pressed ? styles.pressedItem : styles.unpressedItem
                  }
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    props.onChangeValue(item);
                  }}>
                  <Text style={styles.listItem}>{item.text}</Text>
                </Pressable>
              )}
              keyExtractor={(item, index) => index}
            />
          </View>
        </View>
      </Modal>
      <Pressable
        style={styles.button}
        onPress={() => setModalVisible(!modalVisible)}>
        <Text style={styles.dropdownSelectedValue}>{props.value.text}</Text>
        <Icon name="arrow-drop-down" size={25} />
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
    borderColor: 'lightgrey',
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
    backgroundColor: 'white',
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
  pressedItem: {
    backgroundColor: 'lightgrey',
    borderRadius: 8,
    padding: 6,
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
