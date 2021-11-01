document.addEventListener("DOMContentLoaded", function () {
	fanoDecode.disabled = true;
	hafmanDecode.disabled = true;

	fanoEncode.addEventListener("click", function (e) {
		e.preventDefault();

		//reseting global variables on click
		letterCode = "";
		codedObject = {};
		stats.textContent = "";
		alphabetContainer.textContent = "";

		//Variables
		let inputString = fanoInput.value.replaceAll(" ", "");
		let treeArray = [];
		let fanoCodedString = fanoInput.value; //закодована строка
		let fanoAverageLong = 0;
		let fanoEntropy = 0;
		let fanoEffectiveness = 0;
		fanoOrigin = fanoCodedString;

		//Getting unique characters
		const charactersArray = findUnique(inputString);
		let charactersObject = {};
		charactersArray.map((character) => {
			charactersObject[character] = countNumberOfOccurence(
				inputString,
				character
			);
		});

		//Sorting object by the number of each letter appearence
		charactersObject = Object.fromEntries(
			Object.entries(charactersObject).sort((a, b) => b[1] - a[1])
		);

		//Total number of frequencies(частот)
		let frequencies = getFrequencies(charactersObject);

		console.log(
			"Letter and its frequencie + total frequencie:\n",
			charactersObject,
			frequencies
		);
		console.log(
			"Average index of a letter that devide array on two pieces: \n",
			findAverageIndex(charactersObject)
		);

		//Array tree of letters
		treeArray = devideArrays(treeArray, getAlphabet(charactersObject));
		console.log("Tree array structure: \n", treeArray);
		console.log("Complete object of pair letter:code \n", codedObject); //object pair of "letter:code"

		//creating coded string
		for (const letter in codedObject) {
			fanoCodedString = fanoCodedString.replaceAll(
				letter,
				codedObject[letter]
			);
		}
		console.log("Fano coded string: \n", fanoCodedString);

		//writing alphabet to user interface
		for (const key in codedObject) {
			alphabetContainer.innerHTML += `
				<p>${key}: ${codedObject[key]};</p>
			`;
		}

		//counting average long
		for (const letter in codedObject) {
			fanoAverageLong +=
				(charactersObject[letter] / frequencies) *
				codedObject[letter].length;
		}
		console.log("Fano average long: \n", fanoAverageLong);

		//fano entropy
		for (const letter in codedObject) {
			fanoEntropy -=
				(charactersObject[letter] / frequencies) *
				Math.log2(charactersObject[letter] / frequencies);
		}
		console.log("Fano entropy: \n", fanoEntropy);

		//fano effectiveness
		fanoEffectiveness = fanoEntropy / fanoAverageLong;
		console.log("Fano effectiveness: \n", fanoEffectiveness);

		fanoInput.value = fanoCodedString;
		stats.innerHTML = `
			<p>Average long:<br> ${fanoAverageLong};</p>
			<p>Entropy:<br> ${fanoEntropy};</p>
			<p>Effectiveness:<br> ${fanoEffectiveness};</p>
		`;

		//disable button
		fanoEncode.disabled = true;
		fanoDecode.disabled = false;

		console.log("///////////////////////////////////////////////////");
	});

	fanoDecode.addEventListener("click", function (e) {
		e.preventDefault();

		let decodedString = fanoInput.value;
		let lettersArray = Object.keys(codedObject);

		// for (let i = lettersArray.length - 1; i >= 0; i--) {
		// 	decodedString = decodedString.replaceAll(
		// 		codedObject[lettersArray[i]],
		// 		lettersArray[i]
		// 	);
		// }
		// console.log(decodedString);

		fanoInput.value = fanoOrigin;
		console.log(fanoInput.innerHTML);

		fanoEncode.disabled = false;
		fanoDecode.disabled = true;

		stats.textContent = "";
		alphabetContainer.textContent = "";

		console.log("///////////////////////////////////////////////////");
	});

	fanoFileBtn.addEventListener("click", function (e) {
		e.preventDefault();

		fanoFile.click();
	});

	fanoFile.addEventListener("change", function (e) {
		let file = e.target.files[0];
		if (!file) {
			return;
		}
		let reader = new FileReader();
		reader.onload = function (e) {
			let content = e.target.result;
			fanoInput.value = content;
		};
		reader.readAsText(file);
	});

	hafmanEncode.addEventListener("click", function (e) {
		e.preventDefault();

		//reseting global variables on click
		hafmanLetterCode = {};
		hafmanCodedObject = {};
		stats.textContent = "";
		alphabetContainer.textContent = "";

		//Variables
		let inputString = hafmanInput.value.replaceAll(" ", "");
		let treeArray = [];
		let hafmanCodedString = hafmanInput.value; //закодована строка
		let hafmanAverageLong = 0;
		let hafmanEntropy = 0;
		let hafmanEffectiveness = 0;
		hafmanOrigin = hafmanCodedString;

		//Getting unique characters
		const charactersArray = findUnique(inputString);
		let charactersObject = {};
		charactersArray.map((character) => {
			charactersObject[character] = countNumberOfOccurence(
				inputString,
				character
			);
		});

		//Sorting object by the number of each letter appearence
		charactersObject = Object.fromEntries(
			Object.entries(charactersObject).sort((a, b) => a[1] - b[1])
		);

		//Total number of frequencies(частот)
		let frequencies = getFrequencies(charactersObject);

		console.log(
			"Letter and its frequencie + total frequencie:\n",
			charactersObject,
			frequencies
		);

		getHafmanObject(charactersObject);
		console.log("Complete object of pair letter:code \n", hafmanLetterCode); //object pair of "letter:code"

		//creating coded string
		for (const letter in hafmanLetterCode) {
			hafmanCodedString = hafmanCodedString.replaceAll(
				letter,
				hafmanLetterCode[letter]
			);
		}
		console.log("Hafman coded string: \n", hafmanCodedString);

		//writing alphabet to user interface
		for (const key in hafmanLetterCode) {
			alphabetContainer.innerHTML += `
					<p>${key}: ${hafmanLetterCode[key]};</p>
				`;
		}

		//counting average long
		for (const letter in hafmanLetterCode) {
			hafmanAverageLong +=
				(charactersObject[letter] / frequencies) *
				hafmanLetterCode[letter].length;
		}
		console.log("Hafman average long: \n", hafmanAverageLong);

		//fano entropy
		for (const letter in hafmanLetterCode) {
			hafmanEntropy -=
				(charactersObject[letter] / frequencies) *
				Math.log2(charactersObject[letter] / frequencies);
		}
		console.log("Hafman entropy: \n", hafmanEntropy);

		//fano effectiveness
		hafmanEffectiveness = hafmanEntropy / hafmanAverageLong;
		console.log("Hafman effectiveness: \n", hafmanEffectiveness);

		hafmanInput.value = hafmanCodedString;
		stats.innerHTML = `
			<p>Average long: <br> ${hafmanAverageLong};</p>
			<p>Entropy: <br> ${hafmanEntropy};</p>
			<p>Effectiveness: <br> ${hafmanEffectiveness};</p>
		`;

		//disable button
		hafmanEncode.disabled = true;
		hafmanDecode.disabled = false;

		console.log("///////////////////////////////////////////////////");
	});

	hafmanDecode.addEventListener("click", function (e) {
		e.preventDefault();

		hafmanInput.value = hafmanOrigin;
		console.log(hafmanInput.innerHTML);

		hafmanEncode.disabled = false;
		hafmanDecode.disabled = true;

		stats.textContent = "";
		alphabetContainer.textContent = "";

		console.log("///////////////////////////////////////////////////");
	});

	hafmanFileBtn.addEventListener("click", function (e) {
		e.preventDefault();

		hafmanFile.click();
	});

	hafmanFile.addEventListener("change", function (e) {
		let file = e.target.files[0];
		if (!file) {
			return;
		}
		let reader = new FileReader();
		reader.onload = function (e) {
			let content = e.target.result;
			hafmanInput.value = content;
		};
		reader.readAsText(file);
	});
});
