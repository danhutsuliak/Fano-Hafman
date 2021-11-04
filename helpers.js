//return a string of unique characters
function findUnique(str) {
	// The variable that contains the unique values
	let uniq = "";

	for (let i = 0; i < str.length; i++) {
		// Checking if the uniq contains the character
		if (uniq.includes(str[i]) === false) {
			// If the character not present in uniq
			// Concatenate the character with uniq
			uniq += str[i];
		}
	}

	return uniq.split("");
}

//get string and a character and return number of occurence of this specific letter in string
function countNumberOfOccurence(str, character) {
	return str.split(character).length - 1;
}

//return an index of a letter that devide object by frequencies(частоти)
function findAverageIndex(charactersObject) {
	let frequencies = getFrequencies(charactersObject);
	let charactersArray = Object.values(charactersObject);
	let suma = 0;
	let search = frequencies / 2;
	let result = 0;
	let max = Math.max(...charactersArray);

	for (i = 0; i < charactersArray.length; i++) {
		suma += charactersArray[i];
		let absVal = Math.abs(search - suma);
		if (max > absVal) {
			max = absVal;
			result = i;
		}
	}

	return result;
}

//return an array of objects, that array contains two objects, each object has close amount of frequencies(частот)
function getAlphabet(charactersObject) {
	let frequencies = getFrequencies(charactersObject);
	let reusableArray = [];
	let reusableObject = {};
	let keysArray = Object.keys(charactersObject);

	for (let i = 0; i <= findAverageIndex(charactersObject, frequencies); i++) {
		reusableObject[keysArray[i]] = charactersObject[keysArray[i]];
	}

	reusableArray.push(reusableObject);
	reusableObject = {};

	for (
		let i = findAverageIndex(charactersObject, frequencies) + 1;
		i < keysArray.length;
		i++
	) {
		reusableObject[keysArray[i]] = charactersObject[keysArray[i]];
	}

	reusableArray.push(reusableObject);

	return reusableArray;
}

//return amount of frequencies(частот) in specific object
const getFrequencies = (charactersObject) => {
	let frequencies = 0;
	for (const key in charactersObject) {
		frequencies += charactersObject[key];
	}
	return frequencies;
};

//setting for codedObject letter and its code
const devideArrays = (treeArray, branch) => {
	let alphabet;

	for (let i = 0; i <= 1; i++) {
		treeArray.push(Object.keys(branch[i]));

		alphabet = getAlphabet(branch[i]);
		if (treeArray[i].length > 1) {
			letterCode += i;

			//if array has more than one letter do recursion
			treeArray[i] = [];
			treeArray[i].push(devideArrays(treeArray[i], alphabet));

			//removing third array from all items
			treeArray[i].splice(2, 1);
		} else {
			letterCode += i;
			codedObject[treeArray[i][0]] = letterCode;
			console.log("Letter and its code: \n", letterCode, treeArray[i][0]);

			letterCode = letterCode.slice(0, -1);
		}
	}
	letterCode = letterCode.slice(0, -1);
	return treeArray;
};

//return an object that contains objects, each object has total amount of frequencies(частот)
const getHafmanObject = (charactersObject) => {
	let reusableObject = {};
	let keysArray = Object.keys(charactersObject);

	for (let i = 0; i < keysArray.length; i += 2) {
		if (
			charactersObject[keysArray[i]] <= charactersObject[keysArray[i + 1]]
		) {
			reusableObject[keysArray[i] + keysArray[i + 1]] =
				charactersObject[keysArray[i]] +
				charactersObject[keysArray[i + 1]];

			//if word is already grouped
			if (keysArray[i].length > 1) {
				for (let j = 0; j < keysArray[i].length; j++) {
					hafmanLetterCode[keysArray[i].split("")[j]] += "0";
				}
			} else {
				//if its only one letter
				hafmanLetterCode[keysArray[i]] += "0";
			}

			//if word is already grouped
			if (keysArray[i + 1].length > 1) {
				for (let j = 0; j < keysArray[i + 1].length; j++) {
					hafmanLetterCode[keysArray[i + 1].split("")[j]] += "1";
				}
			} else {
				//if its only one letter
				hafmanLetterCode[keysArray[i + 1]] += "1";
			}
		} else if (keysArray.length == 2) {
			reusableObject[keysArray[i] + keysArray[i + 1]] =
				charactersObject[keysArray[i]] +
				charactersObject[keysArray[i + 1]];

			//if word is already grouped
			if (keysArray[i].length > 1) {
				for (let j = 0; j < keysArray[i].length; j++) {
					hafmanLetterCode[keysArray[i].split("")[j]] += "0";
				}
			} else {
				//if its only one letter
				hafmanLetterCode[keysArray[i]] += "0";
			}

			//if word is already grouped
			if (keysArray[i + 1].length > 1) {
				for (let j = 0; j < keysArray[i + 1].length; j++) {
					hafmanLetterCode[keysArray[i + 1].split("")[j]] += "1";
				}
			} else {
				//if its only one letter
				hafmanLetterCode[keysArray[i + 1]] += "1";
			}
		} else {
			reusableObject[keysArray[i]] = charactersObject[keysArray[i]];
			if (i + 1 < keysArray.length) {
				reusableObject[keysArray[i + 1]] =
					charactersObject[keysArray[i + 1]];
			}
		}
	}

	if (Object.keys(reusableObject).length > 1) {
		console.log(reusableObject);
		reusableObject = getHafmanObject(reusableObject);
	}

	for (const key in hafmanLetterCode) {
		hafmanLetterCode[key] = hafmanLetterCode[key].replace("undefined", "");
	}

	return reusableObject;
};
