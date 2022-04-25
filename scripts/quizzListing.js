function createNewQuiz() {
    document.querySelector(".container-pagina-1").classList.add("hidden");
    document.querySelector(".creation").classList.remove("hidden");
}

const promise = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
<<<<<<< HEAD
promise.then((response) => { 
    renderizeQuizzes(response.data);
});
promise.catch( erro => {
    alert(erro.response.status);
});

function renderizeQuizzes(infoResponse){
    for (let i = 0; i < infoResponse.length; i++){
        document.querySelector(".all-quizzes").innerHTML += 
                    `<div class="quiz" onclick="quizToPlay(${infoResponse[i].id})">
                            <img class="quiz-image" src="${infoResponse[i].image}"/>
                            <img class="black-mask" src="/blackmask1.jpg"/>
                                <div class="quiz-title">${infoResponse[i].title}
                                </div>
                    </div>`    
    }
}

function quizToPlay(id){
    const promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/4`);
    promise.then((response) => { 
        randomizeQuizz(response.data);
        renderizeQuizz(response.data);
=======
promise.then((resposta) => {
    renderizarQuizzes(resposta.data);
});
promise.catch(erro => {
    alert(erro.resposta.status);
})

function renderizarQuizzes(infoResposta) {
    const list = document.querySelector(".all-quizzes");
    //lista.innerHTML = '';

    for (let i = 0; i < infoResposta.length; i++) {
        let id = infoResposta[i].id;
        let titulo = infoResposta[i].title;
        let imagem = infoResposta[i].image;

        list.innerHTML += `<div class="quiz" onclick="quizToPlay(${id})">
                            <img class="quiz-image" src="${imagem}"/>
                            <img class="black-mask" src="/blackmask1.jpg"/>
                            <div class="quiz-title">${titulo}
                            </div>
                        </div>`
    }
}

function quizToPlay(id) {
    const promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${id}`);
    promise.then((resposta) => {
        randomizeQuizz(resposta.data);
        renderizarQuizz(resposta.data);
>>>>>>> b8e56cc5db6bcf874dd93639f03548bac22bafa5
    });
    document.querySelector(".container-pagina-1").classList.add("hidden");
    document.querySelector(".container-pagina-2").classList.remove("hidden");
}

<<<<<<< HEAD
function randomizeQuizz (infoResponse){
    for (let i = 0; i < infoResponse.questions.length; i++){    
       let shufflin = infoResponse.questions[i].answers.sort( () => .5 - Math.random() );   
=======
function randomizeQuizz(infoResposta) {
    for (let i = 0; i < infoResposta.questions.length; i++) {
        let shufflin = infoResposta.questions[i].answers.sort(() => .5 - Math.random());
>>>>>>> b8e56cc5db6bcf874dd93639f03548bac22bafa5
    }

    document.querySelector(".screen32").innerHTML = ""; //parte do botão "acessarquizz" na pág 3.4
}

<<<<<<< HEAD
function renderizeQuizz(infoResponse){
    let idQuizz = infoResponse.id;
    let imagem = infoResponse.image;
    let titulo = infoResponse.title;
=======
function renderizarQuizz(infoResposta) {

    let imagem = infoResposta.image;
    let titulo = infoResposta.title;

>>>>>>> b8e56cc5db6bcf874dd93639f03548bac22bafa5
    const banner = document.querySelector(".banner");
    let questionBox = document.querySelector(".question-list");
<<<<<<< HEAD

    banner.innerHTML = `<img class="main-image" src='${imagem}'/><div class="main-quiz-title">${titulo}</div>`
    for (let i = 0; i < infoResponse.questions.length; i++){
        questionBox.innerHTML += 
            `<div class="question-main">
                <div class="question-main-title" style="background-color: ${infoResponse.questions[i].color};">
                    <div class="question-title">${infoResponse.questions[i].title}
                    </div>
            </div>
                <div class="answer-container">
                    <div class='answers-box' id='${i+1}'>`        
        for (let k = 0; k <infoResponse.questions[i].answers.length; k++){
            let answerBox = document.querySelector(`#${CSS.escape(i+1)}`);
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

function answerQuizz (click){
    let answerString = click.id;
    let verifyAnswer = answerString.slice(2,7);
    let questionID = click.id[0];
    let answerID = click.id[1];
    let selectedElement = document.querySelector(".answer-unique")
    
    if (verifyAnswer === "false"){
        document.getElementById(`text${click.id}`).style.color = "red";
    } else {
        document.getElementById(`text${click.id}`).style.color = "green";
=======
    for (let i = 0; i < infoResposta.questions.length; i++) {
        questionBox.innerHTML += ` <div class="question-main">
                                        <div class="question-main-title" style="background-color: ${infoResposta.questions[i].color};">
                                            <div class="question-title">${infoResposta.questions[i].title}
                                            </div>
                                        </div>
                                        <div class="answer-container">
                                        <div class='answers-box' id='${i + 1}'>`
        for (let k = 0; k < infoResposta.questions[i].answers.length; k++) {
            let answerBox = document.querySelector(`#${CSS.escape(i + 1)}`);
            answerBox.innerHTML += `<div class="answer-unique" id='${k}'>
                                        <img class="answer-unique-image" id='${i}${infoResposta.questions[i].answers[k].isCorrectAnswer}'  onclick="answerQuizz(this)" src='${infoResposta.questions[i].answers[k].image}'>
                                        <div class="answer-unique-text">${infoResposta.questions[i].answers[k].text}
                                    </div>
                                </div>`
        }
        questionBox.innerHTML += `</div></div></div>`;
    }
}
function answerQuizz(click) {
    console.log(click.id[0]);
    if (click.id[1] === 'f') {
        console.log("Resposta Errada");
>>>>>>> b8e56cc5db6bcf874dd93639f03548bac22bafa5
    }

    for (let i = 0; i < 5; i++){
        selectedElement.removeAttribute('onclick');
    }

}

