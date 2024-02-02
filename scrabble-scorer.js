// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let wordToScore = input.question("Let's play some scrabble! Enter a word: ");
   return wordToScore;
};

let simpleScorer = (word) => word.length

let vowelBonusScorer = function(word) {
   let vowels = ['A', 'E', 'I', 'O', 'U'];
   let score = word.length;
   for (const char in vowels) {
      for (let i = 0; i < word.length; i ++) {
         if (word.charAt(i).toUpperCase() === vowels[char]) {
            score += 2;
         }
      }
   }
   return score; 
}

// let scoringAlgorithms = [
//    {
//       name: 'Simple Score',
//       description: 'Each letter is worth 1 point.',
//       scoringFunction: simpleScorer()
//    },
   
// ]

let scrabbleScorer;

// const scoringAlgorithms = [];

function scorerPrompt() {}

function transform() {};

let newPointStructure;

// Original:
// function runProgram() {
//    initialPrompt();
   
// }

function runProgram() {
   // initialPrompt();
   console.log(vowelBonusScorer(initialPrompt()));
   
}


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
