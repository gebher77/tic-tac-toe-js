let plays = 9;
let win = false;
const objeto = {};
const name_player1 = document.querySelector('input[id = "player1"]');
const name_player2 = document.querySelector('input[id = "player2"]');
const players_name_div = document.getElementById("div_players_name");
const form = document.getElementById("form_name_players");
const h2_player1 = document.createElement("h2");
const h2_player2 = document.createElement("h2");
const buttonPlayAgain = document.createElement("button");
const simbolList = document.querySelectorAll(".buttonSimbols");
const playButton = document.getElementById("start_play_button");

buttonPlayAgain.innerText = "Jogar novamente?";
buttonPlayAgain.id = "playAgainButton";

//Começa com todos os botões desativados
simbolList.forEach(function (e) {
  e.disabled = true;
});

checkPlayerNames();

//Função para checar os nomes
function checkPlayerNames() {
    //caso os campos não estejam vazios, o botão de iniciar o jogo será ativado e ficara da cor verde
  if (name_player1.value.trim() && name_player2.value.trim()) {
    playButton.disabled = false;
    playButton.style.setProperty("--red-hover", "#adff2f");
    enableHover();
  } else {
    //caso os campos estejam vazios, o botão de iniciar o jogo será desativado e ficara da cor vermelha
    playButton.disabled = true;
    playButton.style.setProperty("--red-hover", "#FF0000");
    disableHover();
  }
}

//Captura eventos dos inputs
//Pega os nomes em tempo real
name_player1.addEventListener("input", checkPlayerNames);
name_player2.addEventListener("input", checkPlayerNames);

//Botão de começar o jogo
document
  .getElementById("start_play_button")
  .addEventListener("click", function (ev) {
    ev.preventDefault();

    //Habilita os botões para o começo do jogo
    simbolList.forEach(function (e) {
      e.disabled = false;
    });

    //Remove o form de nomes de jogadores
    form.remove();

    //Transforma os nomes coletados nos inputs para títulos H2
    h2_player1.innerHTML = name_player1.value;
    h2_player1.id = "h2_player1";
    players_name_div.append(h2_player1);

    h2_player2.innerHTML = name_player2.value;
    h2_player2.id = "h2_player2";
    players_name_div.append(h2_player2);

    //O player 1 começa com a cor verde(indica que é o primeiro a jogar)
    h2_player1.style.color = "#adff2f";
  });

//Percorre todos os botões
simbolList.forEach(function (simbolButton) {
//Captura eventos de cada botão
  simbolButton.addEventListener("click", function () {
    const player1 = document.getElementById("h2_player1");
    const player2 = document.getElementById("h2_player2");
    plays--;
    //A cada jogada, muda o nome do jogador da vez para verde
    //Desativa os botões que ja foram usados
    if (plays % 2 == 0) {
      simbolButton.innerText = "X";
      simbolButton.disabled = true;
      player1.style.color = "#EEEEEE";
      player2.style.color = "#adff2f";
    } else {
      simbolButton.innerText = "O";
      simbolButton.disabled = true;
      player2.style.color = "#EEEEEE";
      player1.style.color = "#adff2f";
    }
  });
});

let fieldValues = new Array();

//Coloca os ids dos botoes dentro do array
simbolList.forEach(function (e, i) {
  fieldValues[i] = e.id;
});


//Percorre a lista de botões
simbolList.forEach(function (simbolButton) {
//Captura eventos de cada botão
  simbolButton.addEventListener("click", function () {
    //Percorro o array de ids(array onde estão os ids de todos os botões)
    fieldValues.forEach(function (e, i) {
   //Variável recebe o valores(textos) de cada botao
      let simbolEachField = document.getElementById(fieldValues[i]).innerText;
      
      //Os valores são passados para o objeto
      objeto[i] = simbolEachField;
    });

//Array que possue todas as combinações de vitória
    let combinação = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];


    //Percorre o array de combinações para vitória.
    combinação.forEach((combinação) => {
        //Chama as funções para verificar cada símbolo
      verifyWin(combinação, objeto, h2_player2, h2_player1, name_player1, "X");
      verifyWin(combinação, objeto, h2_player1, h2_player2, name_player2, "O");
    });
    verifyTie(h2_player1, h2_player2);
  });
});

//Atribui o refresh da página ao botão de jogar novamente
buttonPlayAgain.addEventListener("click", function () {
  location.reload();
});

//Função de desabilitar o Hover dos botões
function disableHover() {
  simbolList.forEach(function (e, i) {
    e.style.setProperty("--hover-disabled", "#31363F");
  });
}

//Função de habilitar o Hover dos botões
function enableHover() {
  simbolList.forEach(function (e, i) {
    e.style.setProperty("--hover-disabled", "#424955");
  });
}

//Desabilita o placeHolder após o user clicar no input
function disabledPlaceHolder(element) {
  element.placeholder = "";
}

//Função para verificar Vitória 
function verifyWin(
  combination,
  object,
  nameToRemove,
  playerTitle,
  playerName,
  simbol
) {
    //Verifica se as combinações de vitória dentro do objeto tem o mesmo símbolo
  if (combination.every((i) => object[i] === simbol)) {
    win = true;
    players_name_div.removeChild(nameToRemove);
    playerTitle.innerHTML = "Vitória de " + playerName.value + "!";
    playerTitle.style.color = "#FABC3F";
    players_name_div.append(buttonPlayAgain);
    simbolList.forEach((i) => {
        i.disabled = true;
      });
    disableHover();
  }
}

//Função para verificar empate
function verifyTie(player1Title, player2Title) {
    //Caso as jogadas zerarem e ninguem ganhar(win == false)
  if (plays == 0 && !win) {
    let deuVelha = document.createElement("h1");
    deuVelha.innerHTML = "Deu velha";
    deuVelha.style.textDecoration = "line-through";
    players_name_div.removeChild(player2Title);
    players_name_div.removeChild(player1Title);
    players_name_div.append(deuVelha);
    players_name_div.append(buttonPlayAgain);
    disableHover();
  }
  
}