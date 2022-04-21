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

    list.innerHTML += `<div class="quiz" onclick="quizAnswer(${id})">
                        <div class="quiz-title">${titulo}</div>
                        </div>`        
    }
}

function quizAnswer(id){
    const promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${id}`);
    promise.then((resposta) => { 
        renderizarQuiz(resposta.data);
    });
}

function renderizarQuiz (infoQuiz){
    console.log(infoQuiz.image);
    document.querySelector(".container-pagina-1").classList.add("hidden");
    document.querySelector(".quiz-page").classList.remove("hidden");
}