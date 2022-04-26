let individualQuizz = {};
let pointCounter = 0;
let errorCounter = 0;
let result = 0;
let quizID = 0;
let marcador  = 0;

function createNewQuiz() {
    document.querySelector(".container-pagina-1").classList.add("hidden");
    document.querySelector(".creation").classList.remove("hidden");
}

const promise = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
promise.then((response) => {
    renderizeQuizzes(response.data);
});
promise.catch(erro => {
    alert(erro.response.status);
});

function renderizeQuizzes(infoResponse) {
    for (let i = 0; i < infoResponse.length; i++) {
        document.querySelector(".all-quizzes").innerHTML +=
            `<div class="quiz" onclick="quizToPlay(${infoResponse[i].id})">
                            <img class="quiz-image" src="${infoResponse[i].image}"/>
                            <img class="black-mask" src="/blackmask1.jpg"/>
                                <div class="quiz-title">${infoResponse[i].title}
                                </div>
                    </div>`
    }
}

function goHome(){
    window.location.reload();
}

// começo renderizar quizzes do usuario

if (userIds.length !== 0) {
    document.querySelector(".created-quizzes").classList.add("hidden");
    document.querySelector(".my-quizzes").classList.remove("hidden");
} else {
    document.querySelector(".created-quizzes").classList.remove("hidden");
    document.querySelector(".my-quizzes").classList.add("hidden");
}





renderizeUserQuizzes();
function renderizeUserQuizzes() {
    const list = document.querySelector(".local-quizzes");

    for (let i = 0; i < userIds.length; i++) {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${userIds[i]}`)
        promise.then((response) => {
            let id = response.data.id;
            let titulo = response.data.title;
            let imagem = response.data.image;

            list.innerHTML += `<div class="quiz" onclick="quizToPlay(${id})">
                                <img class="quiz-image" src="${imagem}"/>
                                <img class="black-mask" src="/blackmask1.jpg"/>
                                <div class="quiz-title">${titulo}
                                </div>
                            </div>`
        })
    }
}
//fim renderizar quizz usuário


function quizToPlay(id) {
    marcador = id;
    const promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${id}`);
    promise.then((response) => {
        randomizeQuizz(response.data);
        individualQuizz = response.data;
        quizID = response.data.id;
    });
    document.querySelector(".container-pagina-1").classList.add("hidden");
    document.querySelector(".container-pagina-2").classList.remove("hidden");
}

function randomizeQuizz(infoResponse) {
    for (let i = 0; i < infoResponse.questions.length; i++) {
        let shufflin = infoResponse.questions[i].answers.sort(() => .5 - Math.random());
    }
    renderizeQuizz(infoResponse);
    document.querySelector(".screen32").innerHTML = ""; //parte do botão "acessarquizz" na pág 3.4
}

function renderizeQuizz(infoResponse) {
    let idQuizz = infoResponse.id;
    let imagem = infoResponse.image;
    let titulo = infoResponse.title;
    let numberQuestions = infoResponse.questions.length;

    const banner = document.querySelector(".banner");
    let questionBox = document.querySelector(".question-list");

    banner.innerHTML = `<img class="main-image" src='${imagem}'/><div class="main-quiz-title">${titulo}</div>`
    for (let i = 0; i < infoResponse.questions.length; i++) {
        questionBox.innerHTML +=
            `<div class="question-main">
                <div class="question-main-title" style="background-color: ${infoResponse.questions[i].color};">
                    <div class="question-title">${infoResponse.questions[i].title}
                    </div>
            </div>
                <div class="answer-container">
                    <div class='answers-box' id='${i + 1}'>`
        for (let k = 0; k < infoResponse.questions[i].answers.length; k++) {
            let answerBox = document.querySelector(`#${CSS.escape(i + 1)}`);
            answerBox.innerHTML +=
                `<div class="answer-unique" id='answer${i}${k}'>
                            <img class="answer-unique-image" id='${i}${k}${infoResponse.questions[i].answers[k].isCorrectAnswer}'  onclick="answerQuizz(this)" src='${infoResponse.questions[i].answers[k].image}'>
                            <div class="answer-unique-text" id='text${i}${k}${infoResponse.questions[i].answers[k].isCorrectAnswer}'>${infoResponse.questions[i].answers[k].text}
                            </div>
                        </div>`
        }
        questionBox.innerHTML +=
            `</div>
                </div>
            </div>`;
    }
}

function answerQuizz(click) {

    let questionID = click.id[0] * 1;
    let answerID = click.id[1] * 1;
    let answersBox = document.querySelectorAll(".answers-box");
    let answerImgUnique = answersBox[questionID].querySelectorAll(".answer-unique img");
    let answerTextUnique = answersBox[questionID].querySelectorAll(".answer-unique .answer-unique-text");
    

    for (let i = 0; i < answerImgUnique.length; i++){
 
        if (i !== answerID){
            document.getElementById(`${answerImgUnique[i].id}`).style.opacity = 0.5;
        } 

        if ((answerTextUnique[i].id).slice(6,11) === 'true'){
            document.getElementById(`${answerTextUnique[i].id}`).style.color = "green";
        } else {
            document.getElementById(`${answerTextUnique[i].id}`).style.color = "red";
        }
            document.getElementById(`${answerImgUnique[i].id}`).removeAttribute('onclick');
    }
    
    if ((click.id.slice(2,7)) === 'true'){
        pointCounter ++;
    } else {
        errorCounter ++;
    }

    if ((pointCounter + errorCounter) === answersBox.length){
    result = (pointCounter/(answersBox.length) * 100);
    endQuizz(result);
    }
}

function endQuizz(result){
    
    const promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${quizID}`);
    promise.then((response) => {
        individualQuizz = response.data;
    });

    let valueID = 0;
    
    if (result <= individualQuizz.levels[0].minValue){
        valueID = 0;
    }
    else if (result <= individualQuizz.levels[1].minValue){
        valueID = 1;
    }
    else if (result <= individualQuizz.levels[2].minValue){
        valueID = 2;
    }
    else if (result <= individualQuizz.levels[3].minValue){
        valueID = 3;
    }

renderizeResult(valueID);
}

function renderizeResult(value){
 
    const endContainer = document.querySelector(".final-quiz-container")

    endContainer.innerHTML = 
        `<div class="questions-result">
            <div class="questions-result-title">
                ${individualQuizz.levels[value].title}
            </div>
            <div class="questions-result-content">
                <img class="questions-result-image" src="${individualQuizz.levels[value].image}">
                <div class="questions-result-description">
                ${individualQuizz.levels[value].text}
                </div>
            </div>
        </div>
        <div class="restart-quiz-button" onclick="restartQuiz()">
            Reiniciar Quizz
        </div>
        <div class="back-home-button" onclick="returnhome()">
            Voltar pra Home
        </div>`
}

function restartQuiz() {
    document.querySelector(".question-list").innerHTML = ""
    document.querySelector(".banner").innerHTML = "";
   quizToPlay(marcador);
 }

function returnhome(){
    window.location.reload();
}