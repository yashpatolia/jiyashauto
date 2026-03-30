import Database from 'better-sqlite3';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

// Ensure directories exist
const dbDir = join(process.cwd(), 'db');
const uploadsDir = join(process.cwd(), 'static', 'uploads');

if (!existsSync(dbDir)) mkdirSync(dbDir, { recursive: true });
if (!existsSync(uploadsDir)) mkdirSync(uploadsDir, { recursive: true });

const db = new Database(join(dbDir, 'jiyashauto.db'));

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Initialize schema
db.exec(`
  CREATE TABLE IF NOT EXISTS vehicles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year INTEGER NOT NULL,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    price REAL NOT NULL,
    mileage INTEGER NOT NULL,
    vin TEXT NOT NULL,
    description TEXT DEFAULT '',
    images TEXT DEFAULT '[]',
    is_sold INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS contact_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT DEFAULT '',
    inquiry_type TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

// Migrate: add new columns if they don't exist yet
const existingCols = (db.prepare('PRAGMA table_info(vehicles)').all() as { name: string }[]).map(
	(c) => c.name
);
const newCols: [string, string][] = [
	['fuel_type', 'TEXT DEFAULT ""'],
	['transmission', 'TEXT DEFAULT ""'],
	['drive_type', 'TEXT DEFAULT ""'],
	['ext_color', 'TEXT DEFAULT ""'],
	['int_color', 'TEXT DEFAULT ""'],
	['engine', 'TEXT DEFAULT ""'],
	['is_public', 'INTEGER DEFAULT 1']
];
for (const [col, def] of newCols) {
	if (!existingCols.includes(col)) {
		db.exec(`ALTER TABLE vehicles ADD COLUMN ${col} ${def}`);
	}
}

// Seed if empty
const vehicleCount = (db.prepare('SELECT COUNT(*) as count FROM vehicles').get() as { count: number }).count;

if (vehicleCount === 0) {
	const insert = db.prepare(`
    INSERT INTO vehicles
      (year, make, model, price, mileage, vin, description, images, is_sold,
       fuel_type, transmission, drive_type, ext_color, int_color, engine)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

	const seedVehicles = [
		{
			year: 2019, make: 'Honda', model: 'Civic LX',
			price: 16995, mileage: 72400, vin: '2HGFC2F59KH543821',
			description: 'Well-maintained 2019 Honda Civic LX in excellent condition. Features Apple CarPlay, Android Auto, backup camera, and Honda Sensing safety suite. Recent oil change and brake inspection completed. Clean Carfax — no accidents, single owner.',
			images: '[]', is_sold: 0,
			fuel_type: 'Gasoline', transmission: 'CVT', drive_type: 'FWD',
			ext_color: 'Lunar Silver', int_color: 'Black', engine: '2.0L DOHC i-VTEC'
		},
		{
			year: 2020, make: 'Toyota', model: 'RAV4 XLE',
			price: 27500, mileage: 54800, vin: '2T3P1RFV4LC056732',
			description: 'Sporty and reliable 2020 Toyota RAV4 XLE AWD. Loaded with Toyota Safety Sense 2.0, adaptive cruise control, heated front seats, and 8-inch touchscreen with wireless Apple CarPlay. Tires replaced at 48,000 km.',
			images: '[]', is_sold: 0,
			fuel_type: 'Gasoline', transmission: 'Automatic', drive_type: 'All-Wheel Drive',
			ext_color: 'Blueprint', int_color: 'Black', engine: '2.5L 4-Cylinder'
		},
		{
			year: 2018, make: 'Ford', model: 'F-150 XLT',
			price: 31900, mileage: 89200, vin: '1FTEW1EP5JFB12045',
			description: 'Powerful 2018 Ford F-150 XLT SuperCrew 4x4 with 3.5L EcoBoost V6. Features Class IV trailer tow package, SYNC 3 infotainment, remote start, and spray-in bed liner.',
			images: '[]', is_sold: 0,
			fuel_type: 'Gasoline', transmission: 'Automatic', drive_type: '4WD',
			ext_color: 'Oxford White', int_color: 'Medium Earth Gray', engine: '3.5L EcoBoost V6'
		},
		{
			year: 2021, make: 'Hyundai', model: 'Elantra Preferred',
			price: 19800, mileage: 38600, vin: '5NPD84LF5MH319047',
			description: 'Like-new 2021 Hyundai Elantra Preferred with only 38,600 km. Equipped with blind-spot warning, rear cross-traffic alert, wireless phone charging, sunroof, and heated steering wheel. Factory warranty included.',
			images: '[]', is_sold: 0,
			fuel_type: 'Gasoline', transmission: 'Automatic', drive_type: 'FWD',
			ext_color: 'Phantom Black', int_color: 'Black', engine: '2.0L MPI'
		}
	];

	const insertMany = db.transaction((vehicles: typeof seedVehicles) => {
		for (const v of vehicles) {
			insert.run(
				v.year, v.make, v.model, v.price, v.mileage, v.vin,
				v.description, v.images, v.is_sold,
				v.fuel_type, v.transmission, v.drive_type, v.ext_color, v.int_color, v.engine
			);
		}
	});

	insertMany(seedVehicles);
}

export type Vehicle = {
	id: number;
	year: number;
	make: string;
	model: string;
	price: number;
	mileage: number;
	vin: string;
	description: string;
	images: string;
	is_sold: number;
	is_public: number;
	created_at: string;
	fuel_type: string;
	transmission: string;
	drive_type: string;
	ext_color: string;
	int_color: string;
	engine: string;
};

export type ContactSubmission = {
	id: number;
	name: string;
	email: string;
	phone: string;
	inquiry_type: string;
	message: string;
	created_at: string;
};

export default db;
