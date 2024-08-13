// Include HTML2Canvas library by injecting a script tag
const script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
document.head.appendChild(script);

script.onload = function () {
	let highlightElement = false;
	const highlightClassName = "highlight-arkam";
	const highlightBorderColorAndPX = "3px solid red";

	// Create and append the style element for the highlight class
	const styleElementWithHighlightClass = document.createElement("style");
	styleElementWithHighlightClass.innerHTML = `.${highlightClassName} { border: ${highlightBorderColorAndPX} !important; }`;
	document.head.appendChild(styleElementWithHighlightClass);

	// Add event listener to the document body to toggle highlighting
	document.body.addEventListener("keydown", function (event) {
		if (event.key === "2" && event.ctrlKey === true) {
			if (highlightElement === false) {
				highlightElement = true;
				highlightElementForCapturingScreenshot();
			} else {
				highlightElement = false;
				unhighlightElementAfterCapturingScreenshot();
			}
		}
	});

	// Display initial instructions
	const initialInstruction = "Welcome! Press 'CTRL + 2' to toggle the highlight mode on or off.";
	alert(initialInstruction);

	// Function to highlight elements and capture a screenshot
	function highlightElementForCapturingScreenshot() {
		const elementSelector = prompt("Enter the CSS selector of the elements you want to highlight:");
		const elements = document.querySelectorAll(elementSelector);

		if (elements.length > 0) {
			elements.forEach(element => element.classList.add(highlightClassName));
			elements[0].scrollIntoView();

			const screenshotName = prompt(`Successfully highlighted ${elements.length} element(s). \nPlease enter the screenshot name: `) || "highlighted-elements";

			// Capture screenshot of the viewport using html2canvas
			html2canvas(document.body, {
				width: window.innerWidth,
				height: window.innerHeight,
				x: window.scrollX,
				y: window.scrollY,
				windowWidth: window.innerWidth,
				windowHeight: window.innerHeight
			}).then(canvas => {
				// Create a link to download the screenshot
				const link = document.createElement('a');
				link.href = canvas.toDataURL('image/png');
				link.download = screenshotName + '.png';
				link.click();

				alert("Screenshot captured and downloaded!");
			});
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
};
