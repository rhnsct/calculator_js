const array = JSON.parse(localStorage.getItem('eqol'));
const cache = document.getElementById('cache');


divOnLoad()

function initiateStorage(keyLog, a, op, b) {
    
    if (array) {
        array.unshift([a, op, b, keyLog]);
        localStorage.setItem('eqol', JSON.stringify(array));
        checkOverFifty()
    } else {
        localStorage.setItem('eqol', JSON.stringify([[a, op, b, keyLog]]))
    }
    generateDiv(keyLog, a, op, b)
}

function scrollToTop(keyLog, a, op, b) {
    initiateStorage(keyLog, a, op, b)
    cache.scrollTop = 0
}

function generateDiv(keyLog, a, op, b) {
    let div = document.createElement('div');
    
    div.setAttribute('id', `0a`);
    div.setAttribute('class', 'cacheResult');
    div.setAttribute('onclick', 'respondMemoryClick(this.id)');
    renameIds();
    cache.prepend(div);
    let span = document.createElement('span')
    div.prepend(span)
    span.setAttribute('class', 'historyContainer')
    let h3 = document.createElement('h3');
    let h4 = document.createElement('h4');
    h3.setAttribute('id', '0aresult')
    span.prepend(h3)
    span.prepend(h4)
    
    h3.innerText = keyLog
    h4.innerText = `${a}${op}${b}=`
}


function clearHistoryDivs() {
    while (cache.firstChild) {
        cache.removeChild(cache.lastChild);
    }
}

function divOnLoad() {
    let array = JSON.parse(localStorage.getItem('eqol'));
    if  (array) {
        clearHistoryDivs()
        for (let i = 0; i < array.length; i++) {
            let arrayIndex = array[i]
            generateDiv(arrayIndex[3], arrayIndex[0], arrayIndex[1], arrayIndex[2])
        }
    }
}

function checkOverFifty() {
    if (array.length > 50) {
        cache.removeChild(cache.lastChild);
    }
}

function renameIds() {
    let descendents = cache.getElementsByTagName('div')
    let grandkids = cache.getElementsByTagName('h3')
    for (let i = 0; i  < descendents.length; ++i){
        e = descendents[i];
        e.setAttribute('id', `${i+1}a`)
    }
    for (let i = 0; i  < grandkids.length; ++i){
        e = grandkids[i];
        e.setAttribute('id', `${i+1}aresult`)
    }
}

function clearStorage() {
    clearHistoryDivs()
    clearScreen()
    localStorage.clear()
}
