//fetching all classes and ids
const inputSlider = document.querySelector('#myRange');
const passwordLengthDisplay = document.querySelector('.length');
const passwordDisplay = document.querySelector('.passwordDis');
const copyMsgs = document.querySelector('.copied');
const copyButton = document.querySelector('#f');
const uppercaseCheck = document.querySelector('.upperCase');
const lowercaseCheck = document.querySelector('.lowerCase');
const numberCheck = document.querySelector('.numbers');
const symbolsCheck = document.querySelector('.symbols');
const allCheckBox = document.querySelectorAll("input[type = checkbox]");
const generateButton = document.querySelector('.generatebtn');
const indicator = document.querySelector('.dataindicator');

//defining all the symbols in the form of the array
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
let password = "";
let passwordLength = 10;
let totalCheck = 0;
handleLength();
setIndicator('#ccc');

// update the strength color
function setIndicator(color){
    indicator.style.backgroundColor = color;
}

//this function update the length of the password

function handleLength(){
    inputSlider.value = passwordLength;
    passwordLengthDisplay.innerText = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}

//fetch password length from the inputslider

inputSlider.addEventListener('input',(e) =>{
    passwordLength = e.target.value ;
    handleLength();
})

//this function returns a value between max and min

function getRandomInt(max,min){
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomNumber(){
    return getRandomInt(0,9);
}

function getRandomLowercase(){
    return String.fromCharCode(getRandomInt(97,123));
}

function getRandomUppercase(){
    return String.fromCharCode(getRandomInt(65,91));
}

function getRandomSymbols(){
    const random = getRandomInt(0,symbols.length);
    return symbols.charAt(random);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numberCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}

async function copyContent() {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsgs.innerText = "copied";
}

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

copyButton.addEventListener('click',() =>{
    if(passwordDisplay.value){
    copyContent();
    }
})

function handleCheckBox() {
    totalCheck = 0;
    allCheckBox.forEach((checkbox) =>{
        if(checkbox.checked){
            totalCheck++;
        }
    });
    if(totalCheck > passwordLength){
        passwordLength = totalCheck;
        handleLength();
    }

}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBox);
});

generateButton.addEventListener('click',() =>{
    password = "";
   if(totalCheck == 0){
    return;
   }
   if(passwordLength < totalCheck){
    passwordLength = totalCheck;
   }

   let arr = [];

   if(uppercaseCheck.checked)
    arr.push(getRandomUppercase);
   
   if(lowercaseCheck.checked){
    arr.push(getRandomLowercase);
   }
   if(numberCheck.checked){
    arr.push(getRandomNumber);
   }
   if(symbolsCheck.checked){
    arr.push(getRandomSymbols);
   }
    for(let i = 0; i < arr.length; i++){
        password += arr[i]();
    }
    for(let i = 0; i < passwordLength - arr.length; i++){
        let randomIndex = getRandomInt(0, arr.length);
        password += arr[randomIndex]();
    }
    password = shufflePassword(Array.from(password));
   passwordDisplay.value = password;
   handleLength();
   calcStrength();
});
