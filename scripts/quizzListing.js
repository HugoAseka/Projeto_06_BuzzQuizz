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
                        <div class="quiz-title">${titulo}</div>
                        </div>`    
    }
}

function quizToPlay(id){
    
    const promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${id}`);
    promise.then((resposta) => { 
        renderizarQuizz(resposta.data);
    });

    document.querySelector(".container-pagina-1").classList.add("hidden");
    document.querySelector(".container-pagina-2").classList.remove("hidden");

}

function renderizarQuizz(infoResposta){
    console.log(infoResposta);

    let imagem = infoResposta.image;
    let titulo = infoResposta.title;

    const banner = document.querySelector(".banner");
    banner.innerHTML = `<img class="main-image" src='${imagem}'/><div class="main-quiz-title">${titulo}</div>`

    let questionBox = document.querySelector(".question-list");

    for (let i = 0; i < infoResposta.questions.length; i++){
        for (let k = 0; k <infoResposta.questions[i].answers.length; k++){
            console.log(infoResposta.questions[i]);
            questionBox.innerHTML += ` <div class="question-main">
        <div class="question-main-title" style="background-color: ${infoResposta.questions[i].color};"><div class="question-title">${infoResposta.questions[i].title}</div></div>
        <div class="answer-container">
                        <div class="answers-box">
                            <div class="answer-unique"><img class="answer-unique-image" src=''><div class="answer-unique-text">Gatineo</div></div>
                            <div class="answer-unique"><img class="answer-unique-image" src=''><div class="answer-unique-text">Gatineo</div></div>
                            <div class="answer-unique"><img class="answer-unique-image" src=''><div class="answer-unique-text">Gatineo</div></div>
                            <div class="answer-unique"><img class="answer-unique-image" src=''><div class="answer-unique-text">Gatineo</div></div>
                        </div>
                    </div>    
        </div>
        ` 
            }
        }    


    
}




/* let questionBox = document.querySelector(".question-list");
    for (let i = 0; i < infoResposta.questions.length; i++){
        questionBox.innerHTML += ` <div class="question-main">
        <div class="question-main-title" style="background-color: ${infoResposta.questions[i].color};"><div class="question-title">${infoResposta.questions[i].title}</div></div></div>`
    } */
  