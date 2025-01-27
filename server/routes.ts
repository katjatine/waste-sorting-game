import type { Express } from "express";
import { createServer, type Server } from "http";
import { initializeWasteData } from "../client/src/lib/scrapeWasteData";

export function registerRoutes(app: Express): Server {
  app.get('/api/waste-items', async (_req, res) => {
    try {
      const wasteItems = await initializeWasteData();
      res.json(wasteItems);
    } catch (error) {
      console.error('Error fetching waste items:', error);
      res.status(500).json({ error: 'Failed to fetch waste items' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}