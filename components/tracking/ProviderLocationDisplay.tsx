import React from 'react';
import { View, Text } from 'react-native';
import { useProviderLocationListener } from '@/hooks/useProviderLocationListener';

type Props = {
  providerId: string;
};

export default function ProviderLocationDisplay({ providerId }: Props) {
  const location = useProviderLocationListener(providerId);

  if (!location) return <Text>Carregando localização do provedor...</Text>;

  return (
    <View>
      <Text>Latitude: {location.latitude.toFixed(6)}</Text>
      <Text>Longitude: {location.longitude.toFixed(6)}</Text>
    </View>
  );
}
