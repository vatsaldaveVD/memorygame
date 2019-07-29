const cards = document.querySelectorAll('.memory-card');

let lockboard = false;
let hasFillpedCard = false;
let firstcard,secondcard;

function flipcard(){
    if(lockboard) return;
    if(this === firstcard) return;

    this.classList.add('flip');

    if(!hasFillpedCard){
        //First Click
        hasFillpedCard = true;
        firstcard=this;   
        return;
    }

    //Second Click
    secondcard = this;

    checkForMatch();
}

function checkForMatch(){
    //Matching process
    if(firstcard.dataset.framework === secondcard.dataset.framework){
        //same
        disableCards();
    }
    else{
        //different
        unflipCards();
    }
}

function disableCards(){
    firstcard.removeEventListener('click', flipcard);
    secondcard.removeEventListener('click', flipcard);

    resetBoard();
}

function unflipCards(){
    lockboard = true;
    
    setTimeout(()=>{
        firstcard.classList.remove('flip');
        secondcard.classList.remove('flip');
        
        resetBoard();
    },1500);
}

function resetBoard(){
    [hasFillpedCard,lockboard] = [false,false];
    [firstcard,secondcard] = [null,null];
}

(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click',flipcard));