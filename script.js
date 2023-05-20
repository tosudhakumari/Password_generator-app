let getId = (param) => document.getElementById(param);
let getCls = (param) => document.getElementsByClassName(param);
let input = getId("input");
let length = getId("length");
let slider = getId("range");
let copyBtn = getId("copy-btn");
let copymsg = document.querySelector(".copyMsg");
let copyText = document.querySelector(".copyText");
let allCheckBoxes = document.querySelectorAll("input[type=checkbox]");
let upperCase = getId("upperCase");
let lowerCase = getId("lowerCase");
let numberCase = getId("number");
let symbolCase = getId("symbol");
let indicator = document.querySelector(".indicator");
let generatePwdBtn = getId("generate-password")

let passsword = "";
let passwordLength = 5;
let count = 0;

initial();
slider.addEventListener("input", (e) => {
  // console.log(e.target.value)
  passwordLength = e.target.value;
  initial();
  StrengthIndicator();
});

function initial() {
  length.innerText = passwordLength;
  slider.value = passwordLength;
}

copyBtn.addEventListener("click", copyFunction);

function copyFunction() {
  if (input.value !== "") {
    try {
      navigator.clipboard.writeText(input.value);
      copymsg.innerText = `copied`;
      copymsg.classList.remove("active");
      copyText.classList.add("active");
    } catch (err) {
      copymsg.innerText = `Failed`;
    }
  }

  setTimeout(() => {
    copymsg.classList.add("active");
    copyText.classList.remove("active");
  }, 2000);
}

allCheckBoxes.forEach((checkbox, index) => {
  count = 0;

  checkbox.addEventListener("change", (e) => {
    
    if (e.target.checked) {
      count++;     
    
    }else{
        count--;
    }
    console.log(count);

    if (passwordLength < count) {
      passwordLength = count;
    }
    initial();
    StrengthIndicator();
  });
});

function randomGenerateNumber(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function upperCaseGenerate() {
  return String.fromCharCode(randomGenerateNumber(90, 65));
}

function lowerCaseGenerate() {
  return String.fromCharCode(randomGenerateNumber(122, 97));
}
function numberGenerate() {
  return randomGenerateNumber(9, 0);
}

let symbols = `~!@#$%^&*()_+`;
function symbolCaseGenerate() {
  let randomIndex = randomGenerateNumber(0, symbols.length);
  return symbols.charAt(randomIndex);
}

function StrengthIndicator() {
  let upperLetter = false;
  let lowerLetter = false;
  let number = false;
  let symbol = false;

  if (upperCase.checked) upperLetter = true;
  if (lowerCase.checked) lowerLetter = true;
  if (numberCase.checked) number = true;
  if (symbolCase.checked) symbol = true;
  indicator.classList.remove("strong", "weak", "ok");

  if (upperLetter && lowerLetter && number && symbol && passwordLength > 8) {
    indicator.classList.add("strong");
    return;
  }
  if (upperLetter && lowerLetter && number && symbol && passwordLength >= 7) {
    indicator.classList.add("ok");
    return;
  }
  if (upperLetter || lowerLetter || number || symbol && passwordLength <= 7) {
    indicator.classList.add("weak");
    return;
  }
}

generatePwdBtn.addEventListener('click' , (e)=>{
    e.preventDefault();
    passwordGenerated();
})

function passwordGenerated(){
    passsword="";

    let passwordArray =[];

    if(upperCase.checked){
        passwordArray.push(upperCaseGenerate())
    }
    if(lowerCase.checked){
        passwordArray.push(lowerCaseGenerate())
    }
    if(numberCase.checked){
        passwordArray.push(numberGenerate())
    }
    if(symbolCase.checked){
        passwordArray.push(symbolCaseGenerate())
    }
    // console.log(passwordArray)

    for(let i=0; i< passwordArray.length ; i++){
        passsword = passsword +passwordArray[i]
    }
    for(let i=0; i<passwordLength- passwordArray.length ; i++){
        let index = randomGenerateNumber(0,passwordArray.length)
        passsword = passsword + passwordArray[index]
    }

    passsword = shuffle(Array.from(passsword))
    input.value = passsword;

    
}

function shuffle(arr){
    
    for(let i = arr.length-1; i >0 ; i--){
        for(let j=0; j<arr.length-1; j++){
            let temp=arr[i];
            arr[i]=arr[j];
            arr[j]=temp
        }
    }
    let str ="";
    arr.forEach((el)=> str= str+el)
    return str;
}