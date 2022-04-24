function createNewQuiz(){
    document.querySelector(".container-pagina-1").classList.add("hidden");
    document.querySelector(".creation").classList.remove("hidden");
}


const promise = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
promise.then((resposta) => { 
    renderizarQuizzes(resposta.data);
});
promise.catch( erro => {
    alert(erro.resposta.status);
})     

function renderizarQuizzes(infoResposta){
    const list = document.querySelector(".all-quizzes");
    //lista.innerHTML = '';

    for (let i = 0; i < infoResposta.length; i++){
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

function quizToPlay(id){
    const promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${id}`);
    promise.then((resposta) => { 
       randomizeQuizz(resposta.data);
        renderizarQuizz(resposta.data);
    });
    document.querySelector(".container-pagina-1").classList.add("hidden");
    document.querySelector(".container-pagina-2").classList.remove("hidden");
}

function randomizeQuizz (infoResposta){
    for (let i = 0; i < infoResposta.questions.length; i++){    
       let shufflin = infoResposta.questions[i].answers.sort( () => .5 - Math.random() );   
    }
}

function renderizarQuizz(infoResposta){
    
    let imagem = infoResposta.image;
    let titulo = infoResposta.title;

    const banner = document.querySelector(".banner");
    banner.innerHTML = `<img class="main-image" src='${imagem}'/><div class="main-quiz-title">${titulo}</div>`

    let questionBox = document.querySelector(".question-list");
    for (let i = 0; i < infoResposta.questions.length; i++){
        questionBox.innerHTML += ` <div class="question-main">
                                        <div class="question-main-title" style="background-color: ${infoResposta.questions[i].color};">
                                            <div class="question-title">${infoResposta.questions[i].title}
                                            </div>
                                        </div>
                                        <div class="answer-container">
                                        <div class='answers-box' id='${i+1}'>`        
        for (let k = 0; k <infoResposta.questions[i].answers.length; k++){
            let answerBox = document.querySelector(`#${CSS.escape(i+1)}`);
                answerBox.innerHTML += `<div class="answer-unique" id='${k}'>
                                        <img class="answer-unique-image" id='${i}${infoResposta.questions[i].answers[k].isCorrectAnswer}'  onclick="answerQuizz(this)" src='${infoResposta.questions[i].answers[k].image}'>
                                        <div class="answer-unique-text">${infoResposta.questions[i].answers[k].text}
                                    </div>
                                </div>`
                            } 
                questionBox.innerHTML += `</div></div></div>`;            
            }  
}                                                                                                                                                                                                                                               
function answerQuizz (click){
    console.log(click.id[0]);
    if (click.id[1] === 'f'){
        console.log("Resposta Errada");
    }
}
