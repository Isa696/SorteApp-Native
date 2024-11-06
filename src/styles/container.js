import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 20,
      gap: 20,
    },
    shadow: {
      shadowOffset: {
        width: 4,
        height: 4,
      },
      shadowOpacity: 0.7,
      shadowRadius: 8,
      elevation: 14,
    },
  });