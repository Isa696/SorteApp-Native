import { StyleSheet, View } from 'react-native'
import React, { useRef } from 'react'
import ViewShot from 'react-native-view-shot';
import { Title , Paragraph, Modal, Button, useTheme, Portal} from 'react-native-paper';
import ShareButton from './ShareButton';
import {styles} from '../styles/container';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalConfirm from './ModalConfirm';


const ModalHistory = ({item, visible, hideModal, stylesCards, onDelete, showModalConfirm, visibleConfirm, hideModalConfirm}) => {
  if (!item) return null;

    const theme = useTheme();
    const viewRef = useRef();

    function handleDismiss () {
        hideModal();
      };

      const handleDelete = async () => {
        try {
          // Get current history
          const data = await AsyncStorage.getItem('winnerHistory');
          if (data) {
            const history = JSON.parse(data);
            // Filter out the current item
            const newHistory = history.filter(entry =>
              entry.date !== item.date ||
              entry.winner !== item.winner ||
              entry.prize !== item.prize
            );
            // Save filtered history
            await AsyncStorage.setItem('winnerHistory', JSON.stringify(newHistory));
            onDelete();
          }
        } catch (error) {
          console.error('Error deleting item:', error);
        }
        hideModal();
        hideModalConfirm();
      };

  return (
    <Portal>
              <Modal
        visible={visible}
        onDismiss={handleDismiss}
        contentContainerStyle={[
          stylesItems.modalContent,
          styles.shadow,
          { backgroundColor: theme.colors.secondary },
        ]}
      >


        <ViewShot ref={viewRef}>

                      <Title style={[stylesCards.cardText, { color: theme.colors.text }]}>
                🏆 Ganador: {item.winner}
                </Title>
                <Paragraph style={[stylesCards.cardText, stylesCards.cardParagraph, { color: theme.colors.text }]}>
                🎁 Premio: {item.prize}
                </Paragraph>
                <Paragraph style={[stylesCards.cardText, stylesCards.cardParagraph, { color: theme.colors.text }]}>
                📅 Fecha: {item.date}
                </Paragraph>
        </ViewShot>

        <ShareButton viewRef={viewRef} stylesItems={stylesItems} isAnimationFinished={true}/>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button
                  mode="contained"
                  onPress={showModalConfirm}
                  icon={"trash-can-outline"}
                  style={[stylesItems.button, { backgroundColor: theme.colors.onError }]}
                  >Eliminar</Button>
        <Button
                mode="contained"
                onPress={showModalConfirm}
                icon={"close"}
                style={[stylesItems.button, { backgroundColor: theme.colors.error }]}
                >Cerrar</Button>

                </View>
      </Modal>

      <ModalConfirm
            visible={visibleConfirm}
            hideModalConfirm={hideModalConfirm}
            onConfirm={handleDelete}
            />
    </Portal>
  )
}

export default ModalHistory

const stylesItems = StyleSheet.create({
    modalContent: {
        padding: 20,
        borderRadius: 10,
        width: "80%",
        maxWidth: 500,
        margin: "auto",
      },
      button: {
        padding: 5,
        marginTop: 10,
      },
      text: {
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center",
        marginVertical: 4,
      },
      modalContent: {
        padding: 20,
        borderRadius: 10,
        width: "80%",
        maxWidth: 500,
        margin: "auto",
      },
})