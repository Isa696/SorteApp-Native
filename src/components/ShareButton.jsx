import React, { useEffect, useState } from "react";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import { Button, Text, useTheme } from "react-native-paper";

const ShareButton = ( { isAnimationFinished, stylesItems, viewRef}) => {
  const theme = useTheme();
  const [error, setError] = useState(false)

  const takeScreenshot = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: "jpg",
        quality: 0.8,
      });
      console.log("Image saved to", uri);

      // Usa expo-sharing para compartir la imagen
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { dialogTitle: "Compartir Captura de Pantalla", mimeType: "image/jpeg",  });
      } else {
        setError("No se puede compartir la imagen ❌");
      }
    } catch (error) {
      console.error( error);
      setError("Error al tomar la captura ⚠️")
    }
  };

  useEffect(() => { return () => { setError(false); }; }, []);

  return (
    <>
      {error && <Text style={[stylesItems.text, { color: theme.colors.error }]}>{error}</Text>}
      <Button
        mode="contained"
        icon="share"
        disabled={!isAnimationFinished}
        onPress={takeScreenshot}
        style={stylesItems.button}
      >Compartir</Button>
    </>
  );
};

export default ShareButton;
