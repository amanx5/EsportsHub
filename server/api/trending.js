import { Router } from 'express';
import { db } from '../utility/dbconnector.js';

const router = Router();
router.get('/', getTrending);
export default router;

async function getTrending(req, res) {
	console.log('trending api called');
	const limit = parseInt(req.query.limit) || 5;
	; // to do: make it configurable via req.query

	const gamesWithTournaments = await db
		.collection('tournament')
		// gameId is made index in tournament collection to optimize this query
		.aggregate([{ $group: { _id: '$gameId' } }, { $count: 'count' }])
		.toArray();

	let cursor;
	const gamesWithTournamentsCount = gamesWithTournaments[0]?.count ?? 0;

	if (gamesWithTournamentsCount >= limit) {
		// Run performant pipeline
		cursor = db.collection('tournament').aggregate([
			{
				// project only id and gameId
				$project: { _id: 1, gameId: 1 },
			},
			{
				// Join with tournamentPlayers collection to count players in each tournament
				$lookup: {
					from: 'tournamentPlayers', // join with tournamentPlayers collection
					localField: '_id',
					foreignField: 'tournamentId',
					pipeline: [
						{ $count: 'count' }, // Instead of returning docs, $count produces a single object like { count: 2 }.
					],
					as: 'tournamentPlayersCount', // $lookup results in an array, so tournamentPlayersCount will be either like [ { "count": 2 } ] or [] (if no players).
				},
			},
			{
				// Add (or overwrite) a new field tournamentPlayersCount, which is either the count value from the array (if exists) or 0 (if no players).
				$addFields: {
					tournamentPlayersCount: {
						$ifNull: [
							{
								$arrayElemAt: [
									'$tournamentPlayersCount.count',
									0,
								],
							}, // gets the first element’s count value from the array. Example: [ { "count": 2 } ] → 2 or if empty array → null
							0, // if null, replace with 0
						],
					},
				},
			},
			{
				// group by gameId and sum up tournamentPlayersCount for each gameId
				$group: {
					_id: '$gameId',
					totalPlayers: { $sum: '$tournamentPlayersCount' },
					totalTournaments: { $sum: 1 },
				},
			},
			{
				$sort: { totalPlayers: -1, totalTournaments: -1 },
			},
			{
				$limit: limit,
			},
			{
				// lookup game details from games collection
				$lookup: {
					from: 'game',
					localField: '_id',
					foreignField: '_id',
					as: 'game',
					// project only name and image fields
					pipeline: [{ $project: { _id: 0, name: 1 } }],
				},
			},
			{
				// unwind the game array to get single object per document
				$unwind: '$game',
			},
			{
				// project final fields
				$project: {
					_id: 1,
					name: '$game.name',
					totalPlayers: 1,
					totalTournaments: 1,
				},
			},
		]);
	} else {
		// Run simple pipeline, as there are less than 5 games with tournaments
		cursor = db.collection('game').aggregate([
			{
				$project: { _id: 1, name: 1 },
			},
			{
				$lookup: {
					from: 'tournament',
					localField: '_id',
					foreignField: 'gameId',
					pipeline: [
						{
							$lookup: {
								from: 'tournamentPlayers',
								localField: '_id',
								foreignField: 'tournamentId',
								pipeline: [
									{ $count: 'count' }, // count players for each tournament
								],
								as: 'players',
							},
						},
						{
							$addFields: {
								playersCount: {
									$ifNull: [
										{ $arrayElemAt: ['$players.count', 0] },
										0,
									],
								},
							},
						},
						{
							$project: { _id: 1, playersCount: 1 },
						},
					],
					as: 'tournaments',
				},
			},
			{
				$addFields: {
					totalPlayers: { $sum: '$tournaments.playersCount' },
					totalTournaments: { $size: '$tournaments' },
				},
			},
			{
				$project: { tournaments: 0 },
			},
			{
				$sort: { totalPlayers: -1, totalTournaments: -1 },
			},
			{
				$limit: limit,
			},
		]);
	}

	let result = await cursor.toArray();
	res.json(result);
}
