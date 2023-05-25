/* eslint-disable linebreak-style */
import * as consts from "./consts.js";
/**
 * Binds the home page buttons to change the type of consts.FORTUNE telling that is displayed
 * @author Elvis Joa
 * @date 5/21/2023
 */
function bind_home_page_btns(){
    const tarotCardBtn = document.getElementById("toTarotCard");
    const eggBtn = document.getElementById("toEgg");
    const boneBtn = document.getElementById("toBoneTossing");

    tarotCardBtn.addEventListener("click", () => { 
        console.log(consts.FORTUNETYPES.tarotCard);
        load_page("tarot-card-template", "assets/styles/tarot-page.css");
    });

    eggBtn.addEventListener("click", () => {
        console.log(consts.FORTUNETYPES.egg);
        display_general_UI_elements(consts.FORTUNETYPES.egg);
        document.getElementById("center-text").textContent = consts.FORTUNETYPES.egg;
        document.getElementsByClassName("response")[0].textContent = "THIS IS THE RESPONSE FOR THE EGG";
        bind_general_buttons();
    });

    boneBtn.addEventListener("click", () => {
        console.log(consts.FORTUNETYPES.bone);
        display_general_UI_elements(consts.FORTUNETYPES.bone);
        document.getElementById("center-text").textContent = consts.FORTUNETYPES.bone;
        document.getElementsByClassName("response")[0].textContent = "THIS IS THE RESPONSE FOR THE BONE TOSSING";
        bind_general_buttons();
    });
}

/**
 * Loads in page using templates, removes the current page and loads in the new page
 * @author Sean Fuhrman
 * @date 5/25/2023
 * @param {string} templateID - id of the template to be loaded in
 * @param {string} css_filepath - path to css file to be loaded in
 */
function load_page(templateID, css_filepath) {
    //remove current page
    console.log(`loading ${templateID}`);
    const main = document.querySelector("main");
    main.parentNode.removeChild(main);

    const template = document.getElementById(templateID);
    const templateContent = template.content;
    const node = document.importNode(templateContent, true);
    document.body.appendChild(node);

    //this is hacky and should probably not be permanent
    if(templateID != "home-page-template") {
        bind_general_buttons();
    } else {
        bind_home_page_btns();
    }

    change_css(css_filepath);
}


/**
 * Loads in new css file for new page. Also removes old css
 * @author Sean Fuhrman
 * @date 5/25/2023
 * @param {string} css_filepath - path to css file to be loaded in
 */
function change_css(css_filepath) {
    const old_css = document.querySelectorAll("link[rel=stylesheet]");
    for (let i = 0; i < old_css.length; i++) {
        old_css[i].parentNode.removeChild(old_css[i]);
    }

    console.log(`loading ${css_filepath}`);

    const head = document.getElementsByTagName("head")[0];
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = css_filepath;
    head.appendChild(link);
}

/**
 * Binds the buttons that appear at the top left for all consts.FORTUNE telling,
 * more specifically the home, options, and GitHub buttons.
 * @author Elvis Joa
 * @date 5/21/2023
 */
function bind_general_buttons(){
    const homeBtn = document.getElementById("toHome");
    homeBtn.addEventListener("click", () => {
        load_page("home-page-template", "assets/styles/home-page.css");
    });
}

/**
 * Displays the UI elements that are needed and wanted
 * @author Elvis Joa
 * @date 5/21/2023
 */
function display_general_UI_elements(fortuneType =null) {
    // Changes the general buttons (home, options, GitHub)
    const generalBtns = document.getElementsByClassName("general");
    for (let i = 0; i < generalBtns.length; i++) {
        generalBtns[i].hidden = !generalBtns[i].hidden;
    }

    //Hides/Displays the option button that is needed if any
    for (let i = 0; i <= 2; i++) {
        const optionsBtn = document.getElementById(consts.FORTUNELIST[i]+"Options");
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
    console.log("init");
    load_page("home-page-template", "assets/styles/home-page.css");
    bind_home_page_btns();
    // bind_general_buttons();
}

init();