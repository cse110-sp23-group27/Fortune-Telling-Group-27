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

	/**
     * Added changeBackgroundColor and the mouseOver and mouseOut listeners.
     * @author Kevin Wong
     * @date 5/24/2023
     * @param {string} color - A parameter for what color the background
     * should be.
     */
	function changeBackgroundColor(color) {
		document.body.style.backgroundColor = color;
	}

	tarotCardBtn.addEventListener("click", () => {
		displayGeneralUIElements(consts.FORTUNETYPES.tarotCard);
		tarotDiv.hidden = false;
		document.getElementById("tarotShuffleBtn").hidden = false;
		// addFogBackground();
		homePageBool = false;
	});

	tarotCardBtn.addEventListener("mouseover", () => {
		changeBackgroundColor("red");
	});

	tarotCardBtn.addEventListener("mouseout", () => {
		changeBackgroundColor("black");
	});

	eggBtn.addEventListener("click", () => {
		homePageBool = false;
		console.log(consts.FORTUNETYPES.egg);
		displayGeneralUIElements(consts.FORTUNETYPES.egg);
		document.getElementById("center-text").textContent =
            consts.FORTUNETYPES.egg;
		document.getElementById("response").textContent =
            "THIS IS THE RESPONSE FOR THE EGG";
	});

	eggBtn.addEventListener("mouseover", () => {
		changeBackgroundColor("blue");
	});

	eggBtn.addEventListener("mouseout", () => {
		changeBackgroundColor("black");
	});

	boneBtn.addEventListener("click", () => {
		homePageBool = false;
		console.log(consts.FORTUNETYPES.bone);
		displayGeneralUIElements(consts.FORTUNETYPES.bone);
		document.getElementById("center-text").textContent =
            consts.FORTUNETYPES.bone;
		document.getElementById("response").textContent =
            "THIS IS THE RESPONSE FOR THE BONE TOSSING";
	});


	boneBtn.addEventListener("mouseover", () => {
		changeBackgroundColor("green");
	});

	boneBtn.addEventListener("mouseout", () => {
		changeBackgroundColor("black");
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
	// const homeBtn = document.getElementById("toHome");
	// // Added to reset cards on click
	// homeBtn.addEventListener("click", () => {
	// 	if (!homePageBool) {
	// 		displayGeneralUIElements();
	// 		document.getElementById("center-text").textContent = "";
	// 		document.getElementById("response").textContent = "";
	// 		const responseCards =
	// 			document.getElementsByClassName("responseCards");
	// 		while (responseCards.length > 0) {
	// 			tarotDiv.removeChild(responseCards[0]);
	// 		}
	// 		tarotDiv.hidden = true;
	// 		homePageBool = true;
	// 		resetCards();
	// 		removeFogBackground();
	// 	}
	// });

	const githubBtn = document.getElementById("toGitHub");
	githubBtn.addEventListener("click", () => {
		navigator.clipboard.writeText(
			"https://github.com/cse110-sp23-group27/Fortune-Telling-Group-27");
	});
}

/**
 * Displays the UI elements that are needed and wanted
 * @author Elvis Joa
 * @date 5/21/2023
 * @param {string} fortuneType - Displays elements for this fortune type
 */
function displayGeneralUIElements(fortuneType =null) {
	// Changes the general buttons (home, options, GitHub)
	const generalBtns = document.getElementsByClassName("general");
	for (let i = 0; i < generalBtns.length; i++) {
		generalBtns[i].hidden = !generalBtns[i].hidden;
	}

	// Hides/Displays the option button that is needed if any
	for (let i = 0; i < 3; i++) {
		const optionsBtn = document.getElementById(
			consts.FORTUNELIST[i]+"Options");
		optionsBtn.hidden = true;
	}
	if (fortuneType != null) {
		const optionsBtn = document.getElementById(fortuneType + "Options");
		optionsBtn.hidden = !optionsBtn.hidden;
	}

	// Hides/Displays the home page buttons as needed
	const homeBtns = document.getElementsByClassName("home-page");
	for (let i = 0; i < homeBtns.length; i++) {
		homeBtns[i].hidden = !homeBtns[i].hidden;
	}
	response.textContent = "";
}

/**
 * Creates and displays the shuffle button that should trigger the animation
 * for the tarot cards.
 * @authors Elvis Joa, Daniel Lee, and Kevin Wong
 * @date 5/27/2023
 */
function createShuffleBtn() {
	const shuffleBtn = document.createElement("button");
	shuffleBtn.id = "tarotShuffleBtn";
	shuffleBtn.textContent = "SHUFFLE CARDS";
	shuffleBtn.addEventListener("click", () => {
		shuffleBtn.hidden = true;
		const cards = document.getElementsByClassName("cardsBtnPreShuffle");
		for (let card = 0; card < cards.length; card++) {
			const cardOption = cards[card];
			cardOption.hidden = false;
		}
		playShuffleAnimation(()=>{
			playCardSpreadAnimation();
		});
	});
	tarotDiv.append(shuffleBtn);
}

function bindStartButton() {
	const startBtn = document.getElementById("tarotStartBtn");
	startBtn.addEventListener("click", async ()=>{
		const cards = TarotCard.getAllCards();
		// move all cards and wait for last one
		for (let i = 0; i < cards.length - 1; i++) {
			cards[i].movePromise(cards[i].getPositionPoint(), consts.preThrow_card_pos, 200);
		}
		await cards[cards.length - 1].movePromise(cards[cards.length - 1].getPositionPoint(), consts.preThrow_card_pos, 200);
		await TarotCard.wait(100);
		// throw in random directions
		for (let i = 0; i < cards.length - 1; i++) {
			const pos = {
				x: consts.afterThrow_card_X_min + Math.random()*consts.afterThrow_card_X_max,
				y: consts.afterThrow_card_Y_min + Math.random()*consts.afterThrow_card_Y_max
			};
			const rot = consts.afterThrow_card_Rotation_min + Math.random()*consts.afterThrow_card_Rotation_max
			cards[i].movePromise(cards[i].getPositionPoint(), pos, 200);
			cards[i].rotatePromise(0, rot, 230);
		}
		const pos = {
			x: consts.afterThrow_card_X_min + Math.random()*consts.afterThrow_card_X_max,
			y: consts.afterThrow_card_Y_min + Math.random()*consts.afterThrow_card_Y_max
		};
		const rot = consts.afterThrow_card_Rotation_min + Math.random()*consts.afterThrow_card_Rotation_max
		cards[cards.length - 1].movePromise(cards[cards.length - 1].getPositionPoint(), pos, 200);
		await cards[cards.length - 1].rotatePromise(0, rot, 230);
	});
}

function bindShuffleButton() {
	const shuffleBtn = document.getElementById("tarotShuffleBtn");
	shuffleBtn.addEventListener("click", ()=>{
		shuffleBtn.hidden = true;
		const cards = document.getElementsByClassName("cardsBtnPreShuffle");
		for (let card = 0; card < cards.length; card++) {
			const cardOption = cards[card];
			cardOption.hidden = false;
		}
		playShuffleAnimation(()=>{
			playCardSpreadAnimation();
		});
	});
}


/**
 * Will play the shuffle animation for the current cards
 * @date 5/29/2023 - 9:20:17 PM
 * @param {Function} callback a callback function for end of animation
 */
function playShuffleAnimation(callback) {
	const tCards = TarotCard.getAllCards();
	// Move all to center
	tCards.forEach((tCard) => {
		// block clicks too
		tCard.setClickable(false);
		tCard.moveInstantly({x: consts.cardX, y: consts.cardY});
	});

	// make 3 shuffles
	let shuffleCount = 0;
	const shuffleSequence = (callback)=>{
		// pick random card
		const randCard = tCards[Math.floor(22 * Math.random())];
		// move away
		randCard.move({x: consts.cardX, y: consts.cardY},
			{x: consts.cardX+2, y: consts.cardY}, 350, ()=>{
				randCard.move({x: consts.cardX+2, y: consts.cardY},
					{x: consts.cardX, y: consts.cardY}, 350, ()=>{
						shuffleCount++;
						if (shuffleCount < 3) {
							shuffleSequence(callback);
						} else {
							callback();
						}
					});
			});
	};
	shuffleSequence(()=>{
		// finished shuffling
		callback();
	});
}

/**
 * Plays the card spread animation
 * @date 5/29/2023 - 10:18:49 PM
 * @param {Function} callback a callback function for end of animation
 */
function playCardSpreadAnimation(callback) {
	const tCards = TarotCard.getAllCards();
	let cardXoffset = 0;
	let cardsFinished = 0;
	console.log(tCards.length);
	tCards.forEach((tCard) => {
		tCard.setClickable(true);
		tCard.move({x: consts.cardX, y: consts.cardY},
			{x: 10 + (80/tCards.length)*cardXoffset,
				y: consts.cardY}
			, 300, ()=>{
				tCard.setClickable(true);
				if (cardsFinished >= tCards.length) {
					callback();
				}
				cardsFinished++;
			});
		cardXoffset++;
	});
}

/**
 * Creates and displays the tarot cards that are selected. Cards will change
 * in appearance if they are selected. 3 cards have to be selected.
 * @authors Elvis Joa, Daniel Lee, and Kevin Wong
 * @date 5/27/2023
 */
function createShuffleCards() {
	for (let i = 0; i < 22; i++) {
		const button = document.createElement("button");
		button.id = "Option " + i;
		button.className = "cardsBtnPreShuffle";
		button.hidden = true;
		button.innerHTML = "<img class = \"chosenCards\"src=\"" +
			consts.CARD_BACK+"\">";
		button.style.backgroundColor = "white";
		button.setAttribute("selected", false);
		// Change appearance when selected/unselected
		button.addEventListener("click", () =>{
			if (cardsSelected) {
				response.textContent = button.value;
				return;
			}

			if (button.getAttribute("selected") === "true") {
				button.setAttribute("selected", false);
				button.style.backgroundColor = "white";
				cardCounter--;
			} else {
				button.setAttribute("selected", true);
				button.style.backgroundColor = "black";
				cardCounter++;
			}

			if (cardCounter == 3) {
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
					cardOption.innerHTML =
						"<img class = \"chosenCards\"src=\"" +imageSrc+"\"/>";
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

					// TODO: Find a better way to do this,
					// apparently this can cause a memory leak
					// but don't have time to make a better solution rn
					// https://stackoverflow.com/questions/9251837/how-to-remove-all-listeners-in-an-element
					// remove old on click events
					/* cardOption.hidden = true;
					const clonedCardOption = cardOption.cloneNode(true);
					clonedCardOption.className = "responseCards21";
					// const tempCardOption = cardOption;
					cardOption.parentNode.replaceChild(
						clonedCardOption, cardOption);
					// tempCardOption.remove();
					cardOption.hidden = false;
					tarotDiv.appendChild(cardOption);*/
				}
			});
		}
	});
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
		cardOption.innerHTML =
			"<img class = \"imagesPreShuffle\"src="+consts.CARD_BACK +">";
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
// function addFogBackground() {
// 	const fog = document.createElement("div");
// 	fog.className = "fogwrapper";
// 	fog.innerHTML = `<div id="foglayer_01" class="fog">
// 							<div class="image01"></div>
// 							<div class="image02"></div>
// 						</div>
// 						<div id="foglayer_02" class="fog">
// 							<div class="image01"></div>
// 							<div class="image02"></div>
// 						</div>
// 						<div id="foglayer_03" class="fog">
// 							<div class="image01"></div>
// 							<div class="image02"></div>
// 						</div>`;
// 	tarotDiv.append(fog);
// 	document.body.style.backgroundColor = "black";
// }

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
 * Binds functionality to the burger bar.
 * @author Jason Bui
 * @date 5/26/2023
 */
/* function bindBurgerBar() {
	document.querySelector(".nav-toggle").addEventListener("click", () => {
		const navLinks = document.querySelector(".nav-links");
		navLinks.hidden = !navLinks.hidden;
	});
}*/

/**
 * Initializes home page
 */
function init() {
	createShuffleCards();
	displayGeneralUIElements();
	bindGeneralButtons();
	bindShuffleButton();
	bindStartButton();
	// bindBurgerBar();
}

init();

/**
 * Hamburger bar closes when you hover off of it
 * @author Kyle Ng
 * @date 6/5/2023
 */
document.querySelector(".menu__box").addEventListener("mouseleave", function() {
	document.querySelector("#menu__toggle").checked = false;
});

document.addEventListener("DOMContentLoaded", function() {
	const menuToggle = document.querySelector("#menu__toggle");
	if (menuToggle) {
		menuToggle.addEventListener("change", () => {
			const menuItems = document.querySelectorAll(".menu__item");
			menuItems.forEach((item) => {
				item.hidden = !item.hidden;
			});
		});
	}
});