const cipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
    return text => text.split('')
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join('');
}
    
const decipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
    return encoded => encoded.match(/.{1,2}/g)
    .map(hex => parseInt(hex, 16))
    .map(applySaltToChar)
    .map(charCode => String.fromCharCode(charCode))
    .join('');
}
            
function Trie() {
    this.root = new TrieNode();
    
    this.insert = function(key) { 
        let length = key.length, next = this.root; 

        for (let level = 0; level < length; level++) { 
            let character = key.charAt(level); 
            if (next.children[character] == null) {
                next.children[character] = new TrieNode(); 
            }
        next = next.children[character]; 
        }
        next.endOfWord = true; 
    }
            
    this.find = function(key) { 
        let length = key.length, next = this.root; 

        for (let level = 0; level < length; level++) { 
            let character = key.charAt(level);
            
            if (next && next.children[character]) {
                next = next.children[character];
                continue;
            }
            return false;
        }
        
        return next && next.endOfWord;
    }
            
    this.contains = function(key) {
        let length = key.length, next = this.root; 

        for (let level = 0; level < length; level++) {
            let character = key.charAt(level);

            if (next && next.children[character]) {
                next = next.children[character];
                continue;
            }
            return false;
        }
        return next && true;
    } 
}
    
function TrieNode() {
    this.children = {};
    this.endOfWord = false; 
}
        
const TRIE = Object.setPrototypeOf(RAW_TRIE, new Trie());

