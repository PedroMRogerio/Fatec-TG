import { Stack, Link } from "expo-router";
import { View, StyleSheet, Pressable, Image, Dimensions } from "react-native";
import { useUser } from "@/contexts/userContext";
import React from "react";

import userButton from "@/assets/images/userButton.png";
import newFreteButton from "@/assets/images/newFreteButton.png";
import searchButton from "@/assets/images/searchButton.png"
import configButton from "@/assets/images/configButton.png";

const { width } = Dimensions.get("window");



export default function ContentLayout() {
  const { user } = useUser();
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <View style={styles.view2}>
        <Link href="/content/usuario" asChild>

          <Pressable style={styles.botoes}>
            <Image source={userButton} style={styles.icon} />
          </Pressable>
        </Link>
        {user?.uType === 'prov' && (
          <Link href="/content/frete-buscar" asChild>
            <Pressable style={styles.botoes2}>
              <Image source={searchButton} style={styles.icon} />
            </Pressable>
          </Link>
        )}
        {user?.uType === 'cli' && (
          <Link href="/content/novoFrete" asChild>
            <Pressable style={styles.botoes2}>
              <Image source={newFreteButton} style={styles.icon} />
            </Pressable>
          </Link>
        )}
        <Link href="/content/config" asChild>
          <Pressable style={styles.botoes}>
            <Image source={configButton} style={styles.icon} />
          </Pressable>
        </Link>
      </View>
    </>
  );
}

export const styles = StyleSheet.create({
  view2: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#808080',
    backgroundColor: '#fff',
    paddingBottom: 10,
  },
  botoes: {
    width: width * 0.12,
    height: width * 0.12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  botoes2: {
    width: width * 0.15,
    height: width * 0.18,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
