import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useUser } from "@/contexts/userContext";
import VehicleQuery from "@/components/firestore-query/vehicle";
//import { IVehicle } from '@/components/interfaces/vehicle'

interface IVehicle {
  id: string;
  [key: string]: any; // permite campos extras
}


export default function Usuario() {
  const { user } = useUser();
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);

  function vType(type:string){
    switch(type){
        case 'large':
            return 'Grande'
        case 'medium':
            return 'Médio'
        case 'small':
            return 'Pequeno'
        default:
            return '???'
        
    }
  }

  useEffect(() => {
    const fetchVehicles = async () => {
      if (user?.uid) {
        const result = await VehicleQuery.getVehicle(user.uid);
        setVehicles(result);
      }
    };
    fetchVehicles();
  }, [user]);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Usuário não encontrado no contexto.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Informações do Usuário</Text>

      <View style={styles.infoBlock}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>{user.name}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>

        <Text style={styles.label}>CPF:</Text>
        <Text style={styles.value}>{user.cpf}</Text>

        <Text style={styles.label}>CNH:</Text>
        <Text style={styles.value}>{user.cnh}</Text>
      </View>

      <Text style={styles.subtitle}>Veículos</Text>
      {vehicles.length > 0 ? (
        vehicles.map((vehicle) => (
          <View key={vehicle.id} style={styles.vehicleCard}>
            <Text style={styles.label}>Placa: <Text style={styles.value}>{vehicle.plate}</Text></Text>
            <Text style={styles.label}>Tipo: <Text style={styles.value}>{vType(vehicle.type)}</Text></Text>
            <Text style={styles.label}>Dimensão (m): <Text style={styles.value}>{vehicle.size}</Text></Text>
            <Text style={styles.label}>Preço Fixo: <Text style={styles.value}>{vehicle.fixedPrice.toFixed(2)}</Text></Text>
            <Text style={styles.label}>Preço por Distância (Km): <Text style={styles.value}>{vehicle.variablePrice.toFixed(2)}</Text></Text>
          </View>
        ))
      ) : (
        <Text style={styles.value}>Nenhum veículo encontrado.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  infoBlock: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 8,
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
    marginTop: 8,
  },
  value: {
    fontWeight: "400",
    fontSize: 16,
  },
  vehicleCard: {
    backgroundColor: "#e6e6e6",
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  error: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});
