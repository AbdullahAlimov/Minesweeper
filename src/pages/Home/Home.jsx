import CellMatrix from "../../components/CellMatrix/CellMatrix";
import ControlPanel from "../../components/ControlPanel/ControlPanel";
import Modal from "../../components/UI/Modal/Modal";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { actions } from '../../state/slice/matrixContent.slice';
import classes from "./Home.module.scss"


const Home = () => {
    const [modalValue, setModalValue] = useState(false);
    const [switchTimer, setSwitchTimer] = useState(false);
    const [clickMode, setClickMode] = useState("open");
    const [resultGame, setResultGame] = useState("gameIsOn");

    const dispatch = useDispatch();

    useEffect(() => {
        if (resultGame === "win" || resultGame == "lose")
            setModalValue(true);
        setSwitchTimer(false);
    }, [resultGame])

    return (
        <div>
            <div className={classes.container}>
                <div className={classes.content}>
                    <ControlPanel switchTimer={switchTimer} setSwitchTimer={setSwitchTimer} clickMode={clickMode} setClickMode={setClickMode}></ControlPanel>
                    <CellMatrix setSwitchTimer={setSwitchTimer} clickMode={clickMode} setResultGame={setResultGame} setModalValue={setModalValue}></CellMatrix>
                </div>
            </div>
            <Modal modalValue={modalValue} setModalValue={setModalValue} color={resultGame === "win" ? "#287a08" : "#c7090b"}>
                <div className={classes.modalContainer}>
                    <p className={classes.title}>{resultGame === "win" ? "ВЫ ВЫИГРАЛИ" : "ВЫ ПРОИГРАЛИ"}</p>
                    <button
                        className={classes.button}
                        style={{ backgroundColor: resultGame === "win" ? "#37a00d" : "#e72022" }}
                        onClick={() => {
                            dispatch(actions.resetMatrix());
                            dispatch(actions.fillWithContent());
                            setResultGame("gameIsOn")
                            setModalValue(false);
                        }}>{"Начать заново ->"}</button>
                </div>
            </Modal>
        </div>
    );
};

export default Home;