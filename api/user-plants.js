import { ensureUserSchema, getOwnedPlantsByUserId, updateOwnedPlantsByUserId } from './lib/userStore.js';

export default async function handler(req, res) {
  try {
    await ensureUserSchema();

    if (req.method === 'GET') {
      const userId = Number(req.query?.userId);
      if (!Number.isFinite(userId)) {
        res.status(400).json({ error: 'Valid userId is required.' });
        return;
      }

      const ownedPlants = await getOwnedPlantsByUserId(process.env, userId);
      if (ownedPlants === null) {
        res.status(404).json({ error: 'User not found.' });
        return;
      }

      res.status(200).json({ ownedPlants });
      return;
    }

    if (req.method === 'PUT') {
      const userId = Number(req.body?.userId);
      const ownedPlants = req.body?.ownedPlants;

      if (!Number.isFinite(userId) || !Array.isArray(ownedPlants)) {
        res.status(400).json({ error: 'userId and ownedPlants[] are required.' });
        return;
      }

      const arePlantIdsValid = ownedPlants.every((plantId) => typeof plantId === 'string');
      if (!arePlantIdsValid) {
        res.status(400).json({ error: 'ownedPlants must contain string IDs.' });
        return;
      }

      const updatedPlants = await updateOwnedPlantsByUserId(process.env, userId, ownedPlants);
      if (updatedPlants === null) {
        res.status(404).json({ error: 'User not found.' });
        return;
      }

      res.status(200).json({ ownedPlants: updatedPlants });
      return;
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('User plants API error:', error);
    res.status(500).json({ error: 'Unable to process plant ownership request.' });
  }
}
