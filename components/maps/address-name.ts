import Geocoder from 'react-native-geocoding';

const apiKey = process.env.EXPO_PUBLIC_API_KEY? process.env.EXPO_PUBLIC_API_KEY: ''
Geocoder.init(apiKey)

/**
 * Função que converte latitude e longitude em um endereço.
 * @param latitude Latitude como string.
 * @param longitude Longitude como string.
 * @returns Endereço como string ou erro.
 */
export async function getEndereco(latitude: string, longitude: string): Promise<string> {
  try {
    // Converte para número
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      throw new Error('Coordenadas inválidas');
    }

    const response = await Geocoder.from(lat, lng);

    if (
      response.results &&
      response.results.length > 0 &&
      response.results[0].formatted_address
    ) {
      return response.results[0].formatted_address;
    } else {
      throw new Error('Endereço não encontrado');
    }
  } catch (error) {
    console.error('Erro ao obter endereço:', error);
    return 'Erro ao obter endereço';
  }
}
