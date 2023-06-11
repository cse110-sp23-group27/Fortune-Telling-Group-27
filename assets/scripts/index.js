import * as consts from "./consts.js";
import TarotCard from "./TarotCard.js";

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
// Sound effect for burger bar sliding
const menuSound = document.getElementById("menu-slider");
// Sound effect for shuffling cards
const shuffleSound = document.getElementById("shuffle-button");
// Sound effect for selecting cards
const selectedCardSound = document.getElementById("card-selecting");

/**
 * Binds the home page buttons to change the type of
 * consts.FORTUNETYPE that is displayed
 * @author Elvis Joa
 * @date 5/21/2023
 */
function bindHomePageBtns() {
	const tarotCardBtn = document.getElementById("toTarotCard");
	const eggBtn = document.getElementById("toEgg");
	const boneBtn = document.getElementById("toBoneTossing");

	tarotCardBtn.addEventListener("click", () => {
		displayGeneralUIElements(consts.FORTUNETYPES.tarotCard);
		tarotDiv.hidden = false;
		document.getElementById("tarotShuffleBtn").hidden = false;
		addFogBackground();
		homePageBool = false;
	});

	eggBtn.addEventListener("click", () => {
		alert("TO BE DEVELOPED");
	});

	boneBtn.addEventListener("click", () => {
		alert("TO BE DEVELOPED");
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
		displayGeneralUIElements();
		document.getElementById("centerText").textContent = "";
		document.getElementById("response").textContent = "";
		const responseCards =
			document.getElementsByClassName("responseCards");
		while (responseCards.length > 0) {
			ifNotNullRemove(responseCards[0]);
		}
		tarotDiv.hidden = true;
		homePageBool = true;
		resetCards();
		removeFogBackground();
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
 * Displays the UI elements that are needed and wanted
 * @author Elvis Joa
 * @date 5/21/2023
 * @param {string} fortuneType - Displays elements for this fortune type
 */
function displayGeneralUIElements(fortuneType =null) {
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

	await playCardThrowAnimation();
	await TarotCard.wait(100);
	await playShuffleAnimation();
	await playCardSpreadAnimation();
	shuffleHeader.hidden = false;
	homeBtn.disabled = false;
	resetBtn.hidden = false;
}

/**
 * Plays the card throw animation
 * @date 6/6/2023 - 1:58:41 PM
 * @author Victor Kim
 *
 * @async
 * @return {None}
 */
async function playCardThrowAnimation() {
	const cards = TarotCard.getAllCards();
	// unhide, move, and make unclickable
	cards.forEach((card) => {
		card.cardElement.hidden = false;
		card.setClickable(false);
		card.moveInstantly(consts.preThrow_card_pos);
	});
	await TarotCard.wait(200);
	await cards[cards.length - 1].movePromise(
		cards[cards.length - 1].getPositionPoint(),
		consts.preThrow_card_pos,
		200
	);
	await TarotCard.wait(100);
	// throw in random directions
	for (let i = 0; i < cards.length - 1; i++) {
		cards[i].movePromise(cards[i].getPositionPoint(),
			cardThrowRandomPos(), 200);
		cards[i].rotatePromise(0, cardThrowRandomRot(), 230);

		await TarotCard.wait(50);
	}
	cards[cards.length - 1].movePromise(
		cards[cards.length - 1].getPositionPoint(),
		cardThrowRandomPos(),
		200
	);

	return cards[cards.length - 1].rotatePromise(0, cardThrowRandomRot(), 230);
}


/**
 * Givs random rotation acording to card throw animation constants
 * @date 6/6/2023 - 7:51:33 PM
 * @author Victor Kim
 *
 * @return {*}
 */
function cardThrowRandomRot() {
	return consts.afterThrow_card_Rotation_min +
	Math.random()*consts.afterThrow_card_Rotation_max;
}

/**
 * Gives random position acording to card throw animation constants
 * @date 6/6/2023 - 7:51:57 PM
 * @author Victor Kim
 *
 * @return {Object} { x: any; y: any; }
 */
function cardThrowRandomPos() {
	return {
		x: consts.afterThrow_card_X_min +
			Math.random()*consts.afterThrow_card_X_max,
		y: consts.afterThrow_card_Y_min +
			Math.random()*consts.afterThrow_card_Y_max
	};
}

/**
 * Will play the shuffle animation for the current cards
 * @date 5/29/2023 - 9:20:17 PM
 */
async function playShuffleAnimation() {
	const cards = TarotCard.getAllCards();

	// Move all to center and rotate in to deck
	for (let i = 0; i < cards.length - 1; i++) {
		const card = cards[i];
		card.move(card.getPositionPoint(), consts.shuffle_deck_pos, 200);
		card.rotate(card.getRotation(), 0, 200);
		await TarotCard.wait(50);
	}
	cards[cards.length - 1].move(
		cards[cards.length - 1].getPositionPoint(),
		consts.shuffle_deck_pos,
		200
	);
	await cards[cards.length - 1].rotatePromise(
		cards[cards.length - 1].getRotation(),
		0,
		200
	);
	await TarotCard.wait(350);
	// make 3 shuffles
	for (let i = 0; i < 3; i++) {
		// pick random card
		const randCard = cards[Math.floor(22 * Math.random())];
		// move away
		await randCard.movePromise(
			consts.shuffle_deck_pos,
			consts.shuffle_card_pos,
			350
		);

		const startZIndex = randCard.getZIndex();
		randCard.setZIndex(100 + i);
		// pause
		await TarotCard.wait(30);

		// move back
		await randCard.movePromise(
			consts.shuffle_card_pos,
			consts.shuffle_deck_pos,
			350
		);
		randCard.setZIndex(startZIndex);
		// pause
		await TarotCard.wait(50);
	}
	return TarotCard.wait(350);
}

/**
 * Plays the card spread animation
 * @date 5/29/2023 - 10:18:49 PM
 * @param {Function} callback a callback function for end of animation
 */
async function playCardSpreadAnimation() {
	const cards = TarotCard.getAllCards();
	for (let i = 0; i < cards.length; i++) {
		const card = cards[i];
		card.setClickable(true);

		const cardMovePromise = card.movePromise(
			consts.shuffle_deck_pos,
			{x: 10 + (80/cards.length)*i, y: consts.cardY},
			300,
			()=>{
				if (i === cards.length - 1) {
					return card.setClickable(true);
				}
			}
		);
		if (i === cards.length - 1) {
			return cardMovePromise;
		}
		card.setClickable(true);
	}
}

/**
 * Creates and displays the tarot cards that are selected. Cards will change
 * in appearance if they are selected. 3 cards have to be selected.
 * @authors Elvis Joa, Daniel Lee, and Kevin Wong
 * @date 5/27/2023
 */
function createShuffleCards() {
	// pastHeader.hidden = true;
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
						btn.classList.toggle("cardsBtnPreShuffle");
						btn.classList.remove("cardBtnPreShuffleShadow");
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
	const deck = window.localStorage.getItem("deck");
	const deckArr = JSON.parse(deck);
	const cardIndex = button.getAttribute("cardIndex");
	const tarotCard = consts.CARDSJSON[cardIndex];
	const name = toCamelCase(tarotCard["name"]);
	if (deckArr !== null) {
		console.log(deckArr);
		if (deckArr.indexOf(name) === -1) {
			deckArr.push(name);
		}
		localStorage.setItem("deck", JSON.stringify(deckArr));
	} else {
		const arr = JSON.stringify([name]);
		console.log(arr);
		localStorage.setItem("deck", arr);
	}
}

/**
 * Hides or shows the card names found in the cards found menu
 * @author Daniel Lee
 * @date 6/10/2023
 */
function showCardsFound() {
	// select all card names in the second burger bar and get the deck values from local storage
	const cardsInMenu = document.getElementsByClassName("menuItemTwo");
	const deck = window.localStorage.getItem("deck");
	const deckArr = JSON.parse(deck);
	// if the deck array has the cardBtn ID, set display to none
	// otherwise, set display to block
	for (let i = 0; i < cardsInMenu.length; i++) {
		if (deckArr !== null &&
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
			console.log(card.getPositionPoint());
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
					const card = Math.floor(Math.random()*21);
					if (cardsTypeSelected.indexOf(card) === -1) {
						cardsTypeSelected.push(card);
					}
				}
				for (let i = 2; i >= 0; i--) {
					const cardOption = selectedHTMLCards[i];
					const tarotCard = consts.CARDSJSON[cardsTypeSelected[i]];
					const imageSrc = tarotCard["img"];
					cardOption.setAttribute("cardIndex", cardsTypeSelected[i]);
					cardOption.innerHTML =
						"<img class = \"chosenCards\"src=\"" + imageSrc +
						"\" alt = \"" + tarotCard["imgDescription"] + "\">";
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

	cardCounter = 0; // reset the cardCounter when resetting cards
	cardsSelected = false;
}

/**
 * Adds a fog background to the tarot card page
 * @date 5/31/2023
 */
function addFogBackground() {
	const fog = document.createElement("div");
	fog.className = "fogwrapper";
	fog.innerHTML = `<div id="foglayer_01" class="fog">
							<div class="image01"></div>
							<div class="image02"></div>
						</div>
						<div id="foglayer_02" class="fog">
							<div class="image01"></div>
							<div class="image02"></div>
						</div>
						<div id="foglayer_03" class="fog">
							<div class="image01"></div>
							<div class="image02"></div>
						</div>`;
	tarotDiv.append(fog);
	document.body.style.backgroundColor = "black";
}

/**
 * Removes the fog background from the tarot card page
 * @date 5/31/2023
 */
function removeFogBackground() {
	const fogWrapper = document.getElementsByClassName("fogwrapper")[0];
	if (fogWrapper) {
		fogWrapper.remove();
	}
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
	showCardsFound();
	bindHomePageBtns();
	bindGeneralButtons();
	createShuffleAndResetBtnAndHeaders();
	createShuffleCards();
	generateCardHeaders();
	bindMenuBtns();
}

init();

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
	menuBtns.forEach(function(menuBtns) {
		menuBtns.addEventListener("click", function() {
			menuSound.play();
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