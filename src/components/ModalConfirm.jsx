import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Modal, Portal, useTheme, Button } from "react-native-paper";
import { styles } from "../styles/container";

const ModalConfirm = ({ visible, onConfirm, hideModalConfirm }) => {
  const theme = useTheme();

  function handleDismiss() {
    hideModalConfirm();
  }
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
        <Text style={[stylesItems.text, { color: theme.colors.text }]}>
          Seguro quieres eliminar?
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            mode="contained"
            onPress={onConfirm}
            icon={"trash-can-outline"}
            style={[
              stylesItems.button,
              { backgroundColor: theme.colors.onError },
            ]}
          >
            Eliminar
          </Button>
          <Button
            mode="contained"
            onPress={handleDismiss}
            icon={"close"}
            style={[
              stylesItems.button,
              { backgroundColor: theme.colors.error },
            ]}
          >
            Cerrar
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default ModalConfirm;

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
});
