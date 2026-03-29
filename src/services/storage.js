const SETTINGS_KEY = 'iq_settings_v1';
const FAVORITES_KEY = 'iq_favorites_v1';

export function readSettings(defaults) {
  try {
    const value = localStorage.getItem(SETTINGS_KEY);
    return value ? { ...defaults, ...JSON.parse(value) } : defaults;
  } catch {
    return defaults;
  }
}

export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function readFavorites() {
  try {
    const value = localStorage.getItem(FAVORITES_KEY);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

export function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}
