# 2048 Game

The 2048 Game is a popular single-player sliding tile puzzle where the objective is to combine tiles with the same numbers to reach the number 2048. The game is played on a 4x4 grid consisting of 16 cells.

## How to Play

1. **Starting the Game**:
   - At the beginning, two tiles with a value of 2 or 4 appear at random empty positions on the grid.
2. **Making a Move**:
   - Use the arrow keys (left, right, up, down) to slide all the tiles on the grid in the chosen direction:
     - **Left Arrow**: All tiles slide to the left.
     - **Right Arrow**: All tiles slide to the right.
     - **Up Arrow**: All tiles slide upward.
     - **Down Arrow**: All tiles slide downward.
3. **Combining Tiles**:
   - When two tiles with the same number collide during a move, they merge into a single tile with a value equal to the sum of the two tiles. For example, two tiles with 4 will combine to form an 8.
4. **Adding New Tiles**:
   - After each move, a new tile with a value of 2 or 4 is added to a random empty cell on the grid.
5. **Scoring**:
   - Each time tiles combine, the player's score increases by the value of the new tile formed. The current score is displayed at the top of the game.
6. **Objective**:
   - Keep combining tiles to reach the 2048 tile. You can continue playing even after reaching 2048 to achieve higher scores.
7. **Game Over**:
   - The game ends when there are no valid moves left—no empty spaces and no adjacent tiles with the same value.

## Game Features

- **Visual Representation**: The game updates the visual appearance of tiles based on their values to enhance the playing experience. Higher-value tiles have distinct styles.
- **Restarting the Game**: A "Restart Game" button is available to reset the game at any time, clearing the grid and resetting the score.

## Tips for Success

- **Plan Ahead**: Try to keep your highest-value tiles in a specific area of the grid to make combining easier.
- **Avoid Filling Up the Grid**: Focus on making moves that combine tiles rather than just shifting them, to prevent the grid from filling up
