import { useFavorites } from "../contexts/FavoriteContext";

export default function Header({ onOpenFavorites = () => {} }) {
  const { favorites } = useFavorites();
  const handleLogoClick = () => window.location.reload();

  return (
    <header className="header">
      <div className="logo" onClick={handleLogoClick} title="Voltar ao início">
        <span className="logo-fruit left">🍎</span>
        <h1 className="logo-text">FruitFavs</h1>
        <span className="logo-fruit right">🍌</span>
      </div>
      <button className="btn" onClick={onOpenFavorites} aria-haspopup="dialog">
        ★ {favorites.length}
      </button>
    </header>
  );
}
 