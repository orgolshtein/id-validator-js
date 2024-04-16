const mainContainer = document.querySelector("#main-container");
const langSelector = document.querySelector("#lang-selector");
let validatorTexts = {};
let input = "";
let sum = 0;
let counter = 0;
let output = 0;

const riseAndShine = async () => {
    const urls = ["https://histl.onrender.com", "https://redrossent.onrender.com"];
    urls.forEach(async (url, i)=>{
        console.log(`Called server ${i+1}`)
        await fetch(url);
    })
};

const pickLang = () => {
    langSelector.value === "hebrew" ?
        validatorTexts = {
            title: 'אימות מספר זהות',
            line1: `הקלד/י עד 8 ספרות ולחץ/י "תשובה" כדי לקבל את ספרת הביקורת`,
            line2: `או הקלד/י 9 ספרות ולחץ/י "תשובה" כדי לאמת את מספר הזהות המלא`,
            inputPlaceholder: 'הקלד/י מספר',
            buttonText: 'תשובה',
            onlyDigits: 'יש להקליד מספרים בלבד',
            invalid: (x) => `מספר הזהות ${x.padStart(9, '0')} לא תקין`,
            valid: (x) => `מספר הזהות ${x.padStart(9, '0')} תקין`,
            ready: "הקלד ספרות כדי לקבל את ספרת הביקורת",
            controlDigit: (x) => `ספרת הביקורת עבור ${x.padStart(8, '0')} היא`,
            footer: 'נבנה על ידי אור גולשטיין:'
          } :
          validatorTexts = {
                title: 'Israeli ID Validator',
                line1: `Type up to 8 digits and click "Answer" to receive the control digit`,
                line2: `or type 9 digits and click "Answer" to validate the full ID`,
                inputPlaceholder: 'Type digits',
                buttonText: 'Answer',
                onlyDigits: 'Only digits please',
                invalid: (x) => `ID ${x.padStart(9, '0')} is invalid`,
                valid: (x) => `ID ${x.padStart(9, '0')} is valid`,
                ready: 'Type digits to receive the control digit',
                controlDigit: (x) => `The control digit for ${x.padStart(8, '0')} is`,
                footer: 'Created by Or Golshtein:'
            }
    langSelector.value === "hebrew" ? 
    mainContainer.classList.add("he-text")
    : mainContainer.classList.remove("he-text");
    document.title = `${validatorTexts.title} | JavaScript`;
    renderPage();
}

const renderPage = () => {
    riseAndShine();
    mainContainer.innerHTML = `
    <h1>${validatorTexts.title}</h1>
    <h3>
        ${validatorTexts.line1}
        <br>
        ${validatorTexts.line2}
    </h3>
    <form>
        <input 
            id="id-input"
            onclick="{clearMsg()}" 
            type="text" 
            placeholder="${validatorTexts.inputPlaceholder}" 
            maxlength="9" 
        >
        <button onclick="{validate()}">${validatorTexts.buttonText}</button>
    </form>
    <div id="validator">
    </div>
    <div id="footer">
        <p> ${validatorTexts.footer} <a 
            href="https://github.com/orgolshtein" 
            target="_blank">github.com/orgolshtein</a>
        </p>
        <img src="js.png" alt="js-logo">
    </div>
    `
}

const validate = () => {
    input = document.querySelector("#id-input").value
    let validator = document.querySelector("#validator")
    let inputArray = input.padStart(8, '0').split("").map(Number);
    let controlArray = [1,2,1,2,1,2,1,2,1];
    inputArray.forEach((digit, i)=>{
        (digit * controlArray[i]) > 9 ?
        sum += (digit * controlArray[i])
            .toString().split("").map(Number).reduce((a, b) => a + b)
        : sum += (digit * controlArray[i]);
    });
    for (counter = 0; counter < 10; counter++){
        if ((counter+sum) % 10 === 0){
            break;
        }
    }
    output = counter;
    isNaN(Number(input))=== true ? 
    validator.innerHTML = `<h3 style="color: red;">${validatorTexts.onlyDigits}</h3>`: 
    (input.length === 9) && ((sum) % 10 !== 0) ? 
    validator.innerHTML = `<h2 style="color: red;">${validatorTexts.invalid(input)}</h2>` : 
    (input.length === 9) && ((sum) % 10 === 0) ? 
    validator.innerHTML = `<h2 style="color: green;">${validatorTexts.valid(input)}</h2>` : 
    input.length === 0 ? 
    validator.innerHTML = `<h3>${validatorTexts.ready}</h3>` : 
    validator.innerHTML = `<h3>${validatorTexts.controlDigit(input)}</h3>
        <h2 style="color: green;">${output}</h2>`;
    input = "";
    sum = 0;
    counter = 0;
    output = 0;
    document.querySelector("button").disabled = true;

};

const clearMsg = () => {
    document.querySelector("button").disabled = false;
    document.querySelector("#validator").innerHTML = "";
};
