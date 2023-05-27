import * as consts from "./consts.js";

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
		console.log(consts.FORTUNETYPES.tarotCard);
		displayGeneralUIElements(consts.FORTUNETYPES.tarotCard);
		/*
		document.getElementById("center-text").textContent =
            consts.FORTUNETYPES.tarotCard;
		document.getElementsByClassName("response")[0].textContent =
            "THIS IS THE RESPONSE FOR THE TAROT CARD";*/

		const shuffleBtn = document.getElementsByClassName("tarotSpecific")[0];
		shuffleBtn.hidden = false;

		const tarotSpecific =
			document.getElementsByClassName("tarotCardsPreShuffle");
		for (let i = 0; i < tarotSpecific.length; i++) {
			tarotSpecific[i].hidden = false;
		}
		createShuffleCards();
		hideShuffleCards();
	});

	tarotCardBtn.addEventListener("mouseover", () => {
		changeBackgroundColor("red");
	});

	tarotCardBtn.addEventListener("mouseout", () => {
		changeBackgroundColor("white");
	});

	eggBtn.addEventListener("click", () => {
		console.log(consts.FORTUNETYPES.egg);
		displayGeneralUIElements(consts.FORTUNETYPES.egg);
		document.getElementById("center-text").textContent =
            consts.FORTUNETYPES.egg;
		document.getElementsByClassName("response")[0].textContent =
            "THIS IS THE RESPONSE FOR THE EGG";
	});

	eggBtn.addEventListener("mouseover", () => {
		changeBackgroundColor("blue");
	});

	eggBtn.addEventListener("mouseout", () => {
		changeBackgroundColor("white");
	});

	boneBtn.addEventListener("click", () => {
		console.log(consts.FORTUNETYPES.bone);
		displayGeneralUIElements(consts.FORTUNETYPES.bone);
		document.getElementById("center-text").textContent =
            consts.FORTUNETYPES.bone;
		document.getElementsByClassName("response")[0].textContent =
            "THIS IS THE RESPONSE FOR THE BONE TOSSING";
	});


	boneBtn.addEventListener("mouseover", () => {
		changeBackgroundColor("green");
	});

	boneBtn.addEventListener("mouseout", () => {
		changeBackgroundColor("white");
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
	homeBtn.addEventListener("click", () => {
		displayGeneralUIElements();
		document.getElementById("center-text").textContent = "";
		document.getElementsByClassName("response")[0].textContent = "";
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
	for (let i = 0; i <= 2; i++) {
		const optionsBtn = document.getElementById(consts.FORTUNELIST[i]+"Options");
		optionsBtn.hidden = true;
	}
	if (fortuneType != null) {
		const optionsBtn = document.getElementById(fortuneType + "Options");
		optionsBtn.hidden = false;
	}

	// Hides/Displays the home page buttons as needed
	const homeBtns = document.getElementsByClassName("home-page");
	for (let i = 0; i < homeBtns.length; i++) {
		homeBtns[i].hidden = !homeBtns[i].hidden;
	}
}

/**
 * Binds tarot card page buttons
 */
function bindTarotPageBtns() {
	const shuffleBtn = document.createElement("button");
	shuffleBtn.className = "tarotSpecific";
	shuffleBtn.id = "tarotShuffle";
	shuffleBtn.textContent = "SHUFFLE CARDS";
	shuffleBtn.addEventListener("click", () => {
		shuffleBtn.hidden = true;
		showShuffleCards();
	});
	const tarotOptions = document.getElementById("tarotCardsSelection");
	tarotOptions.append(shuffleBtn);
}

/**
 * After shuffle and selecting cards, shows cards
 */
function displayThreeOptions() {
	const cardsSelected = []
	while (cardsSelected.length < 3) {
		const card = Math.floor(Math.random()*21);
		if (cardsSelected.indexOf(card) === -1) {
			cardsSelected.push(card);
		}
	}
	const description = ["past", "present", "future"];
	hideShuffleCards();
	console.log(cardsSelected);
	for (let i = 1; i <= 3; i++) {
		const cardOption = document.getElementById("Card " + i);
		const imageSrc = (consts.CARDSJSON[cardsSelected[i - 1]])["img"];
		cardOption.innerHTML =
			"<img class = \"tarotCardsImagesPreShuffle\"src=\"" +imageSrc+"\"/>";
		cardOption.hidden = false;
		cardOption.value=
			consts.CARDSJSON[cardsSelected[i-1]][description[i-1] + "Description"];
		cardOption.addEventListener("click", () =>{
			const response = document.getElementsByClassName("response")[0];
			response.textContent = cardOption.value;
		});
	}
}

/**
 * Creates shuffle cards
 */
function createShuffleCards() {
	const tarotOptions = document.getElementById("tarotCardsSelection");
	let counter = 0;
	for (let i = 1; i < 23; i++) {
		const button = document.createElement("button");
		button.id = "Option " + i;
		button.hidden = true;
		button.className = "tarotCardsPreShuffle";
		button.innerHTML =
			"<img class = \"tarotCardsImagesPreShuffle\"src=\""+consts.cardBack +"/>";
		button.style.backgroundColor = "white";
		button.setAttribute("clicked", false);
		button.addEventListener("click", () =>{
			if (button.getAttribute("clicked") === "true") {
				button.setAttribute("clicked", false);
				button.style.backgroundColor = "white";
				counter--;
			} else {
				button.setAttribute("clicked", true);
				counter++;
				button.style.backgroundColor = "black";
				console.log(button.getAttribute("clicked"));
			}

			if (counter == 3) {
				displayThreeOptions();
			}
		});
		tarotOptions.appendChild(button);
	}
}

/**
 * Hide shuffle cards
 */
function hideShuffleCards() {
	const cards = document.getElementsByClassName("tarotCardsPreShuffle");
	for (let i = 0; i < cards.length; i++) {
		cards[i].hidden = true;
	}
}

/**
 * Show shuffle cards
 */
function showShuffleCards() {
	const cards = document.getElementsByClassName("tarotCardsPreShuffle");
	for (let i = 0; i < cards.length; i++) {
		cards[i].hidden = !cards[i].hidden;
	}
}

/**
 * Initializes home page
 */
function init() {
	bindHomePageBtns();
	bindGeneralButtons();
	bindTarotPageBtns();
}

init();

document.querySelector(".nav-toggle").addEventListener("click", () => {
	const navLinks = document.querySelector(".nav-links");
	navLinks.hidden = !navLinks.hidden;
});