const idCoordinate = {
    0: {row: 0, column: 0},
    1: {row: 0, column: 1},
    2: {row: 0, column: 2},
    3: {row: 1, column: 0},
    4: {row: 1, column: 1},
    5: {row: 1, column: 2},
    6: {row: 2, column: 0},
    7: {row: 2, column: 1},
    8: {row: 2, column: 2},
}

const Gameboard = (() => {
    const boardContainer = document.querySelector('#board-container')

    let id = 0;
    let board = 
    [
    ['', '', ''], // board[0][0]
    ['x', 'x', ''],
    ['', '', 'o']
    ]

    const displayBoard = () => {
        board.map(array => {
            array.map(() => {
                const card = document.createElement('div')
                card.classList.add('card')
                card.textContent = board[getCoord(id).row][getCoord(id).column]
                card.id = id
                id++
                boardContainer.appendChild(card)
                console.log('displayboard')
                console.log(id)
            })
        })

    }

    const clearBoard = () => {
        boardContainer.innerHTML = ''
        id = 0
        console.log('clearing')
    }

    const updateBoard = () => {
        console.log('updating')
        clearBoard()
        displayBoard()
    }

    console.log('existing')
    //console.log(board[2][2])
    updateBoard()

    return {updateBoard, board}
})()

Gameboard.updateBoard()


//player factory


const playerFactory = (name, marker) => {
    const sayName = () => console.log(name)
    const place = (e) => {
        console.log('hello')
        currentID = e.target.id
        console.log(Gameboard.board[getCoord(currentID).row][getCoord(currentID).column] = marker)
    }

    return {sayName, place}
}

// define players 
const playerOne = playerFactory('kieren', 'x')




// const currentTile = (() => {
//     const currentID = () => {
//         const cards = document.querySelectorAll('.card')
//         cards.forEach(card => card.addEventListener('mouseover', (e) => {
//             console.log(e.target.id)
//             return e.target.id
//         }))
//     }

//     return currentID
// })()

// currentTile()


function getCoord(id) {
    row = idCoordinate[id].row
    column = idCoordinate[id].column
    return {row, column}
}

const cards = document.querySelectorAll('.card')

cards.forEach(card => card.addEventListener('click', (e) => {
    console.log('whatsup')
    playerOne.place(e)
    Gameboard
    Gameboard.updateBoard()
}))



// console.log(idCoordinate[8])



document.body.addEventListener('click', () => console.log(Gameboard))











