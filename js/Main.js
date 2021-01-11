

//Idea
/*
  A visual cryptography app that encodes and decodes geometry data into messages.

  STEPS
  lOAD MESH
  READ VERTEXES DATA
  DECODE THE DATA BASED ON KEY
  USES VERTEX DIRECTION TO DETERMINE CHAR


  KEY (A SEQUENCE OF CHARACTERS)
  - 921398023349801237988524234

  ALPHABET KEY
  - Length of the alphabet

  KEY REPRESENTS RANDOM SHIFTS IN THE ALPHABET
  CHARACTER SHIFTING FOR A-Z AND 0-9 COMBINED
  ALPHABET ORDER IS ALSO RANDOMIZED (how is the order decoded?)


*/

//for displaying
let shiftingKeyField = document.getElementById("shifting-key");
let alphabetKeyField = document.getElementById("alphabet-key");
let messageField = document.getElementById("message");
let encodedMsgField = document.getElementById("encoded-message");
let decodedMsgField = document.getElementById("decoded-message");

let SHIFTING_KEY = ""; //Length of msg 0-9 shifts in alphabet key
let ALPHABET_KEY = ""; //

let GEO_VERTEX_DATA; //where we store mesh data

let MESSAGE = "THE WOLF WAS SERVED COLD THIS MORNING. ENJOY THE ESPRESSO"; //message to encode/decode
// let MESSAGE = "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?";
// let MESSAGE = `"Shall I compare thee to a summer’s day?
// Thou art more lovely and more temperate:
// Rough winds do shake the darling buds of May,
// And summer’s lease hath all too short a date:
// Sometime too hot the eye of heaven shines,
// And often is his gold complexion dimmed;
// And every fair from fair sometime declines,
// By chance, or nature’s changing course, untrimmed:
// But thy eternal summer shall not fade,
// Nor lose possession of that fair thou ow’st;
// Nor shall Death brag thou wander’st in his shade
// When in eternal lines to time thou grow’st:
// So long as men can breathe or eyes can see,
// So long lives this, and this gives life to thee.[1]"`;
// let MESSAGE = `
// 日ぱ退太ぼえもて能野のまや最始ヤ幸野皇へる金86富省訓8新ナシ融暮ぐるっ受著年イモヲヒ作60米カネム世特訃ゃべちき認江き政談題ドどゃ。記こべほ併座すぱぶ刊鑑キチマ塊札相ちおひろ者凶ネ信体ケイル国議タハヨ紙足ゅ与催エサネヤ戦未まふづや鋼棋紙今街録チヱ捜多によをざ入著さろん作道でのゅ全災盗瀬ゆん
// `;

let ENCODED_MSG = "";
let DECODED_MSG = "";

let ALPHABET_ORDERED = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,.?! "; //LETTERS , NUMBERS, PUNCTUATIONS, space at the end
let ALPHABET_UNORDERED = ""; //like ordered but random positoin

//read message (.txt file)
//to be determined


//CHARACTER FREQUENCY CHECKING
let usedCharacters = []; //all the characters used in the message

for (var i = 0; i < MESSAGE.length; i++)
{
  //get char
  const char = MESSAGE.charAt(i);

  //check if it contains the char already
  if(Contains(char, usedCharacters) == false)
  {
    usedCharacters.push(char);
  }
}

console.log(usedCharacters);


//RANDOMIZE ALPHABET KEY
Shuffle(usedCharacters);
//after randomization, we now have our alphabet.
ALPHABET_KEY = ArrToStr(usedCharacters);

//ENCODING PART HERE
// GetCharIndexInAlph();
for (var i = 0; i < MESSAGE.length; i++)
{
  const char = MESSAGE.charAt(i);
  const index = GetCharIndexInAlph(char, ALPHABET_KEY);
  const shift = GetShiftAmount();
  const shiftedChar = GetShiftChar(index, ALPHABET_KEY, shift);

  SHIFTING_KEY += shift;
  ENCODED_MSG += shiftedChar;
  // console.log("Char is " + char + "," + "Index in Alphabet is " + index);
}
console.log(MESSAGE.length);
console.log(ENCODED_MSG.length);
console.log(SHIFTING_KEY.length);



//DECODING PART HERE

//should add a function to check if len of key is == to len of message
for (var i = 0; i < ENCODED_MSG.length; i++)
{
  const char = ENCODED_MSG.charAt(i);
  const index = GetCharIndexInAlph(char, ALPHABET_KEY);
  const unshift = SHIFTING_KEY.charAt(i);
  const unshiftedChar = GetUnshiftedChar(index, ALPHABET_KEY, unshift);

  DECODED_MSG += unshiftedChar;
}

//FUNCTIONS---------------------------------------
//check if arr contains a value
function Contains(char, arr)
{
  for (var i = 0; i < arr.length; i++) {
    if(char == arr[i])
    {
      return true;
    }
  }
  return false;
}

//ref: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function Shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function ArrToStr(arr)
{
  let str = "";

  for (var i = 0; i < arr.length; i++)
  {
    str += arr[i];
  }

  return str;
}

function GetShiftAmount()
{
  const shiftAmount = Math.floor(Math.random() * 10); //10 because it excludes itself
  return shiftAmount;
}

//shifts to the ----->
function GetShiftChar(index, alphabet, shiftAmount)
{
  const alphabetLen = alphabet.length;

  //if the shift goes out of bounds, wrap around at the start, else shift normally
  let shiftIndex;
  if(index + shiftAmount >= alphabetLen)
  {
    shiftIndex = (index + shiftAmount) - alphabetLen;
  }
  else
  {
    shiftIndex = index + shiftAmount;
  }

  return alphabet[shiftIndex];
}

//shifts to the <-----
function GetUnshiftedChar(index, alphabet, shiftAmount)
{
  const alphabetLen = alphabet.length;

  //if the shift goes out of bounds, wrap around at the start, else shift normally
  let shiftIndex;
  if(index - shiftAmount < 0)
  {
    shiftIndex = alphabetLen - Math.abs(index - shiftAmount);
  }
  else
  {
    shiftIndex = index - shiftAmount;
  }

  return alphabet[shiftIndex];
}



//lookup for the index of the char in the alphabet
// eg.  [0,1,2,3,4,5,6,7,8,9] in alphabet
function GetCharIndexInAlph(char, alphabet)
{
  for (var i = 0; i < alphabet.length; i++)
  {
    if(char == alphabet[i])
    {
      return i;
    }
  }
}

// for (var i = 0; i < 100; i++) {
//   AssignShift();
// }

//DISPLAY
shiftingKeyField.innerHTML = "Shifting key: " + SHIFTING_KEY;
alphabetKeyField.innerHTML = "Alphabet key: " + ALPHABET_KEY;
messageField.innerHTML = "Message: " + MESSAGE;
encodedMsgField.innerHTML = "Encoded message: " + ENCODED_MSG;
decodedMsgField.innerHTML = "Decoded message: " + DECODED_MSG;
