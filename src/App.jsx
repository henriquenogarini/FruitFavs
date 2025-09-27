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
  const [summary, setSummary] = useState("Showing all fruits");

  const loadAllFruits = async () => {
    let alive = true;
    try {
      setLoading(true);
      setErr("");
      const list = await getAll();
      if (!alive) return;
      setItems(list.map(mapFruit));
      setSummary(`Showing all fruits (${list.length})`);
    } catch (e) {
      if (!alive) return;
      setErr(e.message || "Error on loading fruits");
      setSummary("");
      setItems([]);
    } finally {
      if (alive) setLoading(false);
    }
    return () => { alive = false; };
  };

   useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const list = await getAll();
        if (!alive) return;
        setItems(list.map(mapFruit));
        setErr("");
        setSummary(`Showing all fruits (${list.length})`);
      } catch (e) {
        if (!alive) return;
        setErr(e.message || "Error on loading fruits");
        setSummary("");
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
      const arr = normalized.map(mapFruit);
      setItems(arr);
      setSummary(`Found ${arr.length} results for "${q}" in ${mode}`);
    } catch (e) {
      setItems([]);
      setErr(e.message || "Error on searching fruits");
      setSummary(`Results: 0 in ${mode}: "${q}"`);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-box">
      <Header onOpenFavorites={() => setOpenFav(true)} onLogoClick={loadAllFruits} />
      <main>
        <SearchBar onSearch={handleSearch} error={err} loading={loading} />
        {!loading && !err && (<div className="result-info">{summary}</div>)}
        {loading && <div><span className="spinner" aria-label="Loading"></span> Loading…</div>}
        {!loading && !err && items.length === 0 && ( <p className="empty">No fruits to show.</p>)}
        {!loading && !err && items.length > 0 && (
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