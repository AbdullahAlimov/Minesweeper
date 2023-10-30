import classes from './Cell.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../state/slice/matrixContent.slice';

import bombImage from '../../assets/bomb.svg'
import flagImage from '../../assets/flag.svg'

const Cell = ({ item, indexY, indexX, setSwitchTimer, clickMode,setResultGame}) => {

    const matrix = useSelector(state => state.matrixContent);
    const dispatch = useDispatch();

    const colorText = {
        0: '#f7f7f7',
        1: '#0022cc',
        2: '#00aa00',
        3: "#ff0000",
        4: '#2222aa',
        5: '#aa0022',
        6: '#660066',
        7: '#884400',
        8: '#222222'
    };

    function setCellContent(item){
        if(item.marked && !item.visible){
            return(
                <div className={classes.image}>
                    <img src={flagImage} alt="flag"></img>
                </div>
            )
        }
        else if(item.value === "*"){
            return(
                <div className={classes.image} style={{ visibility: item.visible === false ? 'hidden' : 'visible', backgroundColor: item.visible === false ? "#f7f7f7" : "#D53032" }}>
                    <img src={bombImage} alt="mine"></img>
                </div>
            )
        }
        else{
            return (
            <p style={{ color: item.visible === false ? "#f7f7f7" : colorText[item.value] }}>{item.value}</p>
            )
        }
    }

    return (
        <div className={classes.container}
            style={{ border: item.visible === false ? "outset 5px" : "0px" }}
            onClick={() => {
                if (clickMode === "open") {
                    if(item.value==="*" && !item.marked){
                        setResultGame("lose")
                    }
                    dispatch(actions.changeVisible({ indexX: indexX, indexY: indexY }))
                }
                else {
                    dispatch(actions.changeMark({ indexX: indexX, indexY: indexY }))
                }
                setSwitchTimer(true)
            }}>
            {setCellContent(item)}
        </div>
    );
};

export default Cell;