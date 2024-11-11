import React from 'react'
import { Modal, Portal, Button, TextInput, Text, useTheme } from 'react-native-paper';

const ModalInput = ({hideModal, error, visible, handleBtn, btnText, newName, setNewName, stylesItems, iconBtn, labelInput}) => {
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
      <TextInput
        mode='flat'
        label={labelInput}
        placeholder='20 letras max'
        placeholderTextColor={theme.colors.primary}
        textColor={theme.colors.text}
        underlineColor={theme.colors.primary}
        activeUnderlineColor={theme.colors.accent}
        value={newName}
        onChangeText={setNewName}
        maxLength={20}
        style={[
          stylesItems.input,
          { backgroundColor: theme.colors.secondary },
        ]}
      />
      {error && (
        <Text style={[stylesItems.text, { color: theme.colors.onError }]}>{error}</Text>
      )}
      <Button mode="contained" onPress={handleBtn} style={stylesItems.button}
      icon={iconBtn}
      >
        {btnText}
      </Button>
      <Button
        mode="contained"
        onPress={hideModal}
        style={[stylesItems.button, { backgroundColor: theme.colors.error }]}
        icon={"close"}
      >
        Cerrar
      </Button>
      </>
    )}
    </Modal>
  </Portal>
  )
}

export default ModalInput