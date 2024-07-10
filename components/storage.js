const SAVED_CARDS_KEY = 'savedCards';

export const getSavedCards = () => {
  try {
    const savedCards = localStorage.getItem(SAVED_CARDS_KEY);
    console.log('Raw saved cards from localStorage:', savedCards);
    if (!savedCards) return [];
    const parsedCards = JSON.parse(savedCards);
    console.log('Parsed saved cards:', parsedCards);
    return Array.isArray(parsedCards) ? parsedCards : [];
  } catch (error) {
    console.error('Error retrieving saved cards:', error);
    return [];
  }
};

export const saveCard = (card) => {
  if (!card || typeof card !== 'object') {
    console.error('Attempted to save invalid card:', card);
    return;
  }
  try {
    const savedCards = getSavedCards();
    const updatedCards = [...savedCards, card];
    localStorage.setItem(SAVED_CARDS_KEY, JSON.stringify(updatedCards));
    console.log('Saved card successfully:', card);
    emitStorageUpdate();
  } catch (error) {
    console.error('Error saving card:', error);
  }
};

export const removeCard = (cardToRemove) => {
  try {
    const savedCards = getSavedCards();
    const updatedCards = savedCards.filter(card => 
      card.date !== cardToRemove.date || card.title !== cardToRemove.title
    );
    localStorage.setItem(SAVED_CARDS_KEY, JSON.stringify(updatedCards));
    console.log('Removed card successfully:', cardToRemove);
    emitStorageUpdate();
  } catch (error) {
    console.error('Error removing card:', error);
  }
};

export const isCardSaved = (cardToCheck) => {
  const savedCards = getSavedCards();
  return savedCards.some(card => 
    card.date === cardToCheck.date && card.title === cardToCheck.title
  );
};

export const emitStorageUpdate = () => {
  window.dispatchEvent(new Event('storageUpdate'));
};