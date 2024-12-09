document.addEventListener('DOMContentLoaded', () => {
    const gridCells = document.querySelectorAll('.grid-cell');
    const messageContainer = document.getElementById('message-container');
    const scoreDisplay = document.getElementById('score');
    let squares = [];
    let score = 0;

    // Initialize the game board
    function createBoard() {
        for (let i = 0; i < gridCells.length; i++) {
            let cell = gridCells[i];
            cell.innerHTML = '';
            squares.push(cell);
        }
        addNewTile();
        addNewTile();
    }

    // Add a new tile (2 or 4) to a random empty cell
    function addNewTile() {
        let emptyCells = squares.filter(cell => cell.innerHTML === '');
        if (emptyCells.length === 0) return;
        let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        randomCell.innerHTML = Math.random() < 0.9 ? 2 : 4;
        updateTileClasses();
    }

    // Swipe functions
    function moveRight() {
        for (let i = 0; i < 16; i += 4) {
            let row = [
                parseInt(squares[i].innerHTML) || 0,
                parseInt(squares[i + 1].innerHTML) || 0,
                parseInt(squares[i + 2].innerHTML) || 0,
                parseInt(squares[i + 3].innerHTML) || 0
            ];
            let newRow = row.filter(num => num);
            let zeros = Array(4 - newRow.length).fill(0);
            newRow = zeros.concat(newRow);
            for (let j = 0; j < 4; j++) {
                squares[i + j].innerHTML = newRow[j] || '';
            }
        }
    }

    function moveLeft() {
        for (let i = 0; i < 16; i += 4) {
            let row = [
                parseInt(squares[i].innerHTML) || 0,
                parseInt(squares[i + 1].innerHTML) || 0,
                parseInt(squares[i + 2].innerHTML) || 0,
                parseInt(squares[i + 3].innerHTML) || 0
            ];
            let newRow = row.filter(num => num);
            let zeros = Array(4 - newRow.length).fill(0);
            newRow = newRow.concat(zeros);
            for (let j = 0; j < 4; j++) {
                squares[i + j].innerHTML = newRow[j] || '';
            }
        }
    }

    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let column = [
                parseInt(squares[i].innerHTML) || 0,
                parseInt(squares[i + 4].innerHTML) || 0,
                parseInt(squares[i + 8].innerHTML) || 0,
                parseInt(squares[i + 12].innerHTML) || 0
            ];
            let newColumn = column.filter(num => num);
            let zeros = Array(4 - newColumn.length).fill(0);
            newColumn = zeros.concat(newColumn);
            for (let j = 0; j < 4; j++) {
                squares[i + j * 4].innerHTML = newColumn[j] || '';
            }
        }
    }

    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let column = [
                parseInt(squares[i].innerHTML) || 0,
                parseInt(squares[i + 4].innerHTML) || 0,
                parseInt(squares[i + 8].innerHTML) || 0,
                parseInt(squares[i + 12].innerHTML) || 0
            ];
            let newColumn = column.filter(num => num);
            let zeros = Array(4 - newColumn.length).fill(0);
            newColumn = newColumn.concat(zeros);
            for (let j = 0; j < 4; j++) {
                squares[i + j * 4].innerHTML = newColumn[j] || '';
            }
        }
    }

    // Combine functions
    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if ((i + 1) % 4 !== 0 && squares[i].innerHTML === squares[i + 1].innerHTML && squares[i].innerHTML !== '') {
                let combinedTotal = parseInt(squares[i].innerHTML) * 2;
                squares[i].innerHTML = combinedTotal;
                squares[i + 1].innerHTML = '';
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
                updateTileClasses();
            }
        }
    }

    function combineColumn() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + 4].innerHTML && squares[i].innerHTML !== '') {
                let combinedTotal = parseInt(squares[i].innerHTML) * 2;
                squares[i].innerHTML = combinedTotal;
                squares[i + 4].innerHTML = '';
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
                updateTileClasses();
            }
        }
    }

    // Handle key presses
    function control(e) {
        if (e.keyCode === 39) {
            keyRight();
        } else if (e.keyCode === 37) {
            keyLeft();
        } else if (e.keyCode === 38) {
            keyUp();
        } else if (e.keyCode === 40) {
            keyDown();
        }
    }

    document.addEventListener('keyup', control);

    function keyRight() {
        moveRight();
        combineRow();
        moveRight();
        addNewTile();
        updateTileClasses();
        checkGameOver();
    }

    function keyLeft() {
        moveLeft();
        combineRow();
        moveLeft();
        addNewTile();
        updateTileClasses();
        checkGameOver();
    }

    function keyUp() {
        moveUp();
        combineColumn();
        moveUp();
        addNewTile();
        updateTileClasses();
        checkGameOver();
    }

    function keyDown() {
        moveDown();
        combineColumn();
        moveDown();
        addNewTile();
        updateTileClasses();
        checkGameOver();
    }

    // Update tile classes based on value
    function updateTileClasses() {
        squares.forEach(cell => {
            cell.className = 'grid-cell'; // Reset class
            let value = cell.innerHTML;
            if (value) {
                cell.classList.add('tile-' + value);
            }
        });
    }

    // Check for game over condition
    function checkGameOver() {
        let movesAvailable = false;

        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML === '') {
                movesAvailable = true;
                break;
            }
            let currentValue = parseInt(squares[i].innerHTML);
            // Check right neighbor
            if ((i + 1) % 4 !== 0 && squares[i + 1].innerHTML === squares[i].innerHTML) {
                movesAvailable = true;
                break;
            }
            // Check below neighbor
            if (i + 4 < 16 && squares[i + 4].innerHTML === squares[i].innerHTML) {
                movesAvailable = true;
                break;
            }
        }

        if (!movesAvailable) {
            // Display 'Game Over' message
            messageContainer.innerHTML = '<h2>Game Over!</h2>';
            // Remove event listener to prevent further moves
            document.removeEventListener('keyup', control);
        }
    }

    const restartButton = document.getElementById('restart-button');
        restartButton.addEventListener('click', restartGame);

        function restartGame() {
            // Clear the board
            squares.forEach(cell => {
                cell.innerHTML = '';
            });
            messageContainer.innerHTML = '';
            // Re-enable key controls
            document.addEventListener('keyup', control);
            // Start a new game
            addNewTile();
            addNewTile();
            updateTileClasses();
        }

    createBoard();
});