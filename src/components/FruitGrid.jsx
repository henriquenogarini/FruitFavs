export default function FruitGrid({ items, onOpen }) {
  if (items.length === 0) {
    return <p>No items found. Try a different search.</p>;
  }

   return (
    <div className="grid">
      {items.map(f => (
        <div key={f.id} className="card" onClick={() => onOpen?.(f.name)} title="Ver detalhes">
          <img className="thumb" src={f.image} alt={f.name} loading="lazy" />
          <div className="body">
            <h3 className="title">{f.name}</h3>
            <p className="muted">{f.family} • {f.genus}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
