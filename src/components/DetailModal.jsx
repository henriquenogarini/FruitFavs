import { useEffect, useState } from "react";
import { getByName, mapFruit } from "../apiAdapter";
import { useFavorites } from "../contexts/FavoriteContext";

export default function DetailModal({ open, name, onClose }) {
  const [fruit, setFruit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = fruit ? isFavorite(fruit.id) : false;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    let alive = true;
    if (!open || !name) return;

    (async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await getByName(name);
        if (!alive) return;
        setFruit(mapFruit(data));
      } catch (e) {
        if (!alive) return;
        setErr(e.message || "Failed to load details");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => { alive = false; };
  }, [open, name]);

  if (!open) return null;

  return (
    <div className="backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <strong>{name}</strong>
          <button className="btn" onClick={onClose} aria-label="Fechar">X</button>
        </header>

        <div className="modal-content">
          {loading && <p>Loading...</p>}
          {err && <p className="error">{err}</p>}

          {!loading && !err && fruit && (
            <div className="detail-layout">
              <div className="detail-hero">{fruit.image}</div>

              <div className="detail-info">
                <div className="detail-tags">
                  <span className="tag">Family: <b>{fruit.family}</b></span>
                  <span className="tag">Genus: <b>{fruit.genus}</b></span>
                  <span className="tag">Order: <b>{fruit.order}</b></span>
                </div>

                <h4>Nutritions (per 100g)</h4>
                <table className="nutri-table">
                  <tbody>
                    <tr><td>Calories</td><td>{fruit.nutritions?.calories}</td></tr>
                    <tr><td>Carbohydrates</td><td>{fruit.nutritions?.carbohydrates} g</td></tr>
                    <tr><td>Protein</td><td>{fruit.nutritions?.protein} g</td></tr>
                    <tr><td>Fat</td><td>{fruit.nutritions?.fat} g</td></tr>
                    <tr><td>Sugar</td><td>{fruit.nutritions?.sugar} g</td></tr>
                  </tbody>
                </table>

                <div className="actions">
                  <button
                    className={`btn ${fav ? "btn-primary" : ""}`}
                    onClick={() =>
                      toggleFavorite({
                        id: fruit.id,
                        name: fruit.name,
                        image: fruit.image,
                        family: fruit.family,
                        genus: fruit.genus,
                      })
                    }
                  >
                    {fav ? "☆ Remove From Favorites" : "★ Add to Favorites"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
