import * as consts from "./consts.js";

// Div that contains all tarot card page elements
const tarotDiv = document.getElementById("tarotDiv");
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
		tarotDiv.innerHTML = "";
		tarotDiv.hidden = !tarotDiv.hidden;
		createShuffleBtn();
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

	const githubBtn = document.getElementById("toGitHub");
	githubBtn.addEventListener("click", () => {
		navigator.clipboard.writeText("https://github.com/cse110-sp23-group27/Fortune-Telling-Group-27");
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
		optionsBtn.hidden = !optionsBtn.hidden;
	}

	// Hides/Displays the home page buttons as needed
	const homeBtns = document.getElementsByClassName("home-page");
	for (let i = 0; i < homeBtns.length; i++) {
		homeBtns[i].hidden = !homeBtns[i].hidden;
	}
}

/**
 * Creates and displays the shuffle button that should trigger the animation
 * for the tarot cards.
 * @authors Elvis Joa, Daniel Lee, and Kevin Wong
 * @date 5/27/2023
 */
function createShuffleBtn() {
	const shuffleBtn = document.createElement("button");
	shuffleBtn.className = "tarotSpecific";
	shuffleBtn.id = "tarotShuffle";
	shuffleBtn.textContent = "SHUFFLE CARDS";
	shuffleBtn.addEventListener("click", () => {
		tarotDiv.innerHTML = "";
		createShuffleCards();
	});
	tarotDiv.append(shuffleBtn);
}

/**
 * Creates and displays the tarot cards that are selected. Cards will change
 * in appearance if they are selected. 3 cards have to be selected.
 * @authors Elvis Joa, Daniel Lee, and Kevin Wong
 * @date 5/27/2023
 */
function createShuffleCards() {
	let counter = 0;
	for (let i = 1; i < 23; i++) {
		const button = document.createElement("button");
		button.id = "Option " + i;
		button.className = "cardsBtnPreShuffle";
		button.innerHTML =
			"<img class = \"imagesPreShuffle\"src="+consts.cardBack +"/>";
		button.style.backgroundColor = "white";
		button.setAttribute("clicked", false);
		// Change appearance when clicked
		button.addEventListener("click", () =>{
			if (button.getAttribute("clicked") === "true") {
				button.setAttribute("clicked", false);
				button.style.backgroundColor = "white";
				counter--;
			} else {
				button.setAttribute("clicked", true);
				counter++;
				button.style.backgroundColor = "black";
			}

			if (counter == 3) {
				displayThreeOptions();
			}
		});
		tarotDiv.appendChild(button);
	}
}

/**
 * After selecting three cards, 3 cards will appear, and from left to right,
 * the cards represent the past, present and future descriptions.
 * @authors Elvis Joa, Daniel Lee, and Kevin Wong
 * @date 5/27/2023
 */
function displayThreeOptions() {
	tarotDiv.innerHTML = "";
	const cardsSelected = [];
	while (cardsSelected.length < 3) {
		const card = Math.floor(Math.random()*21);
		if (cardsSelected.indexOf(card) === -1) {
			cardsSelected.push(card);
		}
	}
	const description = ["past", "present", "future"];
	console.log(cardsSelected);
	for (let i = 1; i <= 3; i++) {
		const cardOption = document.createElement("button");
		cardOption.id = "Card" + i;
		const imageSrc = (consts.CARDSJSON[cardsSelected[i - 1]])["img"];
		cardOption.innerHTML =
			"<img class = \"chosenCards\"src=\"" +imageSrc+"\"/>";
		cardOption.value=
			consts.CARDSJSON[cardsSelected[i-1]][description[i-1] + "Description"];
		cardOption.addEventListener("click", () =>{
			const response = document.getElementById("response");
			response.textContent = cardOption.value;
		});
		tarotDiv.appendChild(cardOption);
	}
}

/**
 * Binds functionality to the burger bar.
 * @author Jason Bui
 * @date 5/26/2023
 */
function bindBurgerBar() {
	document.querySelector(".nav-toggle").addEventListener("click", () => {
		const navLinks = document.querySelector(".nav-links");
		navLinks.hidden = !navLinks.hidden;
	});
}

/**
 * Initializes home page
 */
function init() {
	bindHomePageBtns();
	bindGeneralButtons();
	bindBurgerBar();
}

init();