import React, {useState} from 'react';
import {StyleSheet, Text, Modal, Pressable, View, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CardImage from '../card/card-image';

const DeckListItem = props => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Pressable
      style={({pressed}) => [
        {
          backgroundColor: pressed ? 'lightgrey' : 'white',
        },
        styles.container,
      ]}
      onPress={() => {
        props.onPress();
      }}>
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
              Permanently delete this deck? This action cannot be undone.
            </Text>
            <View style={styles.buttonGroup}>
              <View style={styles.buttonView}>
                <Button
                  title="Delete Deck"
                  onPress={() => {
                    props.onDelete();
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
      <View style={styles.deckContainer}>
        <CardImage
          styles={styles.image}
          stub={props.pheonixBornStub}
          name={props.pheonixBorn}
        />
        <Text style={styles.listItem}>{props.name}</Text>
        <Icon
          raised
          name="delete-forever"
          size={25}
          style={styles.delete}
          onPress={() => setModalVisible(!modalVisible)}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: 'row',
  },
  buttonView: {
    width: '50%',
    padding: 5,
  },
  deckContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  delete: {
    color: 'grey',
    width: '10%',
  },
  listItem: {
    margin: 10,
    padding: 10,
    fontSize: 18,
    width: '70%',
    paddingLeft: 5,
  },
  image: {
    width: '20%',
  },
  container: {
    flex: 1,
    margin: 10,
    padding: 5,
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
});

export default DeckListItem;
