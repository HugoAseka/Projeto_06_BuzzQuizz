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

    const banner = document.querySelector(".banner");
    let imagem = infoResposta.image;
    let titulo = infoResposta.title;

    banner.innerHTML = `<img class="main-image" src='${imagem}'/><div class="main-quiz-title">${titulo}</div>`

   
    const question = document.querySelector(".question-list")
    const answerBox = document.querySelector(".answer-container")

    for (let i = 0; i < infoResposta.questions.length; i++){
        question.innerHTML += `<div class="question-main"><div class="question-main-title" style="background-color: ${infoResposta.questions[i].color};"><div class="question-title">${infoResposta.questions[i].title}</div></div></div>`
                                                         

        }



    }    





