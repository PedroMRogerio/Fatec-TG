import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const apiKey = process.env.EXPO_PUBLIC_API_KEY;

type AddressInputProps = {
  onAddressSelected: (address: string, location: { lat: number; lng: number }) => void;
}

const AddressInput: React.FC<AddressInputProps> = ({ onAddressSelected }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, isFocused && styles.focusedContainer]}>
      <GooglePlacesAutocomplete
        placeholder="Digite o endereço."
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
          language: "pt-BR",
        }}
        styles={{
          textInput: styles.input,
          listView: styles.listView,
          description: styles.description,
          textInputContainer: styles.inputContainer,
        }}
        textInputProps={{
          onFocus: () => setIsFocused(true),
          onBlur: () => setIsFocused(false),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    overflow: "visible",
  },
  focusedContainer: {
    zIndex: 1000,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  listView: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    zIndex: 9999,
    backgroundColor: "#fff",
    elevation: 5, // Android sombra
    shadowColor: "#000", // iOS sombra
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    maxHeight: 200,
  },
  description: {
    flexWrap: 'wrap',
    width: "100%",
  },
  inputContainer: {
    paddingHorizontal: 0,
  },
});

export default AddressInput;
