/* eslint-disable linebreak-style */
import * as consts from "./consts.js";
/**
 * Binds the home page buttons to change the type of
 * consts.FORTUNE telling that is displayed
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
		document.getElementById("center-text").textContent =
            consts.FORTUNETYPES.tarotCard;
		document.getElementsByClassName("response")[0].textContent =
            "THIS IS THE RESPONSE FOR THE TAROT CARD";
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
 * Initializes home page
 */
function init() {
	bindHomePageBtns();
	bindGeneralButtons();
}

init();

document.querySelector(".nav-toggle").addEventListener("click", () => {
	const navLinks = document.querySelector(".nav-links");
	navLinks.hidden = !navLinks.hidden;
});