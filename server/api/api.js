import { Router } from 'express';
import { db } from '../utility/dbconnector.js';

const router = Router();
router.get('/', handler);
export default router;

async function handler(req, res) {
	console.log('hello world');
    res.json({ message: 'Hello from base API' });
}
