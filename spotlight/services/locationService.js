import * as Location from "expo-location";

/**
 * Prompt user for location permissions.
 * @throws {Error} if permission is not granted.
 */
const requestLocationPermissions = async () => {
  // Try and request location permissions from user.
  const { status } = await Location.requestPermissionsAsync();
  if (status !== "granted") {
    console.log("Permission to access location was denied");
    throw new Error("Permission to access location was denied");
  }
};

/**
 * @typedef {Object} LocationCoordinates
 * @property {number} latitude,
 * @property {number} longitude
 */

/**
 * PRECONDITION: Must have already gotten location permissions from user
 * Usage:
 * getLocation().then(location => useLocation(location))
 * @return {Promise<LocationCoordinates>}
 * @throws {Error} if something wack happens
 */
const getLocation = async () => {
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

export { requestLocationPermissions, getLocation };
