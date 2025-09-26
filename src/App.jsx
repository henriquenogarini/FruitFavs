import Header from './components/Header';
import SearchBar from './components/SearchBar';
import './styles.css';

export default function App() {

  const handleSearch = async () => {
    await new Promise((r) => setTimeout(r, 300));
    throw new Error("Simulated API failure");
  };

  return (
    <div className="app-box">
      <Header />
      <main>
        <SearchBar onSearch={handleSearch} />
      </main>
    </div>
  );
}