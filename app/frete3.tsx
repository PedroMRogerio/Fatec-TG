import RouteMapTrack from "@/components/maps/route-map-track";
import React from "react";
import { SafeAreaView } from "react-native";
import { endFatec } from "@/components/maps/mockup-endereco/endereco";

export default function Frete3(){

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <RouteMapTrack destination={endFatec} />
      </SafeAreaView>
    );
    
}