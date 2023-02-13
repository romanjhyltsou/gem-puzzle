const markup = () => {
const body = document.querySelector('body');
body.innerHTML = `
<header class="header">
<div class="container">
    <h1 class="header__title">Gem Puzzle</h1>
    <div class="header__btn-wraper">
        <button class="header__btn header__btn-shuffle">Shuffle and start</button>
        <button class="header__btn header__btn-pause">Pause time</button>
        <button class="header__btn header__btn-save">Save</button>
        <button class="header__btn header__btn-results">Results</button>
    </div>

    <div class="header__result-wraper">
        <div class="header__result-movies">Moves:<span> 0</span></div>
        <div class="header__result-time">Time:<span> 00:00:00</span></div>

        <div class="header__select-wraper">
            <p>Sound: </p>
            <select name="sound" class="select__sound">
                <option value="on">on</option>
                <option value="of">of</option>
            </select>
        </div>

    </div>
</div>
</header>

<main class="main">
<div class="container">
    <div class="fild">


    </div>
</div>
</main>

<footer class="footer">
<div class="container">
    <div class="footer__size-wraper">
        <div class="footer__size">Frame size:<span> 4x4</span></div>
        <div class="footer__sizes-btn-wraper">
            <button  class="footer__sizes-item" value="3x3">3x3</button>
            <button  class="footer__sizes-item" value="4x4">4x4</button>
            <button  class="footer__sizes-item" value="5x5">5x5</button>
            <button  class="footer__sizes-item" value="6x6">6x6</button>
            <button  class="footer__sizes-item" value="7x7">7x7</button>
            <button  class="footer__sizes-item" value="8x8">8x8</button>
        </div>
    </div>
</div>
</footer>
`;
const headerBtnShuffle = document.querySelector('.header__btn-shuffle');
const headerBtnSave = document.querySelector('.header__btn-save');

const headerBtnResults = document.querySelector('.header__btn-results');

headerBtnShuffle.disabled = true;

const fild = document.querySelector('.fild');
//audio start
const audio = new Audio('assets/audio/knopka.mp3');
let valueSound;
let selectSound = document.querySelector('.select__sound');
    valueSound = 'on';
    selectSound.addEventListener('change', ()=> {
        valueSound = selectSound.value ;
        console.log(valueSound);
});
//audio end
const headerSizesItems = document.querySelectorAll('.footer__sizes-item');

let headerSizeSpan = document.querySelector('.footer__size span');

let headerResultMovies = document.querySelector('.header__result-movies span');
let resultMoviesCount = 0;

let sizeNum = 4;
let sizeNumText = '4x4';
let sizeFildCell = 80;

fild.style.width = `${sizeNum * sizeFildCell + 2}px`;  // размер поля по умолчанию
fild.style.height = `${sizeNum * sizeFildCell + 2}px`; // размер поля по умолчанию

function frontSetting(){
    fild.style.background = 'rgb(255 130 101)';
    let frontStyle = document.createElement('p');
    let solution = document.createElement('img');
    solution.className = 'solution';
    solution.src = 'assets/img/solution.jpg';
    frontStyle.className = 'fild__title';
    fild.append(frontStyle);
    fild.append(solution);
    frontStyle.innerHTML = 'Выберите поле затем нажмите  Shuffle and start';
}
frontSetting();

//modal-results start
function results(){
    let modal = document.createElement('div');
    let closeModal = document.createElement('div');
    let closeImg = document.createElement('img');
    let modalItem = document.createElement('div');
        modal.className = 'fild__modal-results';
        closeModal.className = 'fild__modal-close-results';
        closeImg.className = 'fild__modal-close-img-results';
        closeImg.src = 'assets/img/icon/close-mob-nav.svg';
        modalItem.className = 'fild__modal-item-results';
    document.querySelector('.header__result-time').append(modal);
    modal.append(closeModal);
    closeModal.append(closeImg);
    modal.append(modalItem);
}
results();
const fildModalCloseResults = document.querySelector('.fild__modal-close-results');
fildModalCloseResults.addEventListener('click', ()=>{
    document.querySelector('.fild__modal-results').classList.remove('fild__modal-results-active');
});
headerBtnResults.addEventListener('click', ()=>{
  document.querySelector('.fild__modal-results').classList.add('fild__modal-results-active');
});

//modal-results end

/////////////////------------------------timer
const headerBtnStop = document.querySelector('.header__btn-pause');
const headerResultTime = document.querySelector('.header__result-time span');

let sec = 0;
let min = 0;
let hrs = 0;
let t;


function reset(){
    headerResultTime.textContent = " 00:00:00";
    sec = 0; min = 0; hrs = 0;
}

document.querySelectorAll('.footer__sizes-item').forEach( item => {
    item.addEventListener('click', ()=>{
        reset();
        clearTimeout(t);
    });
});
document.querySelector('.header__btn-shuffle').addEventListener('click', reset);
  
function tick(){
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
        if (min >= 60) {
            min = 0;
            hrs++;
        }
    }
}

