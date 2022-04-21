let quizz = {
    title: "",
    image: "",
    questions: [
        {
            title: "",
            color: "",
            answers: [
                {
                    text: "",
                    image: "",
                    isCorrectAnswer: true
                },
                {
                    text: "",
                    image: "",
                    isCorrectAnswer: false
                }
            ]
        }
    ]
};
let numberOfQuestions = 0;
let numberOfLevels = 0;


function startQuestions() {
    quizz.title = document.querySelector(".question-block :nth-child(1)").value;
    console.log(quizz.title);
    quizz.image = document.querySelector(".question-block :nth-child(2)").value;
    numberOfQuestions = document.querySelector(".question-block :nth-child(3)").value;
    numberOfLevels = document.querySelector(".question-block :nth-child(4)").value;
    if (numberOfQuestions < 3) {
        alert("número minimo de perguntas é 3!");
        return;
    }
    if (numberOfLevels < 2) {
        alert("Número mínimo de níveis é 2!");
        return;
    }
    document.querySelector(".creation.beginning").classList.add("hidden");
    renderizeQuestions();
}


function renderizeQuestions() {
    page32 = document.querySelector(".screen32");
    page32.innerHTML = "<h3>Crie suas perguntas</h3>";
    for (let i = 1; i <= numberOfQuestions; i++) {
        page32.innerHTML += `
        <div class="question-box question${i}">
            <div class="question">
                <span>Pergunta ${i}</span>
                <input type="text" placeholder="Texto da pergunta">
                <input type="text" placeholder="Cor de fundo da pergunta">
            </div>
            <div class="correct-answer">
                <span>Resposta correta</span>
                <input type="text" placeholder="Resposta correta">
                <input type="text" placeholder="URL da imagem">
            </div>
            <span>Respostas incorretas</span>
            <div class="wrong-answer one">
                <input type="text" placeholder="Resposta incorreta 1">
                <input type="text" placeholder="URL da imagem 1">
            </div>
            <div class="wrong-answer two">
                <input type="text" placeholder="Resposta incorreta 2">
                <input type="text" placeholder="URL da imagem 2">
            </div>
            <div class="wrong-answer three">
                <input type="text" placeholder="Resposta incorreta 3">
                <input type="text" placeholder="URL da imagem 3">
            </div>
        </div>`
    }
    page32.innerHTML += `<span class="nextSection" onclick="startLevels()">Prosseguir para criar perguntas</span>`
}

function startLevels() {
    let question = document.querySelector(".question-box.question1");
    quizz.questions[0].title = question.querySelector("input:nth-child(2)").value;
    quizz.questions[0].color = question.querySelector("input:nth-child(3)").value;
    for (let i = 4; i < 10; i++) {
        let seiLa = question.querySelector("input:nth-child(4)").value;
        console.log(seiLa);
    }
    console.log(quizz);
}