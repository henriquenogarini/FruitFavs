const BASE_URL = '/fv-api';
const IMG_SIZE = 400;

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

    const fruits = {
        'Apple': '🍎',
        'GreenApple': '🍏',  
        'Banana': '🍌',
        'Orange': '🍊',
        'Strawberry': '🍓',
        'Grape': '🍇',
        'Pineapple': '🍍',
        'Watermelon': '🍉',
        'Peach': '🍑',
        'Lemon': '🍋',
        'Cherry': '🍒',
        'Kiwi': '🥝',
        'Kiwifruit': '🥝',   
        'Mango': '🥭',
        'Avocado': '🥑',
        'Pear': '🍐',
        'Blueberry': '🫐',
        'Blackberry': '🫐',
        'Raspberry': '🍓',
        'Papaya': '🧡',
        'Lime': '🍋',
        'Plum': '🍇',
        'Apricot': '🍑',
        'Fig': '🍇',
        'Pomegranate': '❤️',
        'Cranberry': '🔴',
        'Tangerine': '🍊',
        'Persimmon': '🧡',
        'Japanese Persimmon': '🧡',  
        'Guava': '🍑',
        'Passionfruit': '💜',  
        'Durian': '🟤',
        'Jackfruit': '🟡',
        'Dragonfruit': '🩷',
        'Pitahaya': '🩷',      
        'Lychee': '🩷',
        'Lingonberry': '🔴',
        'Gooseberry': '🟢',
        'Ceylon Gooseberry': '🟢',  
        'Feijoa': '🟢',
        'Morus': '🟣',         
        'Tomato': '🍅',        
        'Melon': '🍈',         
        'Horned Melon': '🍈',  
        'Pomelo': '🍊',        
        'Mangosteen': '🟣',    
        'Pumpkin': '🎃',       
        'Hazelnut': '🌰',      
        'Annona': '💚'
    };
    
    const emoji = fruits[f.name] || '🍎';
    
    return {
        id: f.id,
        name: f.name,
        family: f.family,
        genus: f.genus,
        order: f.order,
        image: fruits[f.name] || '🍎'
    };
}
