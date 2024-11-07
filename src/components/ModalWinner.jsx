import React, { useEffect, useState } from 'react';
import { Modal, useTheme, Portal, Button, Text } from 'react-native-paper';
import ConfettiCannon from 'react-native-confetti-cannon';

const ModalWinner = ({ hideModal, error, visible, textWinner, stylesItems, textPrize, iconPrize }) => {
  const theme = useTheme();
  
  // Estado para la animación
  const [animatedText, setAnimatedText] = useState(Array(8).fill(''));
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [parentWidth, setParentWidth] = useState(0);

    // Captura el ancho del componente padre al montar el modal
    const handleLayout = (event) => {
      const width  = event.nativeEvent.layout;
      setParentWidth(width);
    };

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
        }
      };

      frameId = requestAnimationFrame(updateText);

      return () => cancelAnimationFrame(frameId); // Limpiar animación si el modal se cierra antes
    }

    return () => {
      setIsAnimationFinished(false);
      setShowConfetti(false);
    };
  }, [textWinner]);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        onLayout={handleLayout}
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

                  <Button
                    mode="contained"
                    icon="share"
                    // onPress={console.log("Compartir")}
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
          {showConfetti && (
          <>
            {/* Confeti desde la izquierda */}
            <ConfettiCannon
              count={100}
              origin={{ x: 0, y: 0 }} // Confeti desde la izquierda
              fallSpeed={750}
              explosionSpeed={500}
              fadeOut={true}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
              }}
            />
            {/* Confeti desde la derecha */}
            <ConfettiCannon
              count={100}
              origin={{ x: parentWidth, y: 0 }} // Confeti desde la derecha
              fallSpeed={750}
              explosionSpeed={500}
              fadeOut={true}
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}
            />
          </>
        )}
    </Portal>
  );
};

export default ModalWinner;
