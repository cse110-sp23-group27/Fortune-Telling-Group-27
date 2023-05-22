/* eslint-disable linebreak-style */
const FORTUNETYPES = {
    tarotCard: "tarot",
    egg: "egg",
    bone: "bone"
};
const FORTUNELIST = ["tarot", "egg", "bone"];
/**
 * Binds the home page buttons to change the type of fortune telling that is displayed
 * @author Elvis Joa
 * @date 5/21/2023
 */
function bind_home_page_btns(){
                const tarotCardBtn = document.getElementById("toTarotCard");
                            const eggBtn = document.getElementById("toEgg")
                    const boneBtn = document.getElementById("toBoneTossing")
    tarotCardBtn.addEventListener('click', () => {
        console.log(FORTUNETYPES.tarotCard)
         display_general_UI_elements(FORTUNETYPES.tarotCard);
        document.getElementById("center-text").textContent = FORTUNETYPES.tarotCard;
    });

    eggBtn.addEventListener("click", () => {
        console.log(FORTUNETYPES.egg);
        display_general_UI_elements(FORTUNETYPES.egg);
        document.getElementById("center-text").textContent = FORTUNETYPES.egg
    });

    boneBtn.addEventListener("click", () => {
        console.log(FORTUNETYPES.bone);
        display_general_UI_elements(FORTUNETYPES.bone);
        document.getElementById("center-text").textContent = FORTUNETYPES.bone;
    });
}

/**
 * Binds the buttons that appear at the top left for all fortune telling,
 * more specifically the home, options, and GitHub buttons.
 * @author Elvis Joa
 * @date 5/21/2023
 */
function bind_general_buttons(){
    const homeBtn = document.getElementById("toHome");
    homeBtn.addEventListener("click", () => {
        display_general_UI_elements();
        document.getElementById("center-text").textContent = "";
    });
}

/**
 * Displays the UI elements that are needed and wanted
 * @author Elvis Joa
 * @date 5/21/2023
 */
function display_general_UI_elements(fortuneType=null) {
    // Changes the general buttons (home, options, GitHub)
    const generalBtns = document.getElementsByClassName("general");
    for (let i = 0; i < generalBtns.length; i++) {
        generalBtns[i].hidden = !generalBtns[i].hidden;
    }

    //Hides/Displays the option button that is needed if any
    for (let i = 0; i <= 2; i++) {
        const optionsBtn = document.getElementById(FORTUNELIST[i]+"Options");
        optionsBtn.hidden = true;
    }
    if (fortuneType != null) {
        const optionsBtn = document.getElementById(fortuneType + "Options");
        optionsBtn.hidden = false;
    }

    //Hides/Displays the home page buttons as needed
    const homeBtns = document.getElementsByClassName("home-page");
    for (let i = 0; i < homeBtns.length; i++) {
        homeBtns[i].hidden = !homeBtns[i].hidden;
    }
}

function init() {
    bind_home_page_btns();
    bind_general_buttons();
}

init();