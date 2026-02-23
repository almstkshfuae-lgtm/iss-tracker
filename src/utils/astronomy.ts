import { Vector3 } from 'three';

// Earth radius in Three.js units (we'll scale everything relative to this)
export const EARTH_RADIUS = 5;

/**
 * Converts Latitude and Longitude to a Vector3 on a sphere of radius R
 * @param lat Latitude in degrees
 * @param lon Longitude in degrees
 * @param radius Sphere radius
 * @returns Vector3
 */
export function latLonToVector3(lat: number, lon: number, radius: number = EARTH_RADIUS): Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));

  return new Vector3(x, y, z);
}

/**
 * Calculates the sub-solar point (latitude and longitude where the sun is directly overhead)
 * based on the current time.
 * 
 * This uses an approximate astronomical calculation suitable for visualization.
 * It determines the sun's declination (latitude) and the Greenwich Hour Angle (longitude).
 */
export function getSubSolarPoint(date: Date) {
    // Approximate calculation
    // Declination of the sun
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    // Approximate declination (23.45 degrees tilt)
    // This is a simplified formula.
    const declination = -23.45 * Math.cos((360 / 365) * (dayOfYear + 10) * (Math.PI / 180));

    // Greenwich Hour Angle (GHA) of the Sun
    // The sun moves 15 degrees per hour.
    // At 12:00 UTC, the sun is near 0 longitude (ignoring Equation of Time for simplicity in viz).
    
    // UTC hours
    const utcHours = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;
    
    // Longitude where it is noon (12:00 solar time)
    // 12:00 UTC -> 0 deg (approx)
    // 13:00 UTC -> -15 deg (Sun moves West)
    // Formula: (12 - UTC) * 15
    const solarNoonLongitude = (12 - utcHours) * 15;
    
    // Normalize to -180 to 180
    let lon = solarNoonLongitude % 360;
    if (lon > 180) lon -= 360;
    if (lon < -180) lon += 360;

    return { lat: declination, lon: lon };
}
