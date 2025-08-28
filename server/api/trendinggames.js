import { Router } from "express";
import { db } from '../utility/dbconnector.js';

const router = Router();


router.get('/', trendingGames);

async function trendingGames(req, res) {
    let tournamentPlayers = db.collection('tournamentPlayers');
    let result = await tournamentPlayers.aggregate([
        {
            $lookup: {
                from: "tournament",
                localField: "tournamentId",
                foreignField: "_id",
                as: "tournament"
            }
        },
        { $unwind: "$tournament" },
        {
            $group: {
                _id: "$tournament.gameId",
                totalPlayers: { $sum: 1 }
            }
        },
        {
            $lookup: {
                from: "game",
                localField: "_id",
                foreignField: "_id",
                as: "game"
            }
        },
        { $unwind: "$game" },
        {
            $project: {
                gameId: "$_id",
                totalPlayers: 1,
                game: 1,
                _id: 0
            }
        },
        { $sort: { totalPlayers: -1 } },
        { $limit: 10 }
    ]).toArray();


    res.json(result);
}

export default router;