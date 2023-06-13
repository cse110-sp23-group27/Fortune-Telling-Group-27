import * as consts from "./consts.js";
import TarotCard from "./TarotCard.js";
import * as TarotAnimation from "./tarotCardAnimation.js";

// Div that contains all tarot card page elements
const tarotDiv = document.getElementById("tarotDiv");
// Response texts
const response = document.getElementById("response");
// Global cardCounter variable, moved because couldn't reset the cards. DANGER!
let cardCounter = 0;
// Global variable that shows if 3 cards have been selected
let cardsSelected = false;
// Global homepage varible for checking if on homepage
let homePageBool = true;

/**
 * Binds the home page buttons to change the type of
 * consts.FORTUNETYPE that is displayed
 * @author Elvis Joa
 * @date 5/21/2023
 */
function bindHomePageBtns() {
	const tarotCardBtn = document.getElementById("toTarotCard");

	tarotCardBtn.addEventListener("click", () => {
		changeUIVisibility();
		tarotDiv.hidden = false;
		document.getElementById("tarotShuffleBtn").hidden = false;
		TarotAnimation.addFogBackground();
		homePageBool = false;
	});
}

/**
 * Binds the functionality of the menu buttons (the book and the burger bar checkboxes)
 */
function bindMenuBtns() {
	/**
	 * Changed the functionality so that we don't have to copy paste.
	 * If for some reason someone wants to add more hamburger bars in the future,
	 * then they can add the same functionality by adding in the name.
	 * @author Kevin Wong
	 * @date 6/9/2023
	 */
	const menuBtns = document.querySelectorAll(".menuBtn, .menuBtnTwo");
	const menus = document.querySelectorAll(".menuBox, .menuBoxTwo");
	// Sound effect for burger bar sliding
	const menuSound = document.getElementById("menu-slider");
	menuBtns.forEach(function(menuBtns) {
		menuBtns.addEventListener("click", function() {
			menuSound.play();
			// add console.log
		});
	});
	menus.forEach(function(menu) {
		menu.addEventListener("mouseleave", function() {
			// remove "menuBox" from the class name and add "#menuToggle"
			const toggleId = "#" + menu.className.replace(
				"menuBox", "menuToggle");
			menuSound.play();
			document.querySelector(toggleId).checked = false;
			cardBook.src = consts.CARD_BOOK_IMG_URL; // Turn back to initial state
		});
	});
}


/**
 * Binds the buttons that appear at the top left for
 * all consts.FORTUNE telling,
 * more specifically the home, options, and GitHub buttons.
 * @author Elvis Joa
 * @date 5/21/2023
 */
function bindGeneralButtons() {
	const homeBtn = document.getElementById("toHome");
	// Added to reset cards on click
	homeBtn.addEventListener("click", () => toHomeButtonClick());

	const docBtn = document.getElementById("toDocumentation");
	const githubBtn = document.getElementById("toGitHub");
	const introBtn = document.getElementById("toIntro");

	docBtn.addEventListener("click", () => {
		// eslint-disable-next-line max-len
		window.open("https://cse110-sp23-group27.github.io/Fortune-Telling-Group-27/specs/documentation/generated/index.html");
	});
	githubBtn.addEventListener("click", () => {
		// eslint-disable-next-line max-len
		window.open("https://github.com/cse110-sp23-group27/Fortune-Telling-Group-27/tree/main");
	});
	introBtn.addEventListener("click", () => {
		// eslint-disable-next-line max-len
		window.open("https://github.com/cse110-sp23-group27/Fortune-Telling-Group-27/blob/main/specs/documentation/user-introduction.md");
	});
}


/**
 * What happens when you click the home button
 * @date 6/6/2023 - 7:20:31 PM
 * @author Victor Kim
 */
function toHomeButtonClick() {
	const resetBtn = document.getElementById("tarotResetBtn");
	const shuffleBtn = document.getElementById("tarotShuffleBtn");

	if (!homePageBool) {
		changeUIVisibility();
		document.getElementById("response").textContent = "";
		const responseCards =
			document.getElementsByClassName("responseCards");
		while (responseCards.length > 0) {
			ifNotNullRemove(responseCards[0]);
		}
		tarotDiv.hidden = true;
		homePageBool = true;
		resetCards();
		TarotAnimation.removeFogBackground();
	}
	hideHeaders();
	ifNotNullHide(resetBtn);
	ifNotNullHide(shuffleBtn);
}

/**
 * Hides past present and future headers for the cards
 */
function hideHeaders() {
	const shuffleHeader = document.getElementById("shuffleHeaderText");
	const pastHeader = document.getElementById("pastHeaderText");
	const presentHeader = document.getElementById("presentHeaderText");
	const futureHeader = document.getElementById("futureHeaderText");
	shuffleHeader.hidden = true;
	pastHeader.hidden = true;
	presentHeader.hidden = true;
	futureHeader.hidden = true;
}

