const Gameboard = (() => {
    const boardContainer = document.querySelector('#board-container')
    const cards = document.querySelectorAll('.card')

    let board = 
    [
    '', 'gg', '', // board[0-8]
    '', '', '',
    '', '', ''
    ]

    const getField = (num) => board[num];

    
    const displayBoard = () => {
        let num = 0;
        board.map(() => {
            const field = document.querySelector(`.card:nth-child(${num+1})`)
            field.textContent = board[num]
            num++
        })
    }

    const setField = (num, player) => {
        const field = document.querySelector(`.card:nth-child(${num+1})`)
        field.textContent = player.getSign()
        board[num] = player.getSign()
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



    return {updateBoard, board, setField, getField, cards}
})()

// const counterObj = (() => {
//     let count = 0
//     const counter = () => {
//         count++
//         return count
//     }

//     return {counter}
// })()


//player factory


const playerFactory = (marker) => {


    const listener = (() => {
        Gameboard.cards.forEach(card => card.addEventListener('click', (e) => {
            console.log(e.target.id)
            Gameboard.setField(3, playerOne)
        }))
    })()

    const place = (e) => {

    }

    const getSign = () => {
        return marker
    }

    return {place, getSign}
}

// define players 
const playerOne = playerFactory('x')
const playerTwo = playerFactory('o')


 Gameboard.setField(4, playerOne)

// console.log(Gameboard.getField(4))


// const currentTile = (() => {
//     const cards = document.querySelectorAll('.card')

    // const currentID = () => {
    //         cards.forEach(card => card.addEventListener('mouseover', (e) => {
    //         console.log(e.target.id)
    //         return e.target.id
    //     }))
    // }

//     const marker = () => {
//             cards.forEach(card => card.addEventListener('mouseover', (e) => {
//             console.log(e.target.textContent)
//             console.log('heya')
//             return e.target.textContent
//         }))
//     }

//     return {currentID, marker}
// })()



// function getCoord(id) {
//     row = idCoordinate[id].row
//     column = idCoordinate[id].column
//     return {row, column}
// }




// const runGame = () => {
//     if ((counterObj.counter() % 2) == 0) {
//         const cards = document.querySelectorAll('.card')

//         cards.forEach((card) => card.addEventListener('click', (e) => {
//             console.log('playeerone')
//             playerOne.place(e)
//             Gameboard.updateBoard()
//         }))
//     } else {
//         const cards = document.querySelectorAll('.card')

//         cards.forEach((card) => card.addEventListener('click', (e) => {
//             console.log('PLAYERTWO')
//             playerTwo.place(e)
//             Gameboard.updateBoard()
//         }))
//     }
// }


// document.body.addEventListener('click', () => {
//     runGame()
//     currentTile.marker()
// })










