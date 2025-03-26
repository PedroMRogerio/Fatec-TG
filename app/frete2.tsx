import RouteMap from "@/components/maps/route-map";
import React from "react";
import { SafeAreaView } from "react-native";
import { endFatec, endFiec } from "@/components/maps/mockup-endereco/endereco";

export default function Frete2() {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <RouteMap origin={endFatec} destination={endFiec} />
        </SafeAreaView>
    );
};