function add() {
    tick();
    headerResultTime.textContent = 
    `${(hrs > 9 ? hrs : ` 0${hrs}`)}:${(min > 9 ? min : `0${min}`)}:${(sec > 9 ? sec : `0${sec}`)}`;   
    

    window.addEventListener('beforeunload', ()=> {
        localStorage.setItem('hrs',JSON.stringify(hrs));
        localStorage.setItem('min',JSON.stringify(min));
        localStorage.setItem('sec',JSON.stringify(sec));
    });

    timer();
}



function timer() {
    t = setTimeout(add, 1000);
}

headerBtnStop.addEventListener('click', ()=> {
clearTimeout(t);
fild.addEventListener('click', timeFild); //отслеживаем клики на ячейку что бы запустить время
});
/////////////////-----------------------------------------------------------timer

function resetMove(){
    document.querySelector('.header__result-movies span').textContent= ` 0`;
    resultMoviesCount = 0;
}

headerSizesItems.forEach( item => {
    item.addEventListener('click', ()=> {
        sizeNum = +item.value[0];
        if(sizeNum === 3){
            sizeFildCell = 100;
        }else  if(sizeNum === 4){
            sizeFildCell = 80;
        }else  if(sizeNum === 5){
            sizeFildCell = 64;
        }else  if(sizeNum === 6){
            sizeFildCell = 52;
        }else  if(sizeNum === 7){
            sizeFildCell = 44;
        }else  if(sizeNum === 8){
            sizeFildCell = 39;
        }

        console.log(sizeNum );
        sizeNumText = item.value;
        fild.innerHTML = '';

        localStorage.setItem('sizeNum', JSON.stringify(sizeNum));

        fild.style.width = `${sizeNum * sizeFildCell + 2}px`;  // размер поля
        fild.style.height = `${sizeNum * sizeFildCell + 2}px`; // размер поля
        frontSetting();

        headerSizeSpan.textContent = ` ${sizeNumText}`;

        headerBtnShuffle.disabled = false;
        
        resetMove();
    });
});
let couMovesResult;
let stepArr = [];
let timepArr = [];
function move(index){
       
    const cell = cellsArr[index];


    const leftDifference = Math.abs(empty.left - cell.left);
    const topDifference = Math.abs(empty.top - cell.top);

    if(leftDifference + topDifference > 1){
        return;
    }

    cell.element.style.left =  `${empty.left * sizeFildCell}px`;
    cell.element.style.top = `${empty.top * sizeFildCell}px`;


    const emptyLeft = empty.left;
    const emptyTop = empty.top;

    empty.left = cell.left;
    empty.top = cell.top;
    
    cell.left = emptyLeft;
    cell.top = emptyTop;

    const finished = cellsArr.every(cell => {
        return cell.value === cell.top * sizeNum + cell.left;
    });

    if(finished){
        let modal = document.createElement('div');
        let closeModal = document.createElement('div');
        let closeImg = document.createElement('img');
        let modalItem = document.createElement('div');
            modal.className = 'fild__modal';
            closeModal.className = 'fild__modal-close';
            closeImg.className = 'fild__modal-close-img';
            closeImg.src = '../assets/img/icon/close-mob-nav.svg';
            modalItem.className = 'fild__modal-item';
        fild.append(modal);
        modal.append(closeModal);
        closeModal.append(closeImg);
        modal.append(modalItem);

        modalItem.textContent = `
        Ура! Вы решили головоломку за ${headerResultTime.textContent} и 
        ${headerResultMovies.textContent} ходов!`;

        couMovesResult++;
        stepArr.push(headerResultMovies.textContent);
        timepArr.push(headerResultTime.textContent);

        let fildModalItemResults = document.querySelector('.fild__modal-item-results')

        if(couMovesResult === 11){
            fildModalItemResults.innerHTML = '';
            couMovesResult = 1;
        }
        fildModalItemResults.innerHTML += `
        <p class="list">
        <span class="list-span-num">${couMovesResult}.</span>
        moves:<span class="list-span">${headerResultMovies.textContent}</span>
        time: ${headerResultTime.textContent}
        field: ${headerSizeSpan.innerHTML}
        </p>`;

        let fildModalItemResultsLocal = fildModalItemResults.innerHTML;

        localStorage.setItem('fildModalItemResultsLocal',JSON.stringify(fildModalItemResultsLocal));
        localStorage.setItem('couMovesResult',JSON.stringify(couMovesResult));
        
        clearTimeout(t);

        let close = document.querySelector('.fild__modal-close');
        close.addEventListener('click', ()=> {
            document.querySelector('.fild__modal').style.display = 'none';
            resetMove();
            reset();
            clearTimeout(t);
            headerBtnShuffle.disabled = true;
            fild.innerHTML = '';
            frontSetting();
        });

    }
}
/* result store */
document.querySelector('.fild__modal-item-results')
.innerHTML = JSON.parse(localStorage.getItem(`fildModalItemResultsLocal`));
couMovesResult = +JSON.parse(localStorage.getItem(`couMovesResult`));
/* result store */

