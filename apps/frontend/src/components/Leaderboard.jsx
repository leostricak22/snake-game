import { useEffect, useState } from 'react';

export default function Leaderboard() {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL)
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
                {scores.length === 0 ?
                    <p className="loading">Učitavanje...</p>
                    :
                scores.map((player, index) => (
                    <li key={player.id}>
                        <div>
                            {index === 0
                                ? "🥇"
                            : index === 1
                                ? "🥈"
                            : index === 2
                                ? "🥉"
                            : `${index + 1}.`} {player.name}
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