/**
 * Hides the element if the element is not null
 * @param {element} element The element in question
 */
function ifNotNullHide(element) {
	if (element !== null) {
		element.hidden = true;
	}
}

/**
 * Removes the element from tarotDiv if the element is not null
 * @param {element} element The element in question
 */
function ifNotNullRemove(element) {
	if (element !== null) {
		tarotDiv.removeChild(element);
	}
}

/**
 * Displays the UI elements that are needed and wanted
 * @author Elvis Joa
 * @date 5/21/2023
 */
function changeUIVisibility() {
	// Hides/Displays the home page buttons as needed
	const homeBtns = document.getElementsByClassName("homePage");
	for (let i = 0; i < homeBtns.length; i++) {
		homeBtns[i].hidden = !homeBtns[i].hidden;
	}
	response.textContent = "";
}

/**
 * Creates and displays the shuffle and reset button that should control the animation
 * for the tarot cards. Also creates Header text elements.
 * @authors Elvis Joa, Daniel Lee, and Kevin Wong
 * @date 5/27/2023
 */
function createShuffleAndResetBtnAndHeaders() {
	const shuffleBtn = document.createElement("button");
	const resetBtn = document.createElement("button");
	const shuffleHeader = document.createElement("h1");
	shuffleHeader.id = "shuffleHeaderText";
	shuffleHeader.textContent = "Select Three Cards";
	shuffleHeader.hidden = true;
	shuffleBtn.id = "tarotShuffleBtn";
	shuffleBtn.textContent = "SHUFFLE CARDS";
	// Sound effect for shuffling cards
	const shuffleSound = document.getElementById("shuffle-button");

	shuffleBtn.addEventListener("click", async () => {
		shuffleSound.play();
		shuffleCards();
	});

	resetBtn.id = "tarotResetBtn";
	resetBtn.textContent = "RESHUFFLE";
	resetBtn.hidden = true;
	resetBtn.addEventListener("click", async () => {
		resetCards();
		hideHeaders();
		shuffleSound.play();
		response.textContent = "";
		shuffleCards();
	}
	);

	tarotDiv.append(shuffleBtn);
	tarotDiv.append(resetBtn);
	tarotDiv.append(shuffleHeader);
}

/**
 * Start shuffle animation
 */
async function shuffleCards() {
	const shuffleBtn = document.getElementById("tarotShuffleBtn");
	const resetBtn = document.getElementById("tarotResetBtn");
	const homeBtn = document.getElementById("toHome");
	const shuffleHeader = document.getElementById("shuffleHeaderText");
	homeBtn.disabled = true;
	shuffleBtn.hidden = true;
	resetBtn.hidden = true;
	const cards = document.getElementsByClassName("cardsBtnPreShuffle");
	for (let card = 0; card < cards.length; card++) {
		const cardOption = cards[card];
		cardOption.hidden = false;
	}

	await TarotAnimation.playCardThrowAnimation();
	await TarotCard.wait(100);
	await TarotAnimation.playShuffleAnimation();
	await TarotAnimation.playCardSpreadAnimation();
	shuffleHeader.hidden = false;
	homeBtn.disabled = false;
	resetBtn.hidden = false;
}

/**
 * Creates and displays the tarot cards that are selected. Cards will change
 * in appearance if they are selected. 3 cards have to be selected.
 * @authors Elvis Joa, Daniel Lee, and Kevin Wong
 * @date 5/27/2023
 */
