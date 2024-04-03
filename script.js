let input = "";
let sum = 0;
let counter = 0;
let output = 0;
const zeroPad = (str, places) => str.padStart(places, '0');

const mainContent = () => {
    if (document.querySelector("#lang-selector").value === "hebrew"){
        document.title = "אימות מספר זהות | JavaScript";
        document.querySelector("#main-container").classList.add("he-text");
        document.querySelector("#main-container").innerHTML = `
        <h1>אימות מספר זהות</h1>
        <h3>הקלד/י עד 8 ספרות ולחץ/י "תשובה" כדי לקבל את ספרת הביקורת<br>או הקלד/י 9 ספרות ולחץ/י "תשובה" כדי לאמת את מספר הזהות המלא</h3>
        <form id="id-input-container">
            <input onclick="{clearMsg()}" type="text" placeholder="הקלד/י מספר" maxlength="9" id="id-input">
            <button onclick="{validate()}">תשובה</button>
        </form>
        <div id="validator">
        </div>
        <div id="footer">
            <p>נבנה על ידי אור גולשטיין: <a href="https://github.com/orgolshtein" target="_blank">github.com/orgolshtein</a></p>
            <img src="js.png" alt="js-logo">
        </div>
        `
    } else{
        document.title = "Israeli ID Validator | JavaScript";
        document.querySelector("#main-container").classList.remove("he-text");
        document.querySelector("#main-container").innerHTML = `
        <h1>Israeli ID Validator</h1>
        <h3>Type up to 8 digits and click "Answer" to receive the control digit<br>or type 9 digits and click "Answer" to validate the full ID</h3>
        <form id="id-input-container">
            <input onclick="{clearMsg()}" type="text" placeholder="Type digits" maxlength="9" id="id-input">
            <button onclick="{validate()}">Answer</button>
        </form>
        <div id="validator">
        </div>
        <div id="footer">
            <p> Created by Or Golshtein: <a href="https://github.com/orgolshtein" target="_blank">github.com/orgolshtein</a></p>
            <img src="js.png" alt="js-logo">
        </div>
        `
    }
}

const validate = () => {
    input = document.querySelector("#id-input").value
    let inputArray = zeroPad(input,8).split("").map(Number);
    let controlArray = [1,2,1,2,1,2,1,2,1];
    for (let i=0; i<inputArray.length; i++){
        if ((inputArray[i]*controlArray[i])>9){
            sum += (inputArray[i]*controlArray[i]).toString().split("").map(Number).reduce((a, b) => a + b);
        }else{
            sum += (inputArray[i]*controlArray[i]);
        }
    }
    for (counter=0; counter<10; counter++){
        if ((counter+sum) % 10 === 0){
            break;
        }
    }
    output = counter;

    if (document.querySelector("#lang-selector").value === "hebrew"){
        isNaN(Number(input))=== true ? 
        document.querySelector("#validator").innerHTML = `<h3 style="color: #773c3c;">יש להקליד מספרים בלבד</h3>`: 
        (input.length === 9) && ((sum) % 10 !== 0) ? 
        document.querySelector("#validator").innerHTML = `<h2 style="color: #773c3c;">מספר הזהות ${zeroPad(input,9)} לא תקין</h2>` : 
        (input.length === 9) && ((sum) % 10 === 0) ? 
        document.querySelector("#validator").innerHTML = `<h2 style="color: #36b1ad;">מספר הזהות ${zeroPad(input,9)} תקין</h2>` : 
        input.length === 0 ? 
        document.querySelector("#validator").innerHTML = `<h3>הקלד ספרות כדי לקבל את ספרת הביקורת</h3>` : 
        document.querySelector("#validator").innerHTML = `<h3>ספרת הביקורת עבור ${zeroPad(input,8)} היא</h3>
            <h2 style="color: #36b1ad;">${output}</h2>`;
    }else{
        isNaN(Number(input))=== true ? 
        document.querySelector("#validator").innerHTML = `<h3 style="color: #773c3c;">Only digits please</h3>`: 
        (input.length === 9) && ((sum) % 10 !== 0) ? 
        document.querySelector("#validator").innerHTML = `<h2 style="color: #773c3c;">ID ${zeroPad(input,9)} is invalid</h2>` : 
        (input.length === 9) && ((sum) % 10 === 0) ? 
        document.querySelector("#validator").innerHTML = `<h2 style="color: #36b1ad;">ID ${zeroPad(input,9)} is valid</h2>` : 
        input.length === 0 ? 
        document.querySelector("#validator").innerHTML = `<h3>Type digits to receive the control digit</h3>` : 
        document.querySelector("#validator").innerHTML = `<h3>The control digit for ${zeroPad(input,8)} is</h3>
            <h2 style="color: #36b1ad;">${output}</h2>`;
    }
    input = "";
    sum = 0;
    counter = 0;
    output = 0;
    document.querySelector("button").disabled = true;

};

const clearMsg = () => {
    document.querySelector("button").disabled = false;
    document.querySelector("#validator").innerHTML = ``;
};
