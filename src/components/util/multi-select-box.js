import React, {useState, useEffect} from 'react';
import {
  Button,
  StyleSheet,
  FlatList,
  View,
  Modal,
  Text,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const MultiSelectBox = props => {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);
  const [unsavedSelections, setUnsavedSelections] = useState([]);

  useEffect(() => {
    setUnsavedSelections(props.value);
  }, [props.value]);

  function isChecked(item) {
    return unsavedSelections.find(selection => selection.value === item.value);
  }

  return (
    <View>
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
            <FlatList
              data={props.data}
              renderItem={({item}) => (
                <Pressable
                  style={[{color: colors.text}, styles.pressableSelectItem]}
                  android_ripple={{color: colors.primary}}
                  onPress={() => {
                    if (isChecked(item)) {
                      setUnsavedSelections(
                        unsavedSelections.filter(
                          selection => selection.value !== item.value,
                        ),
                      );
                    } else {
                      setUnsavedSelections(unsavedSelections.concat(item));
                    }
                  }}>
                  <Icon
                    name={
                      isChecked(item) ? 'check-box' : 'check-box-outline-blank'
                    }
                    style={{color: colors.primary}}
                    size={20}
                  />
                  <Text style={[styles.listItem, {color: colors.text}]}>
                    {item.text}
                  </Text>
                </Pressable>
              )}
              keyExtractor={(_item, index) => index}
            />
            <View style={styles.buttonWrapper}>
              <Button
                title={t('common.done')}
                style={styles.button}
                color={colors.primary}
                onPress={() => {
                  props.onChangeValue(unsavedSelections);
                  setModalVisible(!modalVisible);
                }}
              />
            </View>
          </View>
        </Pressable>
      </Modal>
      <Pressable
        style={[
          styles.openModalButton,
          {borderColor: colors.border, backgroundColor: colors.card},
        ]}
        onPress={() => setModalVisible(!modalVisible)}>
        <Text style={[styles.dropdownSelectedValue, {color: colors.text}]}>
          {props.value
            .reduce((string, item) => {
              return string + item.text + ', ';
            }, '')
            .slice(0, -2)}
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
  buttonWrapper: {
    alignSelf: 'stretch',
    paddingTop: 10,
  },
  openModalButton: {
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  pressableSelectItem: {
    borderRadius: 8,
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItem: {
    paddingLeft: 10,
    fontSize: 20,
  },
});

export default MultiSelectBox;
