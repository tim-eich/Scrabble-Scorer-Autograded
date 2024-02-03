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

const vowels = ['A', 'E', 'I', 'O', 'U'];

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
   let totalScore = 0;
	for (let i = 0; i < word.length; i++) {
      for (const pointValue in oldPointStructure) {
         if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         // Additional code to count score without building new strings
         totalScore += Number(pointValue);
         }
      }
	}
   // Returning the score as a number, rather than a series of strings
	return totalScore;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let wordToScore = input.question("Let's play some scrabble! Enter a word: ");
   return wordToScore;
};

let simpleScorer = (word) => word.length

let vowelBonusScorer = (word) => {
   let score = word.length;
   for (const char in vowels) {
      for (let i = 0; i < word.length; i++) {
         if (word.charAt(i).toUpperCase() === vowels[char]) {
            score += 2;
         }
      }
   }
   return score;
}


let scrabbleScorer = function(word) {
   let score = 0;
   for (letter in newPointStructure) {
      for (let i = 0; i < word.length; i++) {
         if (word.charAt(i) === newPointStructure[letter]) {
            score += newPointStructure[letter][0];
         }
      }
   }
   return score;
}

const scoringAlgorithms = [
   {
      name: 'Simple Score',
      description: 'Each letter is worth 1 point.',
      scoringFunction: simpleScorer
   },
   {
      name: 'Bonus Vowels',
      description: 'Vowels are 3 pts, consonants are 1 pt.',
      scoringFunction: vowelBonusScorer
   },
   {
      name: 'Scrabble',
      description: 'The traditional scoring algorithm.',
      scoringFunction: oldScrabbleScorer  
   }
];

function scorerPrompt() {
   console.log('Which scoring algorithm would you like to use?\n');
   for (let i = 0; i < scoringAlgorithms.length; i ++) {
      console.log(`${i} - ${scoringAlgorithms[i].name}`);
   }
   let userSelection = input.question('Enter 0, 1, or 2: ');
   selectedAlgorithm = scoringAlgorithms[userSelection];
   return selectedAlgorithm;
}

function transform(arr) {
   let newArr = [];
   const obj = {}
   for (const val in arr) {
      for (let i = 0; i < arr[val].length; i++) {
         obj[arr[val][i].toLowerCase()] = Number(val);
      }
   }
   return obj;
}

let newPointStructure = transform(oldPointStructure);

// Original:
// function runProgram() {
//    initialPrompt();
   
// }

function runProgram() {
   let word = initialPrompt();
   selectedAlgorithm = scorerPrompt();
   console.log(`Score for ${word}: ${selectedAlgorithm.scoringFunction(word)}`);
}

// test
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

