import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function saveWinnerData(textWinner, textPrize, iconPrize) {
  try {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newWinner = {
      winner: textWinner || null,
      prize: textPrize ? `${textPrize} ${iconPrize || ''}` : null,
      date: formattedDate
    };

    // Obtener datos existentes
    const existingData = await AsyncStorage.getItem('winnerHistory');
    let winners = [];
    
    if (existingData) {
      const parsed = JSON.parse(existingData);
      // Si es un objeto, convertirlo en array
      winners = Array.isArray(parsed) ? parsed : [parsed];
    }

    // Añadir nuevo ganador
    winners.push(newWinner);

    // Guardar array actualizado
    await AsyncStorage.setItem('winnerHistory', JSON.stringify(winners));
  } catch (error) {
    console.error('Error saving winner data:', error);
  }
}