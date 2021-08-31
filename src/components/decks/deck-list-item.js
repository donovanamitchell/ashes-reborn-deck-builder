import React, {useState} from 'react';
import {StyleSheet, Text, Modal, Pressable, View, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';

import CardImage from '../card/card-image';

const DeckListItem = props => {
  const {colors} = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const {t} = useTranslation();

  return (
    <Pressable
      style={[
        {
          backgroundColor: colors.card,
        },
        styles.container,
      ]}
      android_ripple={{color: colors.primary}}
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
          <View style={[styles.modalView, {backgroundColor: colors.card}]}>
            <Text style={{color: colors.text}}>
              {t('decks.deleteDeckWarning')}
            </Text>
            <View style={styles.buttonGroup}>
              <View style={styles.buttonView}>
                <Button
                  title={t('decks.deleteDeckButton')}
                  color={colors.primary}
                  onPress={() => {
                    props.onDelete();
                    setModalVisible(!modalVisible);
                  }}
                />
              </View>
              <View style={styles.buttonView}>
                <Button
                  title={t('common.cancelButton')}
                  color={colors.primary}
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
          stub={props.phoenixBornStub}
          name={props.phoenixBorn}
        />
        <Text style={[styles.listItem, {color: colors.text}]}>
          {props.name}
        </Text>
        <Icon
          raised
          name="delete-forever"
          size={25}
          style={[styles.delete, {color: colors.primary}]}
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
