import { writable } from 'svelte/store';

export const view = writable(0);
export const stationView = writable([]);
export const stationName = writable("Station View");
export const dataView = writable([]);