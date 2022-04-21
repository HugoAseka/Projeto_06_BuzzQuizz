let infoResposta = '';

function createNewQuiz(){
    document.querySelector(".container-pagina-1").classList.add("hidden");
    document.querySelector(".creation").classList.remove("hidden");
}

const promise = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
promise.then((resposta) => { 
    renderizarMensagens(resposta.data);
});
promise.catch( erro => {
    alert(erro.resposta.status);
})     

function renderizarMensagens(infoResposta){
    const lista = document.querySelector(".all-quizzes");
    //lista.innerHTML = '';

    for (let i = 0; i < infoResposta.length; i++){
        let id = infoResposta[i].id;
        let titulo = infoResposta[i].title;
        let imagem = infoResposta[i].image;

        console.log(id);
        console.log(titulo);
        console.log(imagem);

    lista.innerHTML += `<div class="quiz" onclick="quizAnswer(this)">
                        <div class="quiz-title">${titulo}</div>
                        </div>`        
    }


}




