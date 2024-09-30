# Number Word Finder

A React application that generates random number words and solves number word puzzles.

## Features

. Generate random number words by specifying minimum length or word count
. Solve number word puzzles and display results in a table
. Visualize puzzle solutions with bar charts

## Technologies Used
. React
. Vite
. Material-UI (MUI)
. Axios
. Recharts

## Getting Started
1.  Clone the repository:
. git clone https://github.com/yourusername/number-word-finder.git

2. Install dependencies:
. npm install

3. Run the application:
. npm run dev

## Usage

1. Generate random number words:
. Choose between generating by minimum length or word count
. Enter the required value and click "Generate"
. View the generated word sequence

2. Solve a puzzle:
. Enter a random number word sequence
. Click "Solve Puzzle"
. View the results in a table and chart visualization

## API Integration

This application integrates with an external API for generating random number words and solving puzzles. The API endpoints used are:

1. Generate random words by minimum length:
. GET /api/PuzzleGenerator/minLength/{length}
2. Generate random words by word count:
. GET /api/PuzzleGenerator/words/{wordCount}
3. Solve number word puzzles:
. POST /api/PuzzleSolver
