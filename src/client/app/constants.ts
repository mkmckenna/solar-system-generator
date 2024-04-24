/**
 * We define all constants here that are used to building the solar system.
 * This file provides an easy central location for configuring different solar system types. 
 */

// ---- DEBUG ----
export const WIREFRAME = false
export const GRID = false

// ---- SOLAR SYSTEM CONSTANTS ----
export const SKYBOX_ENABLED = true
export const ATMOSPHERES_ENABLED = false


// ---- PLANET CONSTANTS ----
// Distance from star
export const MIN_PLANET_COUNT = 3
export const MAX_PLANET_COUNT = 10
// Distance from star (star radii multiplier)
export const MIN_DISTANCE_MULTIPLIER_FROM_STAR = 3
export const MAX_DISTANCE_MULTIPLIER_FROM_STAR = 20
// Orbital velocity
export const MIN_ORBITAL_VELOCITY = 0.001
export const MAX_ORBITAL_VELOCITY = 0.005


// ---- STAR CONSTANTS ----
export const STAR_ENABLED = true
export const STAR_RADIUS_MIN = 50
export const STAR_RADIUS_MAX = 100