function createShuffleCards() {
	let cardsFaceUp = [];
	// Sound effect for selecting cards
	const selectedCardSound = document.getElementById("card-selecting");

	for (let i = 0; i < 22; i++) {
		const button = document.createElement("button");
		button.id = "Option " + i;
		button.className = "cardsBtnPreShuffle";
		button.hidden = true;
		button.innerHTML = "<img class = \"chosenCards\"src=\"" +
			consts.cardBack+"\">";
		button.style.backgroundColor = "white";
		button.setAttribute("selected", false);
		// Change appearance when selected/unselected
		button.addEventListener("click", () =>{
			selectedCardSound.play();
			if (cardsSelected) {
				// Response should only change when the text is completely revealed,
				// or response is empty
				if (response.textContent === "" ||
					getComputedStyle(response).opacity == 1) {
					response.classList.add("fade-in");
					setTimeout(() => {
						response.classList.remove("fade-in");
					}, 2500);
					response.textContent = button.value;
				}

				if (!cardsFaceUp.includes(button)) {
					for (let i = 0; i < cardsFaceUp.length; i++) {
						cardsFaceUp[i].innerHTML =
						"<img class = \"chosenCards\"src=\""+
						consts.cardBack+"\">";
					}
					cardsFaceUp = [];
					const cardIndex = button.getAttribute("cardIndex");
					const tarotCard = consts.CARDSJSON[cardIndex];
					const imageSrc = tarotCard["img"];
					button.innerHTML = "<img class = \"chosenCards\"src=\"" +
					imageSrc+"\" alt = \"" + tarotCard["imgDescription"]+ "\">";
					cardsFaceUp.push(button);
				}

				response.textContent = button.value;
				// add to local storage
				// set response value
				updateLocalStorage(button);
				showCardsFound();
				return;
			}

			if (button.getAttribute("selected") === "true") {
				button.classList.toggle("cardsBtnPreShuffle");
				button.classList.remove("cardBtnPreShuffleShadow");
				button.setAttribute("selected", false);
				button.style.backgroundColor = "white";
				cardCounter--;
			} else {
				button.classList.toggle("cardsBtnPreShuffle");
				button.classList.add("cardBtnPreShuffleShadow");
				button.setAttribute("selected", true);
				button.style.backgroundColor = "black";
				cardCounter++;
			}

			if (cardCounter == 3) {
				for (let i = 0; i < 22; i++) {
					const btn = document.getElementById("Option " + i);
					if (btn.getAttribute("selected") === "true") {
						btn.classList.remove("cardBtnPreShuffleShadow");
						btn.classList.toggle("cardsBtnPreShuffle");
					}
				}
				cardCounter = 0;
				displayThreeOptions();
			}
		});
		tarotDiv.appendChild(button);
	}

	// get all of the cards and make them into the TarotCard classes
	for (let card = 0; card < 22; card++) {
		const cardOption = document.getElementById("Option " + card);
		new TarotCard(cardOption);
	}
}

/**
 * Generates the card headers for past, present and future in selection screen
 */
function generateCardHeaders() {
	const pastHeader = document.createElement("h1");
	const presentHeader = document.createElement("h1");
	const futureHeader = document.createElement("h1");
	pastHeader.id = "pastHeaderText";
	pastHeader.textContent = "Past";
	presentHeader.id = "presentHeaderText";
	presentHeader.textContent = "Present";
	futureHeader.id = "futureHeaderText";
	futureHeader.textContent = "Future";
	pastHeader.hidden = true;
	presentHeader.hidden = true;
	futureHeader.hidden = true;
	tarotDiv.appendChild(pastHeader);
	tarotDiv.appendChild(presentHeader);
	tarotDiv.appendChild(futureHeader);
}

/**
 * Shows all card headers
 */
function showCardHeaders() {
	const pastHeader = document.getElementById("pastHeaderText");
	const presentHeader = document.getElementById("presentHeaderText");
	const futureHeader = document.getElementById("futureHeaderText");
	pastHeader.hidden = false;
	presentHeader.hidden = false;
	futureHeader.hidden = false;
}

/**
 * Updates local storage with the names of the cards that have been found
 * @param {button} button - the card button that was just clicked to reveal text
 * @author Daniel Lee
 * @date 6/10/2023
 */
function updateLocalStorage(button) {
	// get local storage stuff and parse
	const deckArr = getDeck();
	const cardIndex = button.getAttribute("cardIndex");
	const tarotCard = consts.CARDSJSON[cardIndex];
	const name = toCamelCase(tarotCard["name"]);
	if (deckArr !== null) {
		if (deckArr.indexOf(name) === -1) {
			deckArr.push(name);
		}
		localStorage.setItem("deck", JSON.stringify(deckArr));
	} else {
		const arr = JSON.stringify([name]);
		localStorage.setItem("deck", arr);
	}
}

/**
 * Gets the deck array in localstorage. If the deck is undefined, returns an empty array
 * @return {String[]} The list of strings in the deck localstorage or an empty array if deck is null or undefined.
 */
function getDeck() {
	const deck = window.localStorage.getItem("deck");
	let deckArr = [];
	if (deck !== null && deck !== undefined) {
		deckArr = JSON.parse(deck);
	}
	return deckArr;
}

/**
 * Hides or shows the card names found in the cards found menu
 * @author Daniel Lee
 * @date 6/10/2023
 */
function showCardsFound() {
	// select all card names in the second burger bar and get the deck values from local storage
	const cardsInMenu = document.getElementsByClassName("menuItemTwo");
	const deckArr = getDeck();
	// if the deck array has the cardBtn ID, set display to none
	// otherwise, set display to block
	// Uses short circuit evaluation to check for deckArr
	for (let i = 0; i < cardsInMenu.length; i++) {
		if (deckArr.length > 0 &&
			deckArr.indexOf(cardsInMenu[i].id) !== -1) {
			cardsInMenu[i].style.display = "block";
		} else {
			cardsInMenu[i].style.display = "none";
		}
	}
}
/**
 * Converts any string to camel case.
 * From https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
 *
 * @param {String} str String to be converted
 * @return {String} The String now follows camel case conventions (no spaces, capitalized words after space).
 * @date 6/10/2023
 */
