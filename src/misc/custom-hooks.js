import { useReducer, useEffect } from 'react';
function showsReducer(prevState, action) {
  switch (action.type) {
    case 'ADD': {
      return [...prevState, action.showId];
    }
    case 'Remove': {
      return prevState.filter(showId => showId !== action.showId);
    }

    default:
      return prevState;
  }
}

function usePersistedReducer(reducer, initialState, key) {
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const persisted = localStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}

export function useShows(key = 'show') {
  return usePersistedReducer(showsReducer, [], key);
}

//So we create a new hook useShows that has an optional argument key
// which is passed to usePersistedReducer as lsKey and which default to 'shows'.
// Also we defined an empty array [] as initial state that will be used by usePersistedReducer
//if local storage doesn't have any value under key.
// Now, instead of using usePersistedReducer directly, you can just write:
