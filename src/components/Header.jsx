import { useFavorites } from "../contexts/FavoriteContext";

export default function Header({ onOpenFavorites = () => {} }) {
  const { favorites } = useFavorites();
  return (
    <header className="header">
      <h1>FruitFavs</h1>
       <button className="btn" onClick={onOpenFavorites} aria-haspopup="dialog">
        ★ {favorites.length}
         </button>
    </header>
  );
}