function toCamelCase(str) {
	return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
		return index === 0 ? word.toLowerCase() : word.toUpperCase();
	}).replace(/\s+/g, "");
}

/**
 * After selecting three cards, 3 cards will appear, and from left to right,
 * the cards represent the past, present and future descriptions.
 * @authors Elvis Joa, Daniel Lee, and Kevin Wong
 * @date 5/27/2023
 */
function displayThreeOptions() {
	// get html elements of selected cards
	const selectedHTMLCards = [];
	for (let i = 0; i < 22; i++) {
		const button = document.getElementById(`Option ${i}`);
		if (button.getAttribute("selected") === "true") {
			selectedHTMLCards.push(button);
			button.setAttribute("selected", false);
		}
	}
	cardsSelected = true;

	const shuffleHeader = document.getElementById("shuffleHeaderText");
	shuffleHeader.hidden = true;
	let selectedCardsFound = 0;
	let cardsMoved = 0;
	TarotCard.getAllCards().forEach((card) => {
		if (selectedHTMLCards.includes(card.cardElement)) {
			card.move(card.getPositionPoint(),
				{x: 20+(selectedCardsFound*(60/2)), y: 10}, 350);
			selectedCardsFound++;
		} else {
			const curPos = card.getPositionPoint();
			card.move(curPos, {x: curPos.x, y: -100}, 350, ()=>{
				cardsMoved++;
				if (cardsMoved < 3) {
					return;
				}
				const cardsTypeSelected = [];
				while (cardsTypeSelected.length < 3) {
					const card = Math.floor(Math.random()*22);
					if (cardsTypeSelected.indexOf(card) === -1) {
						cardsTypeSelected.push(card);
					}
				}
				for (let i = 2; i >= 0; i--) {
					const cardOption = selectedHTMLCards[i];
					const tarotCard = consts.CARDSJSON[cardsTypeSelected[i]];
					cardOption.setAttribute("cardIndex", cardsTypeSelected[i]);

					switch (i + 1) {
					case 1:
						cardOption.value = tarotCard["pastDescription"];
						break;
					case 2:
						cardOption.value = tarotCard["presentDescription"];
						break;
					default:
						cardOption.value = tarotCard["futureDescription"];
					}
				}
			});
		}
	});
	showCardHeaders();
}

/**
 * Function to reset cards on home page press, goes through each
 * card and resets it to default values
 * @authors Kevin Wong
 * @date 5/29/2023
 */
function resetCards() {
	for (let card = 0; card < 22; card++) {
		const cardOption = document.getElementById("Option " + card);
		const btn = document.getElementById("Option " + card);
		if (btn.getAttribute("selected") === "true") {
			btn.classList.toggle("cardsBtnPreShuffle");
			btn.classList.remove("cardBtnPreShuffleShadow");
		}
		cardOption.innerHTML =
			"<img class = \"chosenCards\"src="+consts.cardBack +">";
		if (cardOption) {
			cardOption.setAttribute("selected", false);
			cardOption.style.backgroundColor = "white";
			cardOption.hidden = true;
		}
	}
	cardCounter = 0;
	cardsSelected = false;
}

/**
 * Event Listener for changing book png from closed to open on click.
 * Uses another global variable, and the opacity stuff is so that on refresh
 * the user doesn't see a non-loaded image icon
 * @author Kevin Wong
 * @@date 6/9/2023
 */
const cardBook = document.querySelector("#cardBook");
cardBook.src = consts.CARD_BOOK_IMG_URL; // Set the initial state

cardBook.addEventListener("load", function() {
	cardBook.style.opacity = 1;
});

document.querySelector("#menuToggleTwo").addEventListener("change", (event) => {
	cardBook.style.opacity = 0;
	if (event.target.checked) {
		document.querySelector("#cardBook").src = consts.OPEN_BOOK_IMG_URL;
	} else {
		document.querySelector("#cardBook").src = consts.CARD_BOOK_IMG_URL;
	}
	cardBook.addEventListener("load", function() {
		cardBook.style.opacity = 1;
	});
});


/**
 * Initializes home page
 */
function init() {
	bindHomePageBtns();
	bindMenuBtns();
	bindGeneralButtons();
	showCardsFound();
	createShuffleAndResetBtnAndHeaders();
	createShuffleCards();
	generateCardHeaders();
}

init();