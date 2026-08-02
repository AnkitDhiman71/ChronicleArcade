export const getFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem('arcade_favs') || '[]');
  } catch (err) {
    return [];
  }
};

export const isFavorite = (gameId) => {
  const favs = getFavorites();
  return favs.includes(String(gameId));
};

export const toggleFavorite = (gameId) => {
  const favs = getFavorites();
  const idStr = String(gameId);
  let updated;

  if (favs.includes(idStr)) {
    updated = favs.filter((id) => id !== idStr);
  } else {
    updated = [...favs, idStr];
  }

  localStorage.setItem('arcade_favs', JSON.stringify(updated));
  return updated.includes(idStr);
};
