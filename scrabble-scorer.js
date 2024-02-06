// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  0: [' '],
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

const vowels = ['A', 'E', 'I', 'O', 'U'];

function transform(arr) {
   const obj = {}
   for (const val in arr) {
      for (let i = 0; i < arr[val].length; i++) {
         obj[arr[val][i].toLowerCase()] = Number(val);
      }
   }
   return obj;
}

let newPointStructure = transform(oldPointStructure);

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
   let word = input.question("Let's play some scrabble! Enter a word: ");
   for (let i = 0; i < word.length; i++) {
      // console.log(wordToScore.charAt(i));
      if (Object.keys(transform(oldPointStructure)).includes(word.charAt(i).toLocaleLowerCase()) !== true) {
         console.log(`There is no '${word.charAt(i)}' tile.`);
         word = initialPrompt();
      }
   }
   return word;
};

function simpleScorer(word) {
   let score = 0;
   for (let i = 0; i < word.length; i++) {
      if (word.charAt(i) !== ' ') {
         score++;
      }
   }
   return score;
}

function vowelBonusScorer(word) {
   let score = simpleScorer(word);
   for (const char in vowels) {
      for (let i = 0; i < word.length; i++) {
         if (word.charAt(i).toUpperCase() === vowels[char]) {
            score += 2;
         }
      }
   }
   // console.log(`Score for ${word}: ${score}`);
   return score;
}


function scrabbleScorer (word) {
   let score = 0;
   let letter = "";
   for (let i = 0; i < word.length; i++) {
       letter = word.charAt(i).toLocaleLowerCase();
       score += newPointStructure[letter];
   }
   // console.log(`Score for ${word}: ${score}`);
   return score;
}

// console.log(scrabbleScorer('zebra'));

function scorerPrompt() {
   console.log('Which scoring algorithm would you like to use?\n');
   for (let i = 0; i < scoringAlgorithms.length; i ++) {
      console.log(`${i} - ${scoringAlgorithms[i].name}`);
   }
   let userSelection = input.question('Enter 0, 1, or 2: ');
   selectedAlgorithm = scoringAlgorithms[userSelection];
   // console.log(`Score for ${word}: ${selectedAlgorithm.scorerFunction(word)}`);
   return selectedAlgorithm;
}

const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: 'Each letter is worth 1 point.',
      scorerFunction: simpleScorer
   },
   {
      name: 'Bonus Vowels',
      description: 'Vowels are 3 pts, consonants are 1 pt.',
      scorerFunction: vowelBonusScorer
   },
   {
      name: 'Scrabble',
      description: 'The traditional scoring algorithm.',
      scorerFunction: scrabbleScorer
   }
];

function runProgram() {
   const word = initialPrompt();
   selectedAlgorithm = scorerPrompt();
   console.log(`Score for ${word}: ${selectedAlgorithm.scorerFunction(word)}`);
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

