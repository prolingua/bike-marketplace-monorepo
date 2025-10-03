import { Router } from 'express';
import type { BikeListing } from '@shared/types.js';
import { parseSearchQuery } from '../../lib/llmSearchParser.js';

const listingRouter: Router = Router();

/**
 * @swagger
 * /listings:
 *   get:
 *     summary: Get all bike listings
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Natural language search query (e.g. "Electric bikes under £500 for commuting")
 *     responses:
 *       200:
 *         description: A paginated list of bike listings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 listings:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/BikeListing'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 */

listingRouter.get('/', async (_req, res) => {

  const page = parseInt(_req.query.page as string) || 1;
  const limit = parseInt(_req.query.limit as string) || 10;
  const start = (page - 1) * limit;
  const end = start + limit;

  const rawQuery = (_req.query.search as string) || '';
  const { keywords, filters } = await parseSearchQuery(rawQuery);

  const listings: BikeListing[] = Array.from({ length: 100 }, (_, i) => ({
    id: `bike-${String(i + 1).padStart(3, '0')}`,
    title: generateTitle(i),
    price: generatePrice(i),
    description: generateDescription(i),
  }));

  const filtered = listings.filter((bike) => {
    const matchesKeyword =
      keywords.length === 0 ||
      keywords.some((kw) =>
        `${bike.title} ${bike.description}`.toLowerCase().includes(kw.toLowerCase())
      );

    const matchesPrice =
      filters.priceMax === undefined || bike.price <= filters.priceMax;

    const matchesType =
      filters.type === undefined || bike.title.toLowerCase().includes(filters.type.toLowerCase());

    return matchesKeyword && matchesPrice && matchesType;
    });

  // ⏳ Fake delay
    await new Promise((resolve) => setTimeout(resolve, 1500)); // 1.5 seconds

    const pagedListings = filtered.slice(start, end);

    res.json({
      listings: pagedListings,
      total: filtered.length,
      page,
      limit,});
});

function generateTitle(i: number): string {
  const brands = ['Trek', 'Specialized', 'Giant', 'Cannondale', 'Scott', 'Bianchi', 'Raleigh', 'Cube'];
  const types = ['Road Bike', 'Mountain Bike', 'Hybrid', 'Gravel Bike', 'Electric Bike', 'Commuter Bike', 'Touring Bike'];
  return `${brands[i % brands.length]} ${types[i % types.length]} ${2020 + (i % 6)}`;
}

function generatePrice(i: number): number {
  const base = 200 + (i % 40) * 15;
  return Math.floor(base + Math.random() * 150);
}

function generateDescription(i: number): string {
  const features = [
    'lightweight aluminum frame',
    'carbon fork for vibration damping',
    'hydraulic disc brakes',
    'Shimano 105 groupset',
    'tubeless-ready wheels',
    'integrated lights and rack',
    'responsive suspension system',
    'ergonomic saddle and grips',
  ];
  const useCase = i % 2 === 0 ? 'urban commuting' : 'weekend trail rides';
  return `This bike features ${features[i % features.length]} and is ideal for ${useCase}.`;
}

export default listingRouter;
