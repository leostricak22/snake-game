import { useEffect, useState } from 'react';

export default function Leaderboard() {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        fetch('http://192.168.253.191:5000/scores')
            .then(response => response.json())
            .then(data => {
                const sortedScores = data.sort((a, b) => b.maxScore - a.maxScore);
                setScores(sortedScores);
            })
            .catch(error => {
                console.error("Error fetching scores:", error);
            });
    }, []);

    return (
        <div className="leaderboard-container">
            <h3>Ljestvica</h3>
            <ul className="leaderboard-list">
                {scores.map((player, index) => (
                    <li key={player.id}>
                        <div>
                            {index + 1}. {player.name}
                        </div>
                        <div>
                            {player.maxScore}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
