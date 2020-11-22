import * as Location from "expo-location";

/**
 * Gets current location of user, requesting permission if needed
 * Usage:
 * getLocation().then(location => useLocation(location))
 * @return {Promise<LocationCoordinates>}
 * @throws {Error} if something wack happens
 */
const getLocation = async () => {
  // Request location permissions
  const { status } = await Location.requestPermissionsAsync();
  if (status !== "granted") {
    console.log("Permission to access location was denied");
    throw new Error("Permission to access location was denied");
  }

  // Get current location of user
  try {
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({
      accuracy: 3,
    });
    console.log("current user latitude + longitude:", latitude, longitude);
    return {
      latitude,
      longitude,
    };
  } catch ({ code, message }) {
    console.log(code, message);
    throw new Error(`${code}: ${message}`);
  }
};

export { getLocation };
