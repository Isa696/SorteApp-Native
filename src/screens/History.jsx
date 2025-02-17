import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { useTheme, Card, Title, Paragraph, FAB } from "react-native-paper";
import { styles } from "../styles/container";
import { useState } from "react";
import getWinnerData from "../utils/getWinnerData";
import ModalHistory from "../components/ModalHistory";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalConfirm from "../components/ModalConfirm";

const History = () => {
  const theme = useTheme();
    const [historyData, setHistoryData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [visibleConfirm, setVisibleConfirm] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const loadData = async () => {
        const data = await getWinnerData();
        setHistoryData(data);
    };
    useFocusEffect(
        useCallback(() => {
          loadData();
        }, [])
      );

    function showModalConfirm() {
        setVisibleConfirm(true);
    }
    function hideModalConfirm() {
        setVisibleConfirm(false);
    }
    function showModal(index) {
        setSelectedItem(historyData[index]);
        setVisible(true);
    }
    function hideModal() {
        setVisible(false);
    }
    const clearHistory = async () => {
        try {
          await AsyncStorage.removeItem('winnerHistory');
          await loadData(); // Just use loadData which will set the correct state
        } catch (error) {
          console.error('Error clearing history:', error);
        }
        hideModalConfirm();
      };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Title style={[styles.text, { color: theme.colors.text }]}>
        Historial
      </Title>

      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={stylesCards.scrollContent}
      >
        {historyData.map((item, index) => (
            <Card
            key={index}
            style={[
                stylesCards.card,
                { backgroundColor: theme.colors.primary },
            ]}
                onPress={() => showModal(index)}
            >
              <Card.Content>
                <Title style={[stylesCards.cardText, { color: theme.colors.text }]}>
                🏆 Ganador: {item.winner}
                </Title>
                <Paragraph style={[stylesCards.cardText, stylesCards.cardParagraph, { color: theme.colors.text }]}>
                🎁 Premio: {item.prize}
                </Paragraph>
                <Paragraph style={[stylesCards.cardText, stylesCards.cardParagraph, { color: theme.colors.text }]}>
                📅 Fecha: {item.date}
                </Paragraph>
              </Card.Content>
            </Card>
        ))}
      </ScrollView>
      <FAB
      icon="trash-can"
      style={[
        stylesCards.fab,
        { backgroundColor: theme.colors.onError }
      ]}
      onPress={showModalConfirm}
    />

      <ModalHistory
        item={selectedItem}
        visible={visible}
        hideModal={hideModal}
        stylesCards={stylesCards}
        onDelete={loadData}
        />

        <ModalConfirm
            visible={visibleConfirm}
            hideModalConfirm={hideModalConfirm}
            onConfirm={clearHistory}
            />
    </View>
  );
};

export default History;

const stylesCards = StyleSheet.create({
  scrollContent: {
    padding: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    gap: 8,
  },
  card: {
    width: "40%",
    minWidth: 150,
    maxWidth: 500,
    elevation: 4,
    borderRadius: 8,
},
cardText: {
      textAlign: "center",
    },
    cardParagraph: {
          paddingVertical: 4,
          paddingHorizontal: 8,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
});
