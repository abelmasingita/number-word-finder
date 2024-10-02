# Number Word Finder

A React application that generates random number words and solves number word puzzles.

## Features

* Generate random number words by specifying minimum length or word count
* Solve number word puzzles and display results in a table
* Visualize puzzle solutions with bar charts

## Technologies Used
* React
* Vite
* Material-UI (MUI)
* Axios
* React Apex-charts
* Vitest (Testing Framework)

### Getting Started
### 1.  Clone the repository:
* git clone https://github.com/abelmasingita/number-word-finder.git

### 2. Install dependencies:
* npm install

### 3. Run the application:
* npm run dev

### Usage

### 1. Generate random number words:
* Choose between generating by minimum length or word count
* Enter the required value and click "Generate"
* View the generated word sequence

### 2. Solve a puzzle:
* Enter a random number word sequence
* Click "Solve Puzzle"
* View the results in a table and chart visualization

### API Integration

This application integrates with an external API for generating random number words and solving puzzles. The API endpoints used are:

### 1. Generate random words by minimum length:
* GET /api/PuzzleGenerator/minLength/{length}
### 2. Generate random words by word count:
* GET /api/PuzzleGenerator/words/{wordCount}
### 3. Solve number word puzzles:
* POST /api/PuzzleSolver

# Demo
* https://b1sa-numberwordfinder.netlify.app

# Images

* Generate Strings
![image](https://github.com/user-attachments/assets/40957f98-7439-4055-ae45-70c4f63526e4)

* Puzzle Solver
![image](https://github.com/user-attachments/assets/075cbb7b-5ae1-461c-86f6-ad9ae14ab857)
![image](https://github.com/user-attachments/assets/2b072de1-861e-4dab-ab94-599f80de31de)

* Random Word Solver
![image](https://github.com/user-attachments/assets/3dba5da2-11db-4f3b-9ef9-1bd9ee5ce634)

* Error Handling
![image](https://github.com/user-attachments/assets/d4ef6631-060c-4f65-80d3-ca85a2230cba)
![image](https://github.com/user-attachments/assets/ab4ea5bd-8811-481c-a82b-3418e010084c)
![image](https://github.com/user-attachments/assets/00880ef5-659d-4ee8-9b34-f1d203e5106c)

