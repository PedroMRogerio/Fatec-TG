import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import UserCliQuery from "@/components/firestore-query/userCli";

export default function NovoFrete() {
  const [usersText, setUsersText] = useState<string>("Carregando...");

  async function Teste() {
    try {
      const users = await UserCliQuery.getUser('s'); // Pode ser qualquer array
      setUsersText(JSON.stringify(users, null, 2)); // Exibe o array completo formatado
    } catch (error) {
      setUsersText("Erro ao carregar usuários");
      console.error(error);
    }
  }

  useEffect(() => {
    Teste();
  }, []);

  return (
    <View>
      <Text>{usersText}</Text>
    </View>
  );
}