class GameField{
    constructor(d){
        this.board = [["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]];

        var i = 0;
        for(var x = 0; x< 4; x++){
            for(var y = 0; y<4; y++){
                var letter = d[i];
                this.board[x][y] = letter;
                i ++
            }
        }
    }
}

function is_word(s){
    if (s.length >= 3){
        return TRIE.find(s)
    }
    else{
        return false
    }
}

function is_prefix(s){
    return TRIE.contains(s)
}

function adjacent_coords(x, y){
    var result = [];
    for(var dx = -1; dx <= 1; dx++){
        for(var dy = -1; dy <= 1; dy++){
            var x2 = x + dx;
            var y2 = y + dy;
            if(-1 < x2 && x2 < 4 && -1 < y2 && y2< 4){
                if(x2 != x || y2 != y){
                    result.push([x2, y2]);
                }
            }
        }
    }
    return result;
}

function search_from_dice(board, all_words, s, x, y, visited_coords){
    temp = visited_coords;
    temp.push([x,y])
        
    if(is_word(s)){
        all_words.push(s)
    }

    var adj = adjacent_coords(x, y);
    for(var i = 0; i < adj.length; i++){
        var coord = adj[i]
		if(!temp.includes(coord)){
			var x2 = coord[0];
            var y2 = coord[1];
            a = board[x2][y2];
            if(is_prefix(s + a)){
                search_from_dice(board, all_words, s + a, x2, y2, temp);
            }
		}
    }
}

function generate_wordlist(input){
    var all_words = []
    gf = new GameField(input);

    for(var x = 0; x < 4; x++){
        for(var y = 0; y < 4; y++){
            search_from_dice(gf.board, all_words, gf.board[x][y], x, y, [])
        }
    }
    return [...new Set(all_words)];
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function diceRoll() {
    return Math.floor(Math.random() * 6);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function rollDice(){
    var d1 = ["Z","E", "O", "T", "K", "N"]
    var d2 = ["H","E", "S", "E", "I", "F"]
    var d3 = ["T","E", "G", "V", "I", "N"]
    var d4 = ["R","O", "S", "M", "I", "A"]
    var d5 = ["R","E", "A", "C", "S", "H"]
    var d6 = ["P","L", "U", "N", "T", "E"]
    var d7 = ["T","E", "S", "O", "D", "N"]
    var d8 = ["V","E", "Z", "A", "D", "N"]
    var d9 = ["W","A", "A", "O", "I", "E"]
    var d10 = ["F","A", "I", "R", "K", "X"]
    var d11 = ["J","E", "U", "N", "G", "Y"]
    var d12 = ["A","E", "C", "P", "M", "D"]
    var d13 = ["Q","B", "O", "D", "J", "M"]
    var d14 = ["W","E", "G", "R", "U", "L"]
    var d15 = ["H","E", "S", "R", "I", "N"]
    var d16 = ["B","L", "A", "T", "I", "N"]

    var c1 = d1[diceRoll()];
    var c2 = d2[diceRoll()];
    var c3 = d3[diceRoll()];
    var c4 = d4[diceRoll()];
    var c5 = d5[diceRoll()];
    var c6 = d6[diceRoll()];
    var c7 = d7[diceRoll()];
    var c8 = d8[diceRoll()];
    var c9 = d9[diceRoll()];
    var c10 = d10[diceRoll()];
    var c11 = d11[diceRoll()];
    var c12 = d12[diceRoll()];
    var c13 = d13[diceRoll()];
    var c14 = d14[diceRoll()];
    var c15 = d15[diceRoll()];
    var c16 = d16[diceRoll()];

    result = [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15, c16]

    // put the dice in a random order...
    shuffleArray(result)
    return result
}


function drawBricks(chars) {
    var i = 0
    for(var c=0; c<diceColumnCount; c++) {
        for(var r=0; r<diceRowCount; r++) {
            var diceX = (c*(diceWidth+dicePaddingHorizontal))+diceOffsetLeft;
            var diceY = (r*(diceHeight+dicePaddingVertical))+diceOffsetTop;
            dice[c][r].x = diceX;
            dice[c][r].y = diceY;
            char = chars[i]
            ctx.beginPath();
            ctx.rect(diceX, diceY, diceWidth, diceHeight);
            ctx.fillStyle = "#3399ff";
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.font = ((fontRatio * 36)|0) + "px Arial"
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.textBaseline= "middle";
            ctx.fillText(char, diceX + diceWidth/2, diceY + diceHeight/2)
            ctx.closePath();

            i++
        }
    }
}

function drawWordStatus(wordstatus) {
    ctx.beginPath();
    ctx.font = ((fontRatio * 72)|0) + "px Arial"
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if (wordstatus == "Correct!") {
        ctx.fillStyle = "#33cc33"
    }
    else if (wordstatus == "Already guessed") {
        ctx.font = (fontRatio * 40)|0 + "px Arial"
        ctx.fillStyle = "#ffcc00"
    }
    else {
        ctx.fillStyle = "#ff0000"
    }
    ctx.fillText(wordstatus, canvas.width/2, resultOffsetTop)
    ctx.closePath();
}

function drawTimer(time) {
    ctx.beginPath();
    ctx.font = ((fontRatio * 72)|0) + "px Arial"
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if(time < 10){
        ctx.fillStyle = "red"
        if(time < 0){
            time = 0;
        }
    } else {
        ctx.fillStyle = "black"
    }
    ctx.fillText(time, canvas.width/4, timerOffsetTop)
    ctx.closePath();
}

function drawScore(score) {
    ctx.beginPath();
    ctx.font = ((fontRatio * 72)|0) + "px Arial"
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "green"
    ctx.fillText(score, 3 * canvas.width/4, timerOffsetTop)
}

function checkAnswer(answer){
    if (wordStatus == ""){
        wordlist = generate_wordlist(charstring);
        if (wordlist.includes(answer)){
            wordStatus = "Correct!"
            guessed.push(answer);
        }
        else {
            wordStatus = "Wrong!"
        }
    }
    else {
        if (wordlist.includes(answer)){
                if (guessed.includes(answer)){
                    wordStatus = "Already guessed"
                } else {
                    wordStatus = "Correct!"
                    if(!stop){
                        guessed.push(answer);
                    }
                }
        }
        else {
            wordStatus = "Wrong!"
        } 
    }
}

function countScore(guessedWords){
    result = [...new Set(guessedWords)];
    score = 0
    for(i = 0; i < result.length; i++){
        var l = result[i].length;
        if(l <= 4){
            score += 1
        }
        else if(l == 5){
            score += 2
        }
        else if(l == 6){
            score += 3
        }
        else if(l == 7){
            score += 5
        }
        else{
            score += 7
        }
    }
    return score;
}

function update(timer){
    if(start){
        stopTime = timer + stopIn
        start = false;
    } else{
        if(timer >= stopTime){
            stop = true;
        }
    }

    timeTillStop = stopTime - timer;
    drawTimer(Math.floor(timeTillStop / 1000));

    if(!stop){
        requestAnimationFrame(update);
    }
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function getTouchPos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
    return {
		x: evt.touches[0].clientX - rect.left,
		y: evt.touches[0].clientY - rect.top
	};
}

function mousedown(canvas, evt, touch=false) {
	if(touch){
        var mousePos = getTouchPos(canvas, evt);
	} 
    else {
        var mousePos = getMousePos(canvas, evt);
    }
    isMouseDown=true
	var currentPosition = getMousePos(canvas, evt);
	ctx.moveTo(currentPosition.x, currentPosition.y)
	ctx.beginPath();
	ctx.lineWidth  = currentSize;
	ctx.lineCap = "round";
	ctx.strokeStyle = currentColor;
}
        
function mousemove(canvas, evt, touch=false) {
    if(isMouseDown){
        if(touch){
            var currentPosition = getTouchPos(canvas, evt)
        }
        else {
            var currentPosition = getMousePos(canvas, evt);
        }
        ctx.lineTo(currentPosition.x, currentPosition.y)
        ctx.stroke();
        store(currentPosition.x, currentPosition.y, currentSize, currentColor);
    }
}

function getcenter(x, y) {
    var i = 0;
    for(var c=0; c<diceColumnCount; c++) {
        for(var r=0; r<diceRowCount; r++) {
            var diceX1 = (c*(diceWidth+dicePaddingHorizontal))+diceOffsetLeft + dicePushMarginHorizontal;
            var diceY1 = (r*(diceHeight+dicePaddingVertical))+diceOffsetTop + dicePushMarginVertical;
            var diceX2 = diceX1 + diceWidth - dicePushMarginHorizontal*2
            var diceY2 = diceY1 + diceHeight - dicePushMarginVertical*2
            if(x> diceX1 && x < diceX2 && y > diceY1 && y < diceY2){
                return {
                    x: diceX1 + diceWidth/2, 
                    y: diceY1 + diceHeight/2,
                    letter: chars[i]
                };
            }
            i++;
        }
    }
    return {
        x: 0,
        y: 0,
        letter: "0"
    };
}

function store(x, y, s, c) {
    var centerposition = getcenter(x, y);
    if(centerposition.x != 0 && centerposition.y != 0){
        var line = {
		"x": centerposition.x,
		"y": centerposition.y,
		"size": s,
		"color": c
        }
                
        if(linesArray.length > 0) {
            var prevline = linesArray[linesArray.length -1];
            if(prevline.x != line.x || prevline.y != line.y){
                linesArray.push(line);
                letterArray.push(centerposition.letter)
            }
        }
        else{
            linesArray.push(line);
            letterArray.push(centerposition.letter)
        }
    }
}
        
function mouseup() {
	isMouseDown=false
    store()
    linesArray = [];
    var answer = "";
    for(var i = 0; i < letterArray.length; i++) {
        answer += letterArray[i]
    }
    checkAnswer(answer);
    letterArray = [];
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(!stop){
        drawBricks(chars);
        drawWordStatus(wordStatus);
        drawScore(countScore(guessed));
        for (var i = 1; i < linesArray.length; i++) {
			ctx.beginPath();
			ctx.moveTo(linesArray[i-1].x, linesArray[i-1].y);
			ctx.lineWidth  = linesArray[i].size;
			ctx.lineCap = "round";
			ctx.strokeStyle = linesArray[i].color;
			ctx.lineTo(linesArray[i].x, linesArray[i].y);
			ctx.stroke();
		}
    }
    else{
        drawBricks(chars);
        ctx.beginPath();
        ctx.font = ((fontRatio * 60)|0) + "px Arial"
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#3399ff";
        ctx.fillText('Game over!', canvas.width/2, 50)
        ctx.fillStyle = "black";
        ctx.font = ((fontRatio * 40)|0) + "px Arial";
        ctx.fillText("Your score: " + countScore(guessed), canvas.width/2, resultOffsetTop);
        ctx.closePath();
    }
}

function copyStringToClipboard (str) {
    // Create new element
    var el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
}

function resetGame(){
    chars = rollDice()
    wordStatus = ""
    wordlist = []
    guessed = []
    start = true
    stop = false
    timeTillStop = 0

    charstring = ""
    for(i = 0; i<16; i++){
        charstring += chars[i]
    }

    var dice = [];

    for(var c=0; c<diceColumnCount; c++) {
        dice[c] = [];
        for(var r=0; r<diceRowCount; r++) {
            dice[c][r] = { x: 0, y: 0 };
        }
    }
}

function resetGameDeprecated(){
    location.replace("/")
}

function shareBoardState(){
    result = [...new Set(guessed)];
    score = [0, 0, 0, 0, 0]
    for(i = 0; i < result.length; i++){
        var l = result[i].length;
        if(l <= 4){
            score[0] += 1
        }
        else if(l == 5){
            score[1] += 1
        }
        else if(l == 6){
            score[2] += 1
        }
        else if(l == 7){
            score[3] += 1
        }
        else{
            score[4] += 1
        }
    }
    scoreString = "\n\n1 point words: " + score[0] + "\n2 point words: " + score[1] + "\n3 point words: " + score[2] + "\n5 point words: " + score[3] + "\n7 point words: " + score[4]
    const myCipher = cipher('noodles')
    var encrypted = myCipher(charstring)
    copyStringToClipboard("I got " + countScore(guessed) + " points!" + scoreString + "\n\nsimonisphording.github.io?id=" + encrypted)
    alert("link with boardstate copied to clipboard!")
}
