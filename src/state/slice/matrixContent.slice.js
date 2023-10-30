import { createSlice } from '@reduxjs/toolkit';

export const matrixContentSlice = createSlice({
    name: 'matrixContent',
    initialState: {
        value: {
            matrix: Array.from({ length: 9 }, () => Array(9).fill({ visible: false, marked: false, value: 0 })),
            mineQuantities: 10,
            complexity: "standart",
            numberOfOpenCells: 0,
            numberOfMarkedCells: 0
        }
    },
    reducers: {
        changeSize: (state, { payload }) => {
            state.value = {
                ...state.value,
                matrix: Array.from({ length: payload.rows }, () => Array(payload.columns).fill({ visible: false, marked: false, value: 0 })),
                numberOfMarkedCells: 0,
                numberOfOpenCells: 0,
            }
            state.value.matrix = Array.from({ length: payload.rows }, () => Array(payload.columns).fill({ visible: false, marked: false, value: 0 }));
            state.value.numberOfMarkedCells = 0;
            state.value.numberOfOpenCells = 0;
        },
        changeComplexity: (state, { payload }) => {
            const numberRows = state.value.matrix.length;
            const numberColumns = state.value.matrix[0].length;

            state.value.complexity = payload;
            switch (payload) {
                case "standart":
                    state.value.mineQuantities = Math.floor((numberRows * numberColumns) / 8);
                    break;
                case "difficult":
                    state.value.mineQuantities = Math.floor((numberRows * numberColumns / 8 + numberRows * numberColumns / 4) / 2);
                    break;
                case "madly":
                    state.value.mineQuantities = Math.floor((numberRows * numberColumns) / 4);
                    break;
            }
        },
        fillWithContent: (state) => {
            const mineQuantities = state.value.mineQuantities;
            const numberRows = state.value.matrix.length;
            const numberColumns = state.value.matrix[0].length;
            const numberCells = numberColumns * numberRows;

            const allCoordinates = [];
            for (let indexY = 0; indexY < numberRows; indexY++) {
                for (let indexX = 0; indexX < numberColumns; indexX++) {
                    allCoordinates.push({ indexY, indexX })
                }
            }

            for (let firstIndex = numberCells - 1; firstIndex > 0; firstIndex--) {
                const secondIndex = Math.floor(Math.random() * firstIndex);
                [allCoordinates[firstIndex], allCoordinates[secondIndex]] = [allCoordinates[secondIndex], allCoordinates[firstIndex]];
            }

            for (let mineIndex = 0; mineIndex < mineQuantities; mineIndex++) {
                state.value.matrix[allCoordinates[mineIndex].indexY][allCoordinates[mineIndex].indexX].value = "*";
            }

            state.value.matrix = state.value.matrix.map((list, indexY) => {
                return list.map((item, indexX) => {
                    if (item.value !== "*") {
                        var mineCounter = 0;
                        for (let incrementY = -1; incrementY <= 1; incrementY++) {
                            for (let incrementX = -1; incrementX <= 1; incrementX++) {
                                let newY = indexY + incrementY;
                                let newX = indexX + incrementX;
                                if (newY >= 0 && newY < numberRows && newX >= 0 && newX < numberColumns) {
                                    if (state.value.matrix[newY][newX].value === "*") {
                                        mineCounter += 1;
                                    }
                                }
                            }
                        }
                        item.value = mineCounter;
                    }
                    return item;
                });
            });
        },
        changeVisible: (state, { payload }) => {
            const changeVisibleForEmpty = async (indexY, indexX) => {
                const stack = [[indexY, indexX]];
                while (stack.length > 0) {
                    const [currentY, currentX] = stack.pop()
                    for (let incrementY = -1; incrementY <= 1; incrementY++) {
                        for (let incrementX = -1; incrementX <= 1; incrementX++) {
                            const newY = currentY + incrementY;
                            const newX = currentX + incrementX;
                            if (newY >= 0 && newY < state.value.matrix.length &&
                                newX >= 0 && newX < state.value.matrix[0].length) {
                                const cell = state.value.matrix[newY][newX];
                                if (!cell.visible && !cell.marked) {
                                    cell.visible = true;
                                    state.value.numberOfOpenCells++;
                                    if (cell.value === 0) {
                                        stack.push([newY, newX])
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (state.value.matrix[payload.indexY][payload.indexX].value === 0) {
                changeVisibleForEmpty(payload.indexY, payload.indexX)
            }
            else if (!state.value.matrix[payload.indexY][payload.indexX].marked) {
                state.value.matrix[payload.indexY][payload.indexX].visible = true;
                state.value.numberOfOpenCells++;
            }
        },
        changeMark: (state, { payload }) => {
            var cell = state.value.matrix[payload.indexY][payload.indexX];
            if (!cell.visible) {
                cell.marked = !cell.marked;
                cell.marked ? state.value.numberOfMarkedCells++ : state.value.numberOfMarkedCells--;
            }
        },
        resetMatrix: (state) => {
            state.value = {
                ...state.value,
                matrix: Array.from({ length: state.value.matrix.length }, () => Array(state.value.matrix[0].length).fill({ visible: false, marked: false, value: 0 })),
                numberOfOpenCells: 0,
                numberOfMarkedCells: 0
            }
        }
    }
});

export const { actions, reducer } = matrixContentSlice;