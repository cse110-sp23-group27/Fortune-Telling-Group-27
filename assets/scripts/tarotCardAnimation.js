import * as consts from "./consts.js";
import TarotCard from "./TarotCard.js";

/**
 * Adds a fog background to the tarot card page
 * @date 5/31/2023
 */
export function addFogBackground() {
	const tarotDiv = document.getElementById("tarotDiv");
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
export function removeFogBackground() {
	const fogWrapper = document.getElementsByClassName("fogwrapper")[0];
	if (fogWrapper) {
		fogWrapper.remove();
	}
}

/**
 * Plays the card throw animation
 * @date 6/6/2023 - 1:58:41 PM
 * @author Victor Kim
 *
 * @async
 * @return {None}
 */
export async function playCardThrowAnimation() {
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
 * Will play the shuffle animation for the current cards
 * @date 5/29/2023 - 9:20:17 PM
 */
export async function playShuffleAnimation() {
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
export async function playCardSpreadAnimation() {
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