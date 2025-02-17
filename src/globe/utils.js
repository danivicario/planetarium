import * as THREE from "three";

import { CURVE_MAX_ALTITUDE, CURVE_MIN_ALTITUDE, PLANET_RADIUS } from "./constants";

import { geoInterpolate } from "d3-geo";

const DEGREE_TO_RADIAN = Math.PI / 180;

export function clamp(num, min, max) {
	return num <= min ? min : num >= max ? max : num;
}

export function coordinateToPosition(lat, lng, radius) {
	const phi = (90 - lat) * DEGREE_TO_RADIAN;
	const theta = (lng + 180) * DEGREE_TO_RADIAN;

	return new THREE.Vector3(
		-radius * Math.sin(phi) * Math.cos(theta),
		radius * Math.cos(phi),
		radius * Math.sin(phi) * Math.sin(theta)
	);
}

export function getSplineFromCoords(coords) {
	const startLat = coords[0];
	const startLng = coords[1];
	const endLat = coords[2];
	const endLng = coords[3];

	// spline vertices
	const start = coordinateToPosition(startLat, startLng, PLANET_RADIUS);
	const end = coordinateToPosition(endLat, endLng, PLANET_RADIUS);
	const altitude = clamp(
		start.distanceTo(end) * 0.75,
		CURVE_MIN_ALTITUDE,
		CURVE_MAX_ALTITUDE
	);
	const interpolate = geoInterpolate([startLng, startLat], [endLng, endLat]);
	const midCoord1 = interpolate(0.25);
	const midCoord2 = interpolate(0.75);
	const mid1 = coordinateToPosition(
		midCoord1[1],
		midCoord1[0],
		PLANET_RADIUS + altitude
	);
	const mid2 = coordinateToPosition(
		midCoord2[1],
		midCoord2[0],
		PLANET_RADIUS + altitude
	);

	return {
		start,
		end,
		spline: new THREE.CubicBezierCurve3(start, mid1, mid2, end)
	};
}
