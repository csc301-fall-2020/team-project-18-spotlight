import PropTypes, { number } from "prop-types";
import React from "react";
import { Marker } from "react-native-maps";

const GymMarker = ({ title, address, coordinate, onCalloutPress }) => (
  <Marker
    coordinate={coordinate}
    title={title}
    description={address}
    onCalloutPress={onCalloutPress}
  />
);

GymMarker.propTypes = {
  title: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  coordinate: PropTypes.shape({ latitude: number, longitude: number })
    .isRequired,
};
export default GymMarker;
