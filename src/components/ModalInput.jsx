import React from 'react'
import { Modal, Portal, Button, TextInput, Text, useTheme, IconButton } from 'react-native-paper';

const ModalInput = ({hideModal, error, visible, handleBtn, btnText, newName, setNewName, stylesItems, iconBtn, labelInput, multiline, handleMultipleNames, allowMultiple}) => {
    const theme = useTheme();

    function handleRemoveName() {
      setNewName('');
    }
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
        placeholder={ multiline ? '1 nombre por linea' : '20 letras max'}
        placeholderTextColor={theme.colors.primary}
        textColor={theme.colors.text}
        underlineColor={theme.colors.primary}
        activeUnderlineColor={theme.colors.accent}
        value={newName}
        onChangeText={setNewName}
        maxLength={multiline ? null : 20}
        multiline={multiline}
        style={[
          stylesItems.input,
          { backgroundColor: theme.colors.secondary },
        ]}
        left={
          <TextInput.Icon
            icon={() => (
                allowMultiple &&
                <IconButton
                mode="outlined"
                iconColor={theme.colors.text}
                rippleColor={theme.colors.accent}
                size={20}
                icon={multiline ? "account-multiple-plus-outline" : "account-multiple-remove-outline" }
                onPress={() =>{ handleMultipleNames()}}
                />
            )}
          />}
        right={
          <TextInput.Icon
            icon={() => (
                <IconButton
                mode="outlined"
                iconColor={theme.colors.text}
                rippleColor={theme.colors.accent}
                size={20}
                icon={ "eraser" }
                onPress={() =>{ handleRemoveName()}}
                />
            )}
          />}
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