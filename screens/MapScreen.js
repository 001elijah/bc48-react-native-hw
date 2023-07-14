import React from 'react';
import MapView, { Marker } from "react-native-maps";
import { Dimensions, StyleSheet, View } from 'react-native';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: 49.55329109427157,
          longitude: 25.587634069756295,
          latitudeDelta: 0.05,
          longitudeDelta: 0.04,
        }}
        mapType="standard"
        minZoomLevel={15}
        onMapReady={() => console.log("Map is ready")}
        onRegionChange={() => console.log("Region change")}
      >
        <Marker
          title="I am here"
          coordinate={{ latitude: 49.55329109427157, longitude: 25.587634069756295 }}
          description='Hello'
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
