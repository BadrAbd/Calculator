import * as utils from './utils.js'

let nbrStrFrom = '0'
let nbr = 0
let nbrSecOp = 0
// let result = 0


const buttons = [
    { element: document.querySelector('.zero'), char: '0' },
    { element: document.querySelector('.one'), char: '1' },
    { element: document.querySelector('.two'), char: '2' },
    { element: document.querySelector('.three'), char: '3' },
    { element: document.querySelector('.four'), char: '4' },
    { element: document.querySelector('.five'), char: '5' },
    { element: document.querySelector('.six'), char: '6' },
    { element: document.querySelector('.seven'), char: '7' },
    { element: document.querySelector('.eight'), char: '8' },
    { element: document.querySelector('.nine'), char: '9' },
    { element: document.querySelector('.decimal'), char: '.' }
];


const operators = [
    { element: document.querySelector('.operator.division'), handler: handleDivision , operation: '÷'},
    { element: document.querySelector('.operator.multiplication'), handler: handleMultiplication , operation: '×'},
    { element: document.querySelector('.operator.mince'), handler: handleMince , operation: '−'},
    { element: document.querySelector('.operator.plus'), handler: handlePlus , operation: '+'},
    { element: document.querySelector('.operator.equal'), handler: handleEqual, operation: '='}
]

const calcFunctions = [
    { element: document.querySelector('.function.ac'), handler: handleAC },
    { element: document.querySelector('.function.pm'), handler: handlePlusMinus },
    { element: document.querySelector('.function.percentage'), handler: handlePercentage }
]



// import * as handler from './handler.js'
function handleDivision() {
    // logic for division
};

function handleMultiplication() {
    // logic for multiplication
};

function handleMince() {
    // logic for mince
};

function handlePlus() {
    // alert(nbrStrFrom)
    // nbrStrFrom = '0'
    // updateNbr(nbrSecOp)
    // displayNbrStr()
    // operators[3].element.onclick(()=>{
    //     if(operators[3].element.classList.contains('activeOperator') ){
    //         alert('active')
    //     }
    // })

};

function handleEqual() {
    // logic for equal
};
// ------------- handleAC functions


function handleAC(func) {
    utils.removeActiveIfExists()
    if(nbr !== 0){
        nbr = nbrSecOp = 0
        nbTostr(nbr)
        displayNbrStr()
        calcFunctions[0].element.textContent = "AC"
    }
};
function displayNbrStr(){
    display.textContent = nbrStrFrom
}
function handlePlusMinus() {
    nbr *= -1
    nbTostr(nbr)
    displayNbrStr()
};

function handlePercentage() {
    nbr /= 100
    nbTostr(nbr)
    displayNbrStr()
};

// ------------ clock query
let hour = document.querySelector('.hour')
let minute = document.querySelector('.minute')

const updateTime = function (){
    let now = new Date();
    // hour.textContent = now.getHours() >= 10 ? `${now.getHours()}` : '0' + `${now.getHours()}`
    // minute.textContent = now.getMinutes() >= 10 ? `${now.getMinutes()}` : '0' + `${now.getMinutes()}`
    // or use padStart(2, '0')
    hour.textContent = now.getHours().toString().padStart(2, '0')
    minute.textContent = now.getMinutes().toString().padStart(2, '0')
}
updateTime()
setInterval(updateTime, 1000)

// -------------- display tipped number
let display = document.querySelector('.display')

const displayPressedNumb = function(char){
    if( char !== '.' || !nbrStrFrom.includes('.')){
        // after i press c(clear) nbrStr == '0' if i press a numb it becames '09' so i need to slice the first 0 
        if(nbrStrFrom[0] === '0'){
            nbrStrFrom = nbrStrFrom.slice(1)    }
        nbrStrFrom = nbrStrFrom.length < 9 ? nbrStrFrom + char : nbrStrFrom
     }
    display.textContent = nbrStrFrom
}

const AcToC = function(){
    if(nbr !== 0){
        calcFunctions[0].element.textContent = "C"}
}

function nbTostr(nbrParam){
    // alert(nbrParam)
    if(nbrParam.toString().length > 9)
        nbrParam = Number(nbrParam.toString().slice(0, 9))
    nbrStrFrom = nbrParam.toString()
}

const updateNbr = function(){
    let nbrParam
    // alert(nbrStrFrom)
    nbrParam = Number(nbrStrFrom)
    // if the displayed number != 0 Change Ac to C textContent
    AcToC()
    return nbrParam
}

buttons.forEach(button => {
    button.element.addEventListener('click', () => {
        displayPressedNumb(button.char);
        // classList.contains('activeOperator') if active update nbrSecOp
        if(activeOp() === undefined)
            nbr = updateNbr()
        else
            nbrSecOp = updateNbr()
    })
})

const changeButtonColor = function(element){
    element.classList.remove('operator');
    element.classList.add('activeOperator');
}
function activeOp(){
    return operators.find((op)=>{
        if(op.element.classList.contains('activeOperator'))
                return op
    })
}
const calcOperation = function(operator) {
    switch(operator) {
        case '+':
            nbr += nbrSecOp
            break
        case '−':
            nbr -= nbrSecOp
            break
        case '×':
            nbr *= nbrSecOp
            break
        case '÷':
            if (nbrSecOp === 0) {
                display.textContent = 'Error'
                nbr = 0
            } else {
                nbr /= nbrSecOp
            }
            break
    }
}

operators.forEach(op => {
    op.element.addEventListener('click', () => {
        if (op.operation === '=') {
            const activeOp = document.querySelector('.activeOperator')
            if (activeOp) {
                const lastOperator = operators.find(oper => activeOp.textContent === oper.operation)
                if (lastOperator) {
                    calcOperation(lastOperator.operation)
                    nbTostr(nbr)
                    displayNbrStr()
                    nbrStrFrom = '0'
                    utils.removeActiveIfExists()
                }
            }
        } else if (!op.element.classList.contains('activeOperator')) {
            utils.removeActiveIfExists()
            changeButtonColor(op.element)
            nbrStrFrom = '0'
            nbrSecOp = updateNbr()
            displayNbrStr()
        } else if (op.element.classList.contains('activeOperator')) {
            calcOperation(op.operation)
            nbTostr(nbr)
            displayNbrStr()
            nbrSecOp = 0
            nbTostr(nbrSecOp)
        }
    })
})


// calcFunctiocns loop and ev list
calcFunctions.forEach(func => {
    func.element.addEventListener('click', () =>{
        // alert('off')
        func.handler(func)
    })
})
