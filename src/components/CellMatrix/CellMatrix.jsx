import classes from './CellMatrix.module.scss'
import Cell from '../Сell/Cell';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../state/slice/matrixContent.slice';
import { useEffect } from 'react';

const CellMatrix = ({ setSwitchTimer, clickMode, setResultGame, setModalValue }) => {
    const matrix = useSelector(state => state.matrixContent);
    const dispatch = useDispatch();
    
    const numberRows=matrix.value.matrix.length;
    const numberColumns=matrix.value.matrix[0].length;

    useEffect(() => {
        if (numberRows * numberColumns - matrix.value.numberOfOpenCells === matrix.value.mineQuantities) {
            setResultGame("win")
        }
    }, [matrix.value.numberOfOpenCells]);

    useEffect(() => {
        dispatch(actions.resetMatrix());
        dispatch(actions.fillWithContent());
    }, []);

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <div className={classes.matrix} style={{ gridTemplateRows: `repeat(${numberRows}, 40px)`, gridTemplateColumns: `repeat(${numberColumns}, 40px)` }}>
                    {matrix.value.matrix.map((list, indexY) => {
                        return list.map((item, indexX) => {
                            return <Cell key={indexY * list.length + indexX}
                                indexY={indexY}
                                indexX={indexX}
                                item={item}
                                setSwitchTimer={setSwitchTimer}
                                clickMode={clickMode}
                                setResultGame={setResultGame}
                                setModalValue={setModalValue}></Cell>
                        })
                    })}
                </div>
            </div>
        </div>
    );
};

export default CellMatrix;
