import React, {useEffect, useState, useContext} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import CachingImage from './caching-image';
import {GlobalContext} from '../../store/global-store';

// TODO: stub guesser from card name?
const CardModal = ({route, navigation}) => {
  const [stub, setStub] = useState(route.params.stub);
  const {cards} = useContext(GlobalContext);

  useEffect(() => {
    if (stub) {
      return;
    }
    let card = cards.find(({name}) => name === route.params.name);
    if (card && card.stub) {
      setStub(card.stub);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards, route.params.name]);

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        navigation.goBack();
      }}>
      <CachingImage stub={stub} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: '100%',
  },
});

export default CardModal;
