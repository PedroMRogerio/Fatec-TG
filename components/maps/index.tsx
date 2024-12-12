import { StyleSheet } from "react-native";
import MapView, { Marker } from 'react-native-maps';

import * as Location from 'expo-location';

interface MapsProps {
    location: Location.LocationObject
}

export default function CurrentMaps({ location }: MapsProps) {
    return (
        <>
            <MapView
                style={styles.map}
                zoomEnabled={false}
                scrollEnabled={false}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}>
                <Marker coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}></Marker>
            </MapView>
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        margin: 20,
        borderRadius: 20,
        alignSelf: 'center',
        width: '100%',
        aspectRatio: 1,
    },
});