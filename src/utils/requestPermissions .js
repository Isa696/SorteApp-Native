import { PermissionsAndroid } from 'react-native';

export const requestPermissions = async () => {
  try {
    // Solicitar permisos de grabación de audio
    const audioPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: "Permiso de grabación",
        message: "La aplicación necesita acceso al micrófono para grabar audio durante la grabación de pantalla.",
        buttonNegative: "Cancelar",
        buttonPositive: "Aceptar",
      }
    );

    // Solicitar permisos de almacenamiento
    const storagePermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Permiso de almacenamiento",
        message: "La aplicación necesita acceso al almacenamiento para guardar el video grabado.",
        buttonNegative: "Cancelar",
        buttonPositive: "Aceptar",
      }
    );

    // Verificar si ambos permisos fueron otorgados
    if (audioPermission === PermissionsAndroid.RESULTS.GRANTED && storagePermission === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Permisos otorgados");
      return true;
    } else {
      console.log("Permisos denegados");
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};