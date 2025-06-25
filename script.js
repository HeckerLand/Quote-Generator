let myPara = document.querySelector('.quote');
let mySpan = document.querySelector('.name');
let speechBtn = document.querySelector('.speech');
let copyBtn = document.querySelector('.copy');
let tweetBtn = document.querySelector('.twitter');
let volumeUpIcon = document.querySelector('.fa-volume-up');
let volumeDownIcon = document.querySelector('.fa-volume-off');
let speechOffBtn = document.querySelector('.mute');

function quoteId(){
    let num = Math.random()*10000;
    let randInt = Math.round(num%1454);
    return randInt;
}


function changeText(data){
    myPara.textContent = data.quote;
    mySpan.textContent = data.author;
}
let myButton = document.querySelector('button');
const synth = window.speechSynthesis; // creating a speech synthesis object
async function generateRandomQuotes(){
    let url = `https://dummyjson.com/quotes/${quoteId()}`;
    myButton.textContent = "Loading Quote...";
    myButton.classList.toggle("loading");
    let response = await fetch(url);
    let data = await response.json();
    myButton.classList.toggle("loading");
    myButton.textContent = "New Quote"
    changeText(data)
}
myButton.addEventListener('click',generateRandomQuotes);
function speakText(){
    return new Promise((resolve, reject) => {
        let text = `Quote of the Day, ${myPara.textContent} by ${mySpan.textContent}`;
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.addEventListener('end', resolve);
        utterance.addEventListener('error', reject);
        synth.speak(utterance);
    })
}

async function startVoice(){
    volumeUpIcon.classList.toggle("fa-volume-up");
    volumeUpIcon.classList.toggle("fas");
    volumeUpIcon.classList.toggle("fa");
    volumeUpIcon.classList.toggle("fa-volume-off");
    speechBtn.addEventListener('click', stopVoice);
    speechBtn.removeEventListener('click', startVoice);
    await speakText();//synth.speak(utterance);
    speechBtn.removeEventListener('click', stopVoice);
    speechBtn.addEventListener('click', startVoice);
    volumeUpIcon.classList.toggle("fa-volume-off");
    volumeUpIcon.classList.toggle("fa");
    volumeUpIcon.classList.toggle("fas");
    volumeUpIcon.classList.toggle("fa-volume-up");
}
function stopVoice(){
    speechBtn.removeEventListener('click', stopVoice);
    speechBtn.addEventListener('click', startVoice);
    synth.cancel();
    volumeUpIcon.classList.toggle("fa-volume-off");
    volumeUpIcon.classList.toggle("fa");
    volumeUpIcon.classList.toggle("fas");
    volumeUpIcon.classList.toggle("fa-volume-up");
}

function updateClipboard(){
    let textToCopy = `${myPara.textContent}\nby ${mySpan.textContent}`;
    navigator.clipboard.writeText(textToCopy);
}
speechBtn.addEventListener('click', startVoice);
copyBtn.addEventListener('click', updateClipboard);
let openButton = document.getElementById("openPopup");
let closeButton = document.getElementById("closePopup");
let myPopup = document.querySelector(".popup"); 
function openPopup(){
    myPopup.classList.add("open-popup");
}
function closePopup(){
    myPopup.classList.remove("open-popup");
}
openButton.addEventListener('click',openPopup);
closeButton.addEventListener('click',closePopup);
