import { useEffect, useState } from "react";
import classes from "./ControlPanel.module.scss"
import { useDispatch, useSelector } from 'react-redux';
import Button from "../UI/button/Button";
import { actions } from "../../state/slice/matrixContent.slice";

import flagImage from "../../assets/flag.svg";
import reloadImage from '../../assets/reload.png';
import standartComplexityImage from '../../assets/standart.png';
import difficultComplexityImage from '../../assets/difficult.png';
import madlyComplexityImage from '../../assets/madly.png';

const ControlPanel = ({ switchTimer, setSwitchTimer, clickMode, setClickMode }) => {
    const dispatch = useDispatch();

    const matrix = useSelector(state => state.matrixContent);

    const [time, setTime] = useState("00:00");
    const [complexityImage, setComplexityImage] = useState(standartComplexityImage);
    const [matrixSize, setMatrixSize] = useState({
        rows: matrix.value.matrix.length,
        columns: matrix.value.matrix[0].length
    })

    function resetMatrix() {
        dispatch(actions.resetMatrix());
        dispatch(actions.fillWithContent());
        setSwitchTimer(false);
    }

    useEffect(() => {
        let timerInterval

        if (switchTimer) {
            const startTime = new Date();
            timerInterval = setInterval(() => {
                const currentTime = new Date();
                const timeDifference = currentTime - startTime;
                const minutes = Math.floor((timeDifference / 1000 / 60) % 60).toString();
                const seconds = Math.floor((timeDifference / 1000) % 60).toString();
                setTime(`${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`)
            }
                , 100)
        }
        return () => {
            setTime("00:00")
            if (timerInterval) {
                clearInterval(timerInterval);
            }
        };
    }, [switchTimer])
    return (
        <div className={classes.container}>
            <div className={classes.mineQuantities}>
                <p className={classes.title}>Количество мин</p>
                <p className={classes.score}>{matrix.value.mineQuantities - matrix.value.numberOfMarkedCells}</p>
            </div>

            <p className={classes.name}>Сапёр</p>

            <div className={classes.timer}>
                <p className={classes.title}>Времени прошло</p>
                <p className={classes.score}>{time}</p>
            </div>

            <div className={classes.buttonBlock}>
                <Button size={60} onClick={() => { clickMode === "open" ? setClickMode("mark") : setClickMode("open") }}>
                    {clickMode === "mark" ?
                        <img src={flagImage} alt="flag"></img> :
                        <p style={{ color: "#0022cc" }}>1</p>
                    }
                </Button>
                <Button size={60} onClick={() => {
                    resetMatrix()
                }}>
                    <img src={reloadImage} alt="reload"></img>
                </Button>
                <Button size={60} onClick={() => {
                    if (matrix.value.complexity === "standart") {
                        dispatch(actions.changeComplexity("difficult"));
                        setComplexityImage(difficultComplexityImage);
                    }
                    else if (matrix.value.complexity === "difficult") {
                        dispatch(actions.changeComplexity("madly"));
                        setComplexityImage(madlyComplexityImage);
                    }
                    else {
                        dispatch(actions.changeComplexity("standart"));
                        setComplexityImage(standartComplexityImage);
                    }
                    resetMatrix();
                }}>
                    <img src={complexityImage} alt="standart complexity"></img>
                </Button>
                <div className={classes.resize}>
                    <input className={classes.input}
                        type="number"
                        value={matrixSize.rows}
                        onChange={(e) => {
                            setMatrixSize({ ...matrixSize, rows: +e.target.value });
                        }} 
                        onBlur={()=>{
                            dispatch(actions.changeSize({ ...matrixSize, rows: matrixSize.rows }));
                            dispatch(actions.changeComplexity(matrix.value.complexity));
                            resetMatrix();
                        }}/>
                    <p>×</p>
                    <input className={classes.input}
                        type="number"
                        value={matrixSize.columns}
                        onChange={(e) => {
                            setMatrixSize({ ...matrixSize, columns: +e.target.value });
                        }}
                        onBlur={()=>{
                            dispatch(actions.changeSize({ ...matrixSize, columns: matrixSize.columns }));
                            dispatch(actions.changeComplexity(matrix.value.complexity));
                            resetMatrix();
                        }}/>
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;