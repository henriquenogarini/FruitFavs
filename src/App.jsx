import { useEffect, useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FruitGrid from './components/FruitGrid';
import FavoritesModal from './components/FavoriteModal';
import DetailModal from './components/DetailModal';
import {
  getAll,
  getByName,
  getByFamily,
  getByGenus,
  getByOrder,
  mapFruit
} from "./apiAdapter";
import './styles.css';

export default function App() {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [openFav, setOpenFav] = useState(false);
  const [selectedName, setSelectedName] = useState(null);

   useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const list = await getAll();
        if (!alive) return;
        setItems(list.map(mapFruit));
        setErr("");
      } catch (e) {
        if (!alive) return;
        setErr(e.message || "Error on loading fruits");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const handleSearch = async ({ mode, query }) => {
    const q = query.trim();
    if (!q) return;

    try {
      setLoading(true);
      setErr("");

      let results;

      switch (mode) {
        case "name":
          results = await getByName(q);
          break;
        case "family":
          results = await getByFamily(q);
          break;
        case "genus":
          results = await getByGenus(q);
          break;
        case "order":
          results = await getByOrder(q);
          break;
        default:
          results = await getAll();
      }
      const normalized = Array.isArray(results) ? results : [results];
      setItems(normalized.map(mapFruit));
    } catch (e) {
      setItems([]);
      setErr(e.message || "Error on searching fruits");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-box">
      <Header onOpenFavorites={() => setOpenFav(true)} />
      <main>
        <SearchBar onSearch={handleSearch} />
        {loading && <p>Loading...</p>}
        {!loading && err && <p className = "error">{err}</p>}
        {!loading && !err && (
          <FruitGrid
           items = {items} 
           onOpen={(name) => setSelectedName(name)}
          />
        )}
      </main>
      <FavoritesModal
        open={openFav}
        onClose={() => setOpenFav(false)}
        onOpenDetail={(name) => {
          setSelectedName(name);
          setOpenFav(false);
        }}
      />
      <DetailModal
        open={!!selectedName}
        name={selectedName}
        onClose={() => setSelectedName(null)}
      />
    </div>
  );
}