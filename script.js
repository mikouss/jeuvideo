//constantes

const container = document.querySelector('.plateau');

const scoreBoard = document.querySelector('.score');

const btnStart = document.querySelector('.btnStart');


//variables


let derniereCachette = false ;

let gameOver = false ;

let score =0;

btnStart.addEventListener('click' ,startGame);



function startGame(){
    
    btnStart.style.display = 'none';
    creationPlateau();
    startZombies();
    scoreBoard.innerHTML = score;
    scoring();
    
}



function startZombies(){
    
    let cachette = randomUp();
    
    let temp = Math.floor(Math.random() *3) +1;
    
    let tempCLass = temp > 1 ? 'up': 'up2';
    
    cachette.classList.add(tempCLass);
    
    const time = Math.round(Math.random()*(1500 - 250) +250);
    
    setTimeout(function(){
        
        cachette.classList.remove(tempCLass);
        
        if (!gameOver) startZombies();
        
    },time);
    
    
}




function randomUp(){
    
    // on crée une variable pour aller chercher toutes les div class ="cachette"
    
    const cachettes = document.querySelectorAll('.cachette');
    
    // constante qui va génerer un chiffre aléatoire parmis les 9 occurences
    
    const idx = Math.floor(Math.random()* cachettes.length);
    
    
    if(cachettes[idx].zombieId === derniereCachette){
        
        // on relance la generation de l'index
        
        return randomUp();
        
     }
    
    // on stocke le résultat dans la variable derniereCachette
    
    derniereCachette = cachettes[idx].zombieId;
    
    // on retourne la valeur obtenue
    
    return cachettes[idx];
    
}






function creationPlateau(){
    let cachetteCrees = 9;
    
    container.innerHTML = '';
    
    //création d'une boucle pour la création des div qui représentera les cachettes (pas plus de 9)
    
    
    for(let x = 0; x< cachetteCrees; x++){
        
        //créer les div
        
        let div = document.createElement('div');
        
        // on ajoute une classe a chaque div nouvellement créeer
        
        div.setAttribute('class','cachette');
        
        div.zombieId = x;
        
        
        // on créer dynamiquement une div avec une classe et un évènement (tir) pour les zombies et lola.
        
        //les Zombies
        
        let zombie = document.createElement('div');
        zombie.setAttribute('class','zombie');
        zombie.onclick = tir;
        div.appendChild(zombie);
        
        
        //lola 
        
        let lola = document.createElement('div');
        lola.setAttribute('class','lola');
        lola.onclick = tir2;
        div.appendChild(lola);
        
        
        //Mur
        
        let mur = document.createElement('div');
        mur.setAttribute('class','mur');
        div.appendChild(mur);
        
        
        
        // on rattache nos div (9) a la div plateau
        
        container.appendChild(div);
          
    } 
    
}



function scoring(){
    
    scoreBoard.innerHTML = "score : " + score ;
    
    let message = score >= 10 ? " You have won !!" : "vous avez perdu, voulez vous refaire une partie ? "
    
    
    if(score>=10 || score <0){
        
        gameOver = true;
        btnStart.style.display = 'block';
        
        confirm(message);
        docuement.location.href = "index.html";
        
    }
    
}






function tir(e){
    
    score++;
    
    this.parentNode.classList.remove('up');
    scoring();
    
}



function tir2(){
    
    console.log ('Touché !');
    score = score -5;
    
    this.parentNode.classList.remove('up2');
    scoring();
    
}