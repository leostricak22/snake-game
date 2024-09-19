const { Score } = require('../models');

const getScores = async (req, res) => {
    try {
        const scores = await Score.findAll();
        res.status(200).json(scores);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve scores.' });
    }
};

const addScore = async (req, res) => {
    const { name, maxScore } = req.body;
    try {
        const existingScore = await Score.findOne({ where: { name } });

        if (existingScore) {
            if (maxScore > existingScore.maxScore) {
                existingScore.maxScore = maxScore;
                await existingScore.save();
            }
            res.status(200).json(existingScore);
        } else {
            const newScore = await Score.create({ name, maxScore });
            res.status(201).json(newScore);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to add or update score.' });
    }
};

module.exports = {
    getScores,
    addScore,
};
