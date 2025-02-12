import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function getWinnerData() {
  try {
    const data = await AsyncStorage.getItem('winnerHistory');
    if (data) {
      const parsed = JSON.parse(data);
      // Ensure we always return an array
      return Array.isArray(parsed) ? parsed : [parsed];
    }
    return [];
  } catch (error) {
    console.error('Error retrieving winner data:', error);
    return [];
  }
}