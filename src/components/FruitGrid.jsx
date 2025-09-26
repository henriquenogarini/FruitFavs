import { useFavorites } from "../contexts/FavoriteContext";

export default function FruitGrid({ items, onOpen }) {
  const { toggleFavorite, isFavorite } = useFavorites();

  if (items.length === 0) {
    return <p>No items found. Try a different search.</p>;
  }

  return (
    <div className="grid">
      {items.map(f => {
        const fav = isFavorite(f.id);
        return (
          <div
            key={f.id}
            className="card"
            onClick={() => onOpen?.(f.name)}
            title="See Details"
          >
            <div className="emoji-image">
              {f.image}
              <button
                className={`fav-btn ${fav ? "on" : ""}`}
                aria-pressed={fav}
                aria-label={fav ? "Remove from favorites" : "Add to favorites"}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite({ id: f.id, name: f.name, image: f.image, family: f.family, genus: f.genus });
                }}
              >
                {fav ? "★" : "☆"}
              </button>
            </div>
            <div className="body">
              <h3 className="title">{f.name}</h3>
              <p className="muted">{f.family} • {f.genus}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}