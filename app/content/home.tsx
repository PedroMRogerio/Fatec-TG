import React, { useState, useCallback } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useUser } from "@/contexts/userContext";
import FreteCardList from "@/components/frete/freteCard";
import ProvCardList from "@/components/frete/provCard";
import { useFocusEffect } from "@react-navigation/native";
import { clientStyle, providerStyle } from "@/components/styles/PageStyles";
import { useProviderLocation } from "@/hooks/useProviderLocation";

export default function Home() {
  const { user } = useUser();
  const [refreshKey, setRefreshKey] = useState(0);
  const userStyle = user?.uType === "prov" ? providerStyle : clientStyle;

  // Chama o hook SEM condicional. Ele verifica internamente o providerId
  useProviderLocation(user?.uType === "prov" ? user.uid : undefined);

  useFocusEffect(
    useCallback(() => {
      setRefreshKey((prev) => prev + 1);
    }, [])
  );

  return (
    <View style={[styles.container, userStyle.container]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.titulo}>
          Bem vindo{user?.name ? `, ${user.name}` : " Usuário"}!
        </Text>

        <View style={styles.sublinha}></View>
        <Text style={styles.subtitulo}>Fretes:</Text>

        {user?.uType === "prov" && (
          <ProvCardList uid={user?.uid ? user.uid : ""} refreshKey={refreshKey} />
        )}
        {user?.uType === "cli" && (
          <FreteCardList uid={user?.uid ? user.uid : ""} refreshKey={refreshKey} />
        )}

        <View style={styles.separador2}></View>
      </ScrollView>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  scrollContent: {
    padding: 10,
    paddingBottom: 100,
  },
  titulo: {
    fontSize: 22,
    paddingBottom: 8,
  },
  subtitulo: {
    fontSize: 18,
    paddingBottom: 4,
  },
  sublinha: {
    borderWidth: 0.25,
    borderColor: "#808080",
    width: "100%",
  },
  separador2: {
    height: 20,
  },
});
