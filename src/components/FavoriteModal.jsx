import { useEffect } from "react";
import { useFavorites } from "../contexts/FavoriteContext";

export default function FavoritesModal({ open, onClose, onOpenDetail }) {
  const { favorites, toggleFavorite, clearFavorites } = useFavorites();
  
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <strong>Favorites ({favorites.length})</strong>
          <div style={{ display: "flex", gap: 8 }}>
            {favorites.length > 0 && (
              <button className="btn btn-danger" onClick={clearFavorites}>
                Clear all
              </button>
            )}
            <button className="btn" onClick={onClose} aria-label="Close">X</button>
          </div>
        </header>

        <div className="modal-content">
          {favorites.length === 0 ? (
            <p>No favorite fruits yet.</p>
          ) : (
            <ul className="fav-list">
              {favorites.map((f) => (
                <li key={f.id} className="fav-item">
                  <div className="fav-emoji">{f.image}</div>
                  <div className="fav-info">
                    <strong>{f.name}</strong>
                    <div className="muted">{f.family} • {f.genus}</div>
                  </div>
                  <div className="fav-actions">
                    <button className="btn" onClick={() => { onOpenDetail?.(f.name); }}>
                      Details
                    </button>
                    <button className="btn" onClick={() => toggleFavorite(f)}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
