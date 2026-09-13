const buttonE1=document.querySelectorAll("button");
const inputFieldE1=document.getElementById("result");

let isCalculated=false;
let lastClickedWasOperator=false;
for(let i=0;i<buttonE1.length;i++){
    buttonE1[i].addEventListener("click",()=>{
        const buttonValue=buttonE1[i].textContent;
        const iscurrentOperator=buttonE1[i].classList.contains("operator");
        if(buttonValue==="AC"){
            clearResult();
            isCalculated=false;
            lastClickedWasOperator=false;
        }
        else if(buttonValue==="DEL"){
            if(isCalculated){
                clearResult();
            }else{
                removeLastDigit();
            }
            isCalculated=false;
            lastClickedWasOperator=false;
        }
        else if(buttonValue==="="){
            if(!lastClickedWasOperator && inputFieldE1.value!==""){
                calculateResult();
                isCalculated=true;
            }
        }
        else {
            if(iscurrentOperator && lastClickedWasOperator  ){
                removeLastDigit();
            }
            if(inputFieldE1.value ==="" && iscurrentOperator){
                return;
            }
            if(isCalculated){
                if(buttonE1[i].classList.contains("operator")){
                    appendValue(buttonValue);
                }
                else{
                    inputFieldE1.value="";
                    appendValue(buttonValue);
                }
                isCalculated=false;
            }
            else{
                 appendValue(buttonValue);
            }
            lastClickedWasOperator = iscurrentOperator;  //
        }
    });
}

function clearResult(){
    inputFieldE1.value="";
}
function removeLastDigit(){
    inputFieldE1.value = inputFieldE1.value.slice(0,-1);
}
function calculateResult(){
    // try {
    //     inputFieldE1.value=eval(inputFieldE1.value);
    // } catch (error) {
    //     inputFieldE1.value="Error";
    // }
    inputFieldE1.value=eval(inputFieldE1.value);
}
function appendValue(buttonValue){
    inputFieldE1.value += buttonValue;
}

window.addEventListener("keydown",(event) =>{
    let key=event.key;
    if(key ==="Enter") key="=";
    if(key ==="Escape") key="AC";
    if(key ==="Backspace") key="DEL";
    for(let i=0;i<buttonE1.length;i++){
        if(buttonE1[i].textContent === key){
            event.preventDefault();
            buttonE1[i].click();
            break;
        }
    }
})