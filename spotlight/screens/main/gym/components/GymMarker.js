import PropTypes, { number } from "prop-types";
import React from "react";
import { Marker } from "react-native-maps";
import { FontAwesome5 } from "@expo/vector-icons";
const GymMarker = ({
  title,
  address,
  coordinate,
  onCalloutPress,
  isFavorite,
}) => {
  return (
    <Marker
      tracksInfoWindowChanges
      tracksViewChanges
      coordinate={coordinate}
      title={title}
      description={address}
      onCalloutPress={onCalloutPress}
      pinColor={isFavorite ? "yellow" : "red"}
    >
      <FontAwesome5
        name={isFavorite ? "heart" : "map-marker-alt"}
        size={24}
        color="#A20A0A"
        solid
      />
    </Marker>
  );
};

GymMarker.propTypes = {
  title: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  coordinate: PropTypes.shape({ latitude: number, longitude: number })
    .isRequired,
  isFavorite: PropTypes.bool,
};
export default GymMarker;
