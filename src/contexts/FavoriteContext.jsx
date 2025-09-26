import { createContext, useContext, useEffect, useReducer } from "react";

function favoriteReducer(state, action) {
  switch (action.type) {
    case "toggle": {
        const exists = state.some(f => f.id === action.payload.id);
        return exists ? state.filter(f => f.id !== action.payload.id) : [...state, action.payload];
    }
    case "clear":
      return [];
    default:
      return state;
  }
}

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
    const [favorites, dispatch] = useReducer(
    favoriteReducer,
    [],
    () => {
      try { return JSON.parse(localStorage.getItem("favorites") || "[]"); }
      catch { return []; }
    }
  );

    useEffect(() => {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const value = { favorites,
        toggleFavorite: (fruit) => dispatch({ type: "toggle", payload: fruit }),
        clearFavorites: () => dispatch({ type: "clear" }),
        isFavorite: (id) => favorites.some(f => f.id === id)
    };

    return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFavorites = () => useContext(FavoriteContext);