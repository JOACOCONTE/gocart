// Almacenamiento en servidor sin BD (para hosting sin PostgreSQL)
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), '.data');

// Asegurar que el directorio existe
function ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
}

export const serverStorage = {
    // Banner
    banners: {
        getAll: () => {
            ensureDataDir();
            const file = path.join(DATA_DIR, 'banners.json');
            if (!fs.existsSync(file)) return [];
            try {
                return JSON.parse(fs.readFileSync(file, 'utf8'));
            } catch {
                return [];
            }
        },
        getLatest: () => {
            const banners = serverStorage.banners.getAll();
            return banners.length > 0 ? banners[banners.length - 1] : null;
        },
        save: (data) => {
            ensureDataDir();
            const file = path.join(DATA_DIR, 'banners.json');
            const banners = serverStorage.banners.getAll();
            const newBanner = {
                id: Date.now().toString(),
                ...data,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            banners.push(newBanner);
            fs.writeFileSync(file, JSON.stringify(banners, null, 2));
            return newBanner;
        },
        update: (id, data) => {
            ensureDataDir();
            const file = path.join(DATA_DIR, 'banners.json');
            const banners = serverStorage.banners.getAll();
            const index = banners.findIndex(b => b.id === id);
            if (index === -1) return null;
            banners[index] = { ...banners[index], ...data, updatedAt: new Date().toISOString() };
            fs.writeFileSync(file, JSON.stringify(banners, null, 2));
            return banners[index];
        },
        delete: (id) => {
            ensureDataDir();
            const file = path.join(DATA_DIR, 'banners.json');
            const banners = serverStorage.banners.getAll();
            const filtered = banners.filter(b => b.id !== id);
            fs.writeFileSync(file, JSON.stringify(filtered, null, 2));
            return true;
        }
    },

    // Hero
    heroes: {
        getAll: () => {
            ensureDataDir();
            const file = path.join(DATA_DIR, 'heroes.json');
            if (!fs.existsSync(file)) return [];
            try {
                return JSON.parse(fs.readFileSync(file, 'utf8'));
            } catch {
                return [];
            }
        },
        getLatest: () => {
            const heroes = serverStorage.heroes.getAll();
            return heroes.length > 0 ? heroes[heroes.length - 1] : null;
        },
        save: (data) => {
            ensureDataDir();
            const file = path.join(DATA_DIR, 'heroes.json');
            const heroes = serverStorage.heroes.getAll();
            const newHero = {
                id: Date.now().toString(),
                ...data,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            heroes.push(newHero);
            fs.writeFileSync(file, JSON.stringify(heroes, null, 2));
            return newHero;
        },
        update: (id, data) => {
            ensureDataDir();
            const file = path.join(DATA_DIR, 'heroes.json');
            const heroes = serverStorage.heroes.getAll();
            const index = heroes.findIndex(h => h.id === id);
            if (index === -1) return null;
            heroes[index] = { ...heroes[index], ...data, updatedAt: new Date().toISOString() };
            fs.writeFileSync(file, JSON.stringify(heroes, null, 2));
            return heroes[index];
        },
        delete: (id) => {
            ensureDataDir();
            const file = path.join(DATA_DIR, 'heroes.json');
            const heroes = serverStorage.heroes.getAll();
            const filtered = heroes.filter(h => h.id !== id);
            fs.writeFileSync(file, JSON.stringify(filtered, null, 2));
            return true;
        }
    }
};
