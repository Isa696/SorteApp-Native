import React, { useEffect, useRef, useState } from 'react';
import { Modal, useTheme, Portal, Button, Text } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import ViewShot from 'react-native-view-shot';
import ShareButton from './ShareButton';

const ModalWinner = ({ hideModal, error, visible, textWinner, stylesItems, textPrize, iconPrize }) => {
  const theme = useTheme();
  const viewRef = useRef();


  // Estado para la animación
  const [animatedText, setAnimatedText] = useState(Array(8).fill(''));
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  let timeoutId; // Variable para almacenar el timeout actual

  useEffect(() => {
    if (textWinner) {
      const mixs = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
      // Función de animación más eficiente con requestAnimationFrame
      let frameId;
      let startTime = null;

      const updateText = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;

        if (progress < 1000) { // Animación por 1 segundo
          const randomChars = Array.from({ length: 8 }, () => mixs[Math.floor(Math.random() * mixs.length)]);
          setAnimatedText(randomChars);
          frameId = requestAnimationFrame(updateText); // Continuar la animación
        } else {
          setIsAnimationFinished(true);  // Finaliza la animación después de 1 segundo
          setShowConfetti(true); // Activar confeti
          timeoutId =   setTimeout(() => {setShowConfetti(false);}, 3000);
        }
      };
            frameId = requestAnimationFrame(updateText);
            return () => {
        cancelAnimationFrame(frameId);
        clearTimeout(timeoutId); // Limpia el timeout si el modal se cierra antes de terminar la animación
        setIsAnimationFinished(false);
        setShowConfetti(false);
      };
    }
  }, [textWinner]);

  function handleDismiss () {
    hideModal();
    clearTimeout(timeoutId); // Asegura que el timeout no continúe en la próxima apertura
    setIsAnimationFinished(false);
    setShowConfetti(false);
  };
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={handleDismiss}
        contentContainerStyle={[
          stylesItems.modalContent,
          stylesItems.shadow,
          { backgroundColor: theme.colors.background },
        ]}
      >
          <ViewShot ref={viewRef}>

          {visible && (
            <>
              {error ? (
                <>
                  <Text style={[stylesItems.text, { color: theme.colors.onError }]}>{error}</Text>
                  <Button
                  mode="contained"
                  onPress={handleDismiss}
                  icon={"close"}
                  style={[stylesItems.button, { backgroundColor: theme.colors.error }]}
                  >Cerrar</Button>
                </>
              ) : (
                <>
                  <Text style={[stylesItems.text, { color: theme.colors.text }]}>
                    Ganador!!!
                  </Text>
                  <Text style={[stylesItems.text, { color: theme.colors.accent }]}>
                    {/* Mostrar el ganador cuando la animación termine */}
                    {isAnimationFinished ? textWinner : animatedText.join(' ')}
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

                  <ShareButton viewRef={viewRef} stylesItems={stylesItems} isAnimationFinished={isAnimationFinished}/>

              <Button
                mode="contained"
                onPress={handleDismiss}
                icon={"close"}
                disabled={!isAnimationFinished}
                style={[stylesItems.button, { backgroundColor: theme.colors.error }]}
                >Cerrar</Button>
              </>
            )}
            </>
          )}
          {showConfetti && (
            <>
            <LottieView
            source={require("../../assets/confetti.json")}
            key="confetti"
            autoPlay
            loop={false}
            resizeMode='cover'
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              left: 0,
              top: 0,
              zIndex: 1000,
            }}
            />
            <LottieView
            source={require("../../assets/confetti-bottom.json")}
            key="confetti-bottom"
            autoPlay
            loop={false}
            resizeMode='cover'
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              left: 0,
              top: 0,
              zIndex: 1000,
            }}
            />
            </>
          )}
          </ViewShot>
          </Modal>
    </Portal>
  );
};

export default ModalWinner;
