import React from 'react'
import { Modal, useTheme, Portal, Button, Text } from 'react-native-paper';

const ModalWinner = ({ hideModal, error, visible, textWinner, stylesItems, textPrize, iconPrize}) => {
    const theme = useTheme();
  return (
    <Portal>
    <Modal
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={[
        stylesItems.modalContent,
        stylesItems.shadow,
        { backgroundColor: theme.colors.background },
      ]}
    >
      {visible && (
      <>
      {error ? (
        <Text style={[stylesItems.text, { color: "red" }]}>{error}</Text>
      ) : (
        <>
          <Text style={[stylesItems.text, { color: theme.colors.text }]}>
            Ganador!!!
          </Text>
          <Text style={[stylesItems.text, { color: theme.colors.accent }]}>
            {textWinner}
          </Text>

          {(textPrize || iconPrize) && (
            <>
            <Text style={[stylesItems.text, { color: theme.colors.text }]}>
            Premio!!!
          </Text>
          <Text style={[stylesItems.text, { color: theme.colors.accent }]}>
            {iconPrize} {textPrize}
          </Text>
            </>
          )}

          <Button
            mode="contained"
            icon="share"
            onPress={console.log("Compartir")}
            style={stylesItems.button}
          >
            Compartir
          </Button>
        </>
      )}
      <Button
        mode="contained"
        onPress={hideModal}
        icon={"close"}
        style={[stylesItems.button, { backgroundColor: "red" }]}
      >
        Cerrar
      </Button>
      </>
      )}
    </Modal>
  </Portal>
  )
}

export default ModalWinner;