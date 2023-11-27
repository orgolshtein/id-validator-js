let input = "";
let sum = 0;
let counter = 0;
let output = 0;
const zeroPad = (str, places) => str.padStart(places, '0');

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

    isNaN(Number(input))=== true ? 
    document.querySelector("#validator").innerHTML = `<h3 style="color: #ad0c49;">יש להקליד מספרים בלבד</h3>`: 
    (input.length === 9) && ((sum) % 10 !== 0) ? 
    document.querySelector("#validator").innerHTML = `<h2 style="color: #ad0c49;">מספר הזהות ${zeroPad(input,9)} לא תקין</h2>` : 
    (input.length === 9) && ((sum) % 10 === 0) ? 
    document.querySelector("#validator").innerHTML = `<h2 style="color: #33BBC5;">מספר הזהות ${zeroPad(input,9)} תקין</h2>` : 
    input.length === 0 ? 
    document.querySelector("#validator").innerHTML = `<h3 style="color: #E19898;">הקלד ספרות כדי לקבל את ספרת הביקורת</h3>` : 
    document.querySelector("#validator").innerHTML = `<h3 style="color: #E19898;">ספרת הביקורת עבור ${zeroPad(input,8)} היא</h3>
        <h2 style="color: #33BBC5;">${output}</h2>`;
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
