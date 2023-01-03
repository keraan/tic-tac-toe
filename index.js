const gameBoard = (() => {
    const boardContainer = document.querySelector('#board-container')

    let board = ['','','','','','','','','']

    const getField = (num) => board[num];

    const displayBoard = () => {
        let num = 0;
        board.map(() => {
            const field = document.querySelector(`.card:nth-child(${num+1})`)
            field.textContent = board[num]
            num++
        })
    }

    const setField = (num) => {
        const marker = getTurn()
        const field = document.querySelector(`.card:nth-child(${num+1})`)
        field.textContent = marker
        board[num] = marker
        displayBoard()
    }

    const clearBoard = () => {
        let num = 0;
        board.map(() => {
            const field = document.querySelector(`.card:nth-child(${num+1})`)
            field.textContent = ''
            board[num] = ''
            num++
            displayBoard()
        })
    }

    const updateBoard = () => {
        clearBoard()
        displayBoard()
    }

    const startGame = (() => {
        displayBoard()
    })()

    const getTurn = () => {
        if (board) {
            let number = (board.reduce((aggregate, b) => aggregate+b))
            if ((number.length % 2) == 0) {
                return gameController.getPlayerOne().getSign()
            } else {
                return gameController.getPlayerTwo().getSign()
            }
        }
    }

    const findWinner = () => {
        if (board) {
            let number = (board.reduce((aggregate, b) => aggregate+b))
            if ((number.length % 2) == 0) {
                return gameController.getPlayerTwo().getSign()
            } else {
                return gameController.getPlayerOne().getSign()
            }
        }
    }



    return {updateBoard, board, setField, getField, getTurn, clearBoard, findWinner}
})()


//player factory


const playerFactory = (marker) => {
    const getSign = () => {
        return marker
    }

    return {getSign}
}

const gameController = (() => {
    const playerOne = playerFactory('X')
    const playerTwo = playerFactory('O')

    const getPlayerOne = () => playerOne
    const getPlayerTwo = () => playerTwo

    const _sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const checkForRows = (board) => {
        for (i = 0; i < 9; i+=3) {
            let row = []
            for(n = 0; n < 3; n++) {
                row.push(board[i+n])
            }
            console.log(row)
            if(row.every(field => field == 'X') || row.every(field => field == 'O')) {
                return true
            }
        }
        return false
    }

    const checkForColumns = (board) => {
        for (i = 0; i < 3; i++) {
            let column = []
            for(n = 0; n < 9; n+=3) {
                column.push(board[i+n])
            }
            console.log(column)
            if(column.every(field => field == 'X') || column.every(field => field == 'O')) {
                return true
            }
        }
        return false
    }

    const checkForDiagonals = (board) => {
        let diagonal = []
        diagonal.push(board[0], board[4], board[8])
        if(diagonal.every(field => field == 'X') || diagonal.every(field => field == 'O')) {
            return true
        }
        diagonal = []
        diagonal.push(board[2], board[4], board[6])
        if(diagonal.every(field => field == 'X') || diagonal.every(field => field == 'O')) {
            return true
        }
        console.log(diagonal)
        return false

    }

    const checkForWin = (board) => {
        if (checkForColumns(board) || checkForRows(board) || checkForDiagonals(board)){
            console.log('winner')
            return true
        } else {
            console.log(board)
            console.log('no win yet')
            return false
        }
    }

    const checkForDraw = (board) => {
        if (board.every(field => field != '')) {
            return true
        } else {
            return false
        }
    }

    const playerStep = (num) => {
        const field = gameBoard.getField(num);
        if (field == '') {
            gameBoard.setField(num);
            if (checkForWin(gameBoard.board)) {
                (async () => {
                    await _sleep(500 + (Math.random() * 500));
                    console.log('winnnnner')
                    endGame(gameBoard.findWinner());
                })();  
            }
            else if (checkForDraw(gameBoard.board)) {
                (async () => {
                    await _sleep(500 + (Math.random() * 500));
                    console.log('drawwww')
                    endGame("Draw");
                })();  
            }
        }
        else {
            console.log('Already Filled')
        }

        const endGame = (sign) => {
            if (sign == 'Draw') {
                displayController.message.textContent = 'It was a draw!'
            } else {
                displayController.message.textContent = `The winner is ${sign}`
            }
            displayController.result.classList.add('active')
            displayController.overlay.style.display = 'block'
        }
    }

    return {getPlayerOne, getPlayerTwo, playerStep, checkForRows, checkForColumns, checkForDiagonals, checkForWin}
})()

gameController.checkForColumns(gameBoard.board)

gameController.checkForDiagonals(gameBoard.board)

const displayController = (() => {
    const result = document.querySelector('.result')
    const message = document.querySelector('.message')
    const overlay = document.querySelector('.overlay')
    const closeBtn = document.querySelector('#closeBtn')

    const closeBtnListener = (() => {
        closeBtn.addEventListener('click', () => {
            result.classList.remove('active')
            overlay.style.display = 'none'
            gameBoard.clearBoard()
        })
    })()

    const cards = Array.from(document.querySelectorAll('.card'))

    const init = (() => {
        for (let i = 0; i < cards.length; i++) {
            field = cards[i];
            field.addEventListener('click', gameController.playerStep.bind(field, i));
        }
    })()

    return {cards, result, message, overlay}
})()


