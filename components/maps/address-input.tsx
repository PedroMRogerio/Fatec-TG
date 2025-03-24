import React from "react";
import { View, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const apiKey = process.env.API_KEY

type AddressInputProps = {
  onAddressSelected: (address: string, location: { lat: number; lng: number }) => void;
};

const AddressInput: React.FC<AddressInputProps> = ({ onAddressSelected }) => {
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Digite um endereço..."
        fetchDetails={true}
        onPress={(data, details = null) => {
          if (details) {
            const location = {
              lat: details.geometry.location.lat,
              lng: details.geometry.location.lng,
            };
            onAddressSelected(data.description, location);
          }
        }}
        query={{
          key: apiKey,
          language: "pt-BR", // Define o idioma
        }}
        styles={{
          textInput: styles.input,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default AddressInput;
