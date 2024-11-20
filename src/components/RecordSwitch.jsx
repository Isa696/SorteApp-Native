import React from 'react';
import { View, StyleSheet  } from 'react-native';
import { Switch, Text, Snackbar, Portal } from 'react-native-paper';
import RNScreenCapture from 'react-native-record-screen';
import { requestPermissions } from '../utils/requestPermissions ';
import RNFS from 'react-native-fs';

const RecordSwitch = ({ theme, isRecording, setIsRecording, videoUri, setVideoUri, visible, setVisible, error, setError }) => {

    const onToggleSwitch = () => {
        isRecording ? stopRecording() : startRecording();
    };

    const onDismissSnackBar = () => setVisible(false);

    const moveFile = async (sourceUri) => {
        // Define rutas para Movies y Downloads
        const moviePath = `${RNFS.MoviesDirectoryPath}/SorteApp-${Date.now()}.mp4`;
        const externalPath = `${RNFS.ExternalDirectoryPath}/SorteApp-${Date.now()}.mp4`;
        
        let destinationUri;
    
        // Verifica si la carpeta Movies está disponible
        try {
            const moviesExists = await RNFS.exists(RNFS.MoviesDirectoryPath);
            destinationUri = moviesExists ? moviePath : externalPath;
        } catch (error) {
            setError('Error verificando MoviesDirectoryPath, usando Capeta externa como respaldo.');
            destinationUri = externalPath;
        }
    
        // Intenta mover el archivo
        try {
            await RNFS.moveFile(sourceUri, destinationUri);
            console.log('Archivo movido a:', destinationUri);
            return destinationUri;
        } catch (error) {
            setError('Error moviendo archivo:', error);
        }
        setTimeout(() => {
            setError(null);
        }, 3000);
    };

    // Start the screen recording
    const startRecording = async () => {
        const hasPermissions = await requestPermissions();
        if (hasPermissions) {
            try {
                await RNScreenCapture.startRecording();
                setIsRecording(true);
                setVisible(true);
                console.log('Recording started...');
            } catch (error) {
                setError('Error al iniciar la grabación: ', error);
            }
        } else {
            setError('Permisos no obtenidos.');
        }
        setTimeout(() => {
            setError(null);
        }, 3000);
    };

    // Stop the screen recording and save the video
    const stopRecording = async () => {
        try {
            const result = await RNScreenCapture.stopRecording();
            const uri = result?.result?.outputURL;

            if (typeof uri === 'string') {
                setIsRecording(false);
                setVideoUri(uri);

            // Mueve el archivo a una carpeta pública
            const movedUri = await moveFile(uri);
            setVideoUri(movedUri);
            setVisible(true);
            setTimeout(() => {
                setVisible(false);
                setVideoUri(null);
            }, 7000);
            } else {
                setError('No se pudo obtener la URI del video.');
            }
        } catch (error) {
            setError('Error deteniendo la grabación: ', error);
        }
        setTimeout(() => {
            setError(null);
        }, 3000);
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 10, color: theme.colors.text }}>
                {isRecording ? 'Detener' : 'Grabar'}
            </Text>
                <Switch value={isRecording} onValueChange={onToggleSwitch}
                color={ isRecording ? theme.colors.error : theme.colors.onError }
                />
                <Portal>
                    {isRecording && (
                        <Snackbar
                            visible={visible}
                            onDismiss={onDismissSnackBar}
                            duration={3000}
                            style={[styles.snackbar, { backgroundColor: theme.colors.secondary }]}
                            action={{
                                icon: 'record-circle-outline',
                                onPress: () => {
                                    onDismissSnackBar();
                                },
                            }}
                            >
                                <Text style={{ color: theme.colors.text }}
                                >Grabando...</Text>
                            </Snackbar>
                    )}

            {videoUri && (
                <Snackbar
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    duration={7000}
                    style={[styles.snackbar, { backgroundColor: theme.colors.secondary }]}
                    action={{
                        icon: 'file-video-outline',
                        onPress: () => {
                            onDismissSnackBar();
                        },
                    }}
                    >
                        <Text style={{ color: theme.colors.text }}
                        >Video Guardado en {videoUri}</Text>
                    </Snackbar>
                    )}
            {error && (
                <Snackbar
                    visible={!!error}
                    onDismiss={onDismissSnackBar}
                    duration={3000}
                    style={[styles.snackbar, styles.errorSnackbar, { backgroundColor: theme.colors.secondary }]}
                    action={{
                        icon: 'video-off-outline',
                        onPress: () => {
                            onDismissSnackBar();
                        },
                    }}
                    >
                        <Text style={{ color: theme.colors.error }}
                        >{error}</Text>
                    </Snackbar>
                    )}
            </Portal>
        </View>
    );
};

export default RecordSwitch;

const styles = StyleSheet.create({
    snackbar: {
        width: 300,
        alignSelf: 'center',
    },
    errorSnackbar: {
        position: 'absolute',
        bottom: 90,
        zIndex: 9999,
    },
});
