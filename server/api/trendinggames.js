import { Router  } from "express";  
import {db} from '../utility/dbconnector.js';

const router = Router();


router.get('/', trendingGames);

function trendingGames (req, res) {
    console.log('Received request for trending games');
    db;
    let json;


    res.json(json);
}

export default router;