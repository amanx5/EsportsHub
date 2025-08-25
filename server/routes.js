import {Router} from 'express';
import trendinggamesrouter from './api/trendinggames.js';

const router = Router();

// every api hit will first need to go through following middlewares
// 1. logging - optional
// 2. authentication - dependent on the request, some apis may not need authentication 
// 3. db connection - dependent on the request, some apis may not need db connection

// mount routers (attaching one router onto another at a specific path prefix.)
// Whenever the request URL starts with /api/trendinggames, pass control to childRouter trendinggamesrouter to handle the rest.
router.use('/api/trendinggames', trendinggamesrouter);

export default router;