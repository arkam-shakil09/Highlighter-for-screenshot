try {
	let highlightElement = false;
	const highlightClassName = "highlight-arkam";
	const highlightStyle = "outline: 5px solid red";
	
	// Create and append the style element for the highlight class
	const styleElementWithHighlightClass = document.createElement("style");
	styleElementWithHighlightClass.innerHTML = `.${highlightClassName} { ${highlightStyle} !important; }`;
	document.head.appendChild(styleElementWithHighlightClass);
	
	// Display initial instructions
	const initialInstruction = "Welcome! Press 'CTRL + Shift + 2' to toggle the highlight mode on or off.";
	alert(initialInstruction);
	
	// Add event listener to the document body to toggle highlighting
	document.body.addEventListener("keydown", function (event) {
		if (event.ctrlKey && event.shiftKey && event.code === 'Digit2') {
			if (highlightElement === false) {
				highlightElement = true;
				highlightElementForCapturingScreenshot();
			} else {
				highlightElement = false;
				unhighlightElementAfterCapturingScreenshot();
			}
		}
	});

	// Function to highlight elements
	function highlightElementForCapturingScreenshot() {
		const elementSelector = prompt("Enter the CSS selector of the elements you want to highlight:");
		const elements = document.querySelectorAll(elementSelector);
		
		if (elements.length > 0) {
			elements.forEach(element => element.classList.add(highlightClassName));
			alert(`Successfully highlighted ${elements.length} element(s).`);
		} else {
			alert("No elements found for the provided selector. Please try again.");
			highlightElement = false;
		}
	}
	
	// Function to unhighlight elements
	function unhighlightElementAfterCapturingScreenshot() {
		const elements = document.querySelectorAll(`.${highlightClassName}`);

		elements.forEach(element => element.classList.remove(highlightClassName));
		alert("Highlight removed from all elements.");
	}

} catch (error) {
	console.error("An error occurred:", error);
	alert("An error occurred while executing the script.\n" + error.message);
}
