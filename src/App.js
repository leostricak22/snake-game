import Gameboard from "./components/Gameboard";
import sign from "./assets/sign.png";
import {useState} from "react";

function App() {
    const [playerPosition, setPlayerPosition] = useState({
        positions: [{ x: 5, y: 5 }],
        direction: 'r'
    });

    return (
        <div id="main">
            <Gameboard playerPosition={playerPosition} setPlayerPosition={setPlayerPosition} />
            <div className="signContainer">
                <h2 className="top-left">{playerPosition.positions.length-3}</h2>
                <img src={sign} alt={"sign"} className="signImage"/>
            </div>
        </div>
    );
}

export default App;
