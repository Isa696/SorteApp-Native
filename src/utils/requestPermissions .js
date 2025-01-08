import { PermissionsAndroid, Platform } from 'react-native';

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

    let manageStoragePermission = PermissionsAndroid.RESULTS.DENIED;
    let readStoragePermission = PermissionsAndroid.RESULTS.DENIED;
    let writeStoragePermission = PermissionsAndroid.RESULTS.DENIED;

    // Solicitar permisos de gestión de almacenamiento solo en Android 11 o superior
    if (Platform.Version >= 30) {
      manageStoragePermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.MANAGE_EXTERNAL_STORAGE,
        {
          title: "Permiso de gestión de almacenamiento",
          message: "La aplicación necesita acceso al almacenamiento para gestionar archivos.",
          buttonNegative: "Cancelar",
          buttonPositive: "Aceptar",
        }
      );
    }

    // Si el permiso de gestión de almacenamiento no se concede, solicitar permisos de lectura y escritura de almacenamiento
    if (manageStoragePermission !== PermissionsAndroid.RESULTS.GRANTED) {
      readStoragePermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Permiso de lectura de almacenamiento",
          message: "La aplicación necesita acceso al almacenamiento para leer archivos.",
          buttonNegative: "Cancelar",
          buttonPositive: "Aceptar",
        }
      );

      writeStoragePermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Permiso de escritura de almacenamiento",
          message: "La aplicación necesita acceso al almacenamiento para guardar archivos.",
          buttonNegative: "Cancelar",
          buttonPositive: "Aceptar",
        }
      );
    }

    // Verificar si todos los permisos fueron otorgados
    if (
      audioPermission === PermissionsAndroid.RESULTS.GRANTED &&
      (manageStoragePermission === PermissionsAndroid.RESULTS.GRANTED ||
        (readStoragePermission === PermissionsAndroid.RESULTS.GRANTED &&
         writeStoragePermission === PermissionsAndroid.RESULTS.GRANTED))
    ) {
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