let empty = {
    value:0,
    top:0,
    left:0
};

let cellsArr = [];
let value;
let numbers;

function clickCell(i){
    move(i);
    resultMoviesCount++;
    headerResultMovies.textContent= ` ${resultMoviesCount}`;

    if (valueSound  === 'on') {
        audio.play();
    } else if (valueSound === 'of') {
        audio.pause();
    } 
}

function renderingFild(sizeNum){
    
    empty = {
        value:0,
        top:0,
        left:0
    };
    cellsArr =[];

    cellsArr.push(empty);
   

        numbers = [...Array(sizeNum * sizeNum - 1).keys()]
       .sort(()=> Math.random() - 0.5);
    
        for(let i = 1 ; i <= sizeNum * sizeNum - 1; i++){

            let cell = document.createElement('div');
             value = numbers[i -1] + 1;
            cell.className = 'fild__cell';
            cell.setAttribute('draggable','true');
            cell.innerHTML = value;

            cell.style.width = `${sizeFildCell}px`; // размер ячеки
            cell.style.height = `${sizeFildCell}px`; // размер ячеки
    
            let left = i % sizeNum,
            top = (i - left) / sizeNum;
    
            cellsArr.push({
                value:value,
                left:left,
                top:top,
                element:cell
            });
    
            cell.style.left =  `${left * sizeFildCell}px`;
            cell.style.top = `${top * sizeFildCell}px`;

            fild.append(cell);
    
            cell.addEventListener('click', ()=> {
                clickCell(i);
            });
            cell.addEventListener('dragstart', function(){
                this.classList.add('fild__cell-active');
            });
            cell.addEventListener('dragend', function(){
                this.classList.remove('fild__cell-active');
                clickCell(i);
                if(resultMoviesCount === 1){
                    timer();
                    fild.removeEventListener('click', timeFild);
                }
            });

        } 
}


///сохраняем в локалсторидж
headerBtnSave.addEventListener('click', ()=> {
    let fildCell = document.querySelectorAll('.fild__cell');
    let numCellSave = [];
    fildCell.forEach(item=>{
        numCellSave.push(item.innerHTML);
    });
    let fildWidthLocalS = fild.style.width;  // размер поля
    let fildHeightLocalS = fild.style.height;  // размер поля

    // рамер поля и сохран в локал
    localStorage.setItem('fildWidthLocalS',JSON.stringify(fildWidthLocalS));
    localStorage.setItem('fildHeightLocalS',JSON.stringify(fildHeightLocalS));
    // рамер поля и сохран в локал

    localStorage.setItem('numCellSave',JSON.stringify(numCellSave)); // клон цивр
    localStorage.setItem('cellsArr',JSON.stringify(cellsArr)); // клон располажение ячеек

    localStorage.setItem('sizeNumText',JSON.stringify(sizeNumText)); // span размер

    localStorage.setItem('textContent',JSON.stringify(+headerResultMovies.textContent)); // textContent

});
let clickcount;
///сохраняем в локалсторидж
function timeFild() {
    //отслеживаем клики на ячейку что бы запустить время
    clickcount = 0;
    clickcount++;

    timer();
    if(clickcount >= 1){
        fild.removeEventListener('click', timeFild);
        clickcount = 1;
    }

}

// получаем из локалсторидж
let cellsSaveArr  = JSON.parse(localStorage.getItem(`cellsArr`));
let numCellSaveArr  = JSON.parse(localStorage.getItem(`numCellSave`));



if(cellsSaveArr && numCellSaveArr){
    fild.innerHTML = ' ';
    fild.style.background = '';
    fild.style.width = JSON.parse(localStorage.getItem(`fildWidthLocalS`));
    fild.style.height = JSON.parse(localStorage.getItem(`fildHeightLocalS`));

    sec = JSON.parse(localStorage.getItem(`sec`));
    min = JSON.parse(localStorage.getItem(`min`));
    hrs = JSON.parse(localStorage.getItem(`hrs`));

    headerResultTime.textContent =  `${(hrs > 9 ? hrs : ` 0${hrs}`)}:${(min > 9 ? min : `0${min}`)}:${(sec > 9 ? sec : `0${sec}`)}`; 

    resultMoviesCount = +JSON.parse(localStorage.getItem(`textContent`));
    headerResultMovies.textContent= ` ${JSON.parse(localStorage.getItem(`textContent`))}`;

    headerSizeSpan.textContent = JSON.parse(localStorage.getItem(`sizeNumText`));
    
    sizeNum = +JSON.parse(localStorage.getItem('sizeNum')); 

    headerBtnShuffle.disabled = false;
    headerSizeSpan.textContent = ` ${sizeNum}x${sizeNum}`;
    
    fild.addEventListener('click', timeFild); //отслеживаем клики на ячейку что бы запустить время
    try{
        if(cellsSaveArr[0].left !== undefined && cellsSaveArr[0].top !== undefined ){
            empty = {
                value:0,
                top:cellsSaveArr[0].top,
                left:cellsSaveArr[0].left
            };
        }
    }catch(e){
        console.warn(e);
    }
    if(sizeNum === 3){
        sizeFildCell = 100;
    }else  if(sizeNum === 4){
        sizeFildCell = 80;
    }else  if(sizeNum === 5){
        sizeFildCell = 64;
    }else  if(sizeNum === 6){
        sizeFildCell = 52;
    }else  if(sizeNum === 7){
        sizeFildCell = 44;
    }else  if(sizeNum === 8){
        sizeFildCell = 39;
    }
    let countdrags = 0;
    cellsArr.push(empty);
        for(let i = 1 ; i <= numCellSaveArr.length; i++){

            let cell = document.createElement('div');
            let value = +numCellSaveArr[i-1];

            cell.className = 'fild__cell';
            cell.setAttribute('draggable','true');
            cell.innerHTML = numCellSaveArr[i-1];

            cell.style.width = `${sizeFildCell}px`; // размер ячеки
            cell.style.height = `${sizeFildCell}px`; // размер ячеки

            try{
                if(cellsSaveArr[i].left !== undefined && cellsSaveArr[i].top !== undefined ){
                    cellsArr.push({
                        value: value,
                        left: cellsSaveArr[i].left,
                        top:cellsSaveArr[i].top,
                        element:cell
                    });
                }
            }catch(e){
                console.warn(e);
            }

            cell.style.left =  `${cellsSaveArr[i].left * sizeFildCell}px`;
            cell.style.top = `${cellsSaveArr[i].top * sizeFildCell}px`;

            fild.append(cell);
    
            cell.addEventListener('click', ()=> {
                clickCell(i);
                countdrags++;
            });

            cell.addEventListener('dragstart', function(){
                this.classList.add('fild__cell-active');
            });

            cell.addEventListener('dragend', function(){
                this.classList.remove('fild__cell-active');
                clickCell(i);
                countdrags++;
                if(countdrags === 1){
                    timer();
                    fild.removeEventListener('click', timeFild);
                }
            });

        } 

}
// получаем из локалсторидж
//------------------------------------------------------ мешать и начало 
headerBtnShuffle.addEventListener('click', ()=> {
    console.log(localStorage.length);
    for (let i = 0; i < localStorage.length; i++) {
        if(localStorage.key(i) !== 'sizeNum'){
            localStorage.removeItem(localStorage.key(i));
        }

     }
    document.querySelector('.fild').innerHTML = '';
    renderingFild(sizeNum);
    fild.addEventListener('click', timeFild); //отслеживаем клики на ячейку что бы запустить время
    resetMove();
    fild.style.width = `${sizeNum * sizeFildCell + 2}px`;  // размер поля
    fild.style.height = `${sizeNum * sizeFildCell + 2}px`; // размер поля
    fild.style.background = '';

});
headerBtnShuffle.addEventListener('click', ()=> {
    clearTimeout(t);
});
//------------------------------------------------------ мешать и начало 
};   
export default markup;