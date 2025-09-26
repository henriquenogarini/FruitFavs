const BASE_URL = '/fv-api';

export async function getAll() {
    const r = await fetch(`${BASE_URL}/api/fruit/all`);
    if (!r.ok) throw new Error("Failed to fetch fruits");
    return r.json();
}

export async function getByName(name) {
    const r = await fetch(`${BASE_URL}/api/fruit/${encodeURIComponent(name)}`);
    if (!r.ok) throw new Error(`Failed to search fruits by name: ${name}`);
    return r.json();
}

export async function getByFamily(family) {
    const r = await fetch(`${BASE_URL}/api/fruit/family/${encodeURIComponent(family)}`);
    if (!r.ok) throw new Error(`Failed to search fruits by family: ${family}`);
    return r.json();
}

export async function getByGenus(genus) {
    const r = await fetch(`${BASE_URL}/api/fruit/genus/${encodeURIComponent(genus)}`);
    if (!r.ok) throw new Error(`Failed to search fruits by genus: ${genus}`);
    return r.json();
}

export async function getByOrder(order) {
    const r = await fetch(`${BASE_URL}/api/fruit/order/${encodeURIComponent(order)}`);
    if (!r.ok) throw new Error(`Failed to search fruits by order: ${order}`);
    return r.json();
}

export function mapFruit(f) {
    return {
        id: f.id,
        name: f.name,
        family: f.family,
        genus: f.genus,
        order: f.order,
        image: `https://source.unsplash.com/featured/?${encodeURIComponent(f.name)}%20fruit`,
    };
}
