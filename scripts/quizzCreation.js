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
                },
                {
                    text: "",
                    image: "",
                    isCorrectAnswer: false
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
let userIds = [];
let userArrays = [];


// localStorage.setItem('userIds', '[91,120,126,130]');
userIds = JSON.parse(localStorage.getItem("userIds"));
localStorage.setItem('userIds', userIds);

for (let i = 0; i < userIds.length; i++) {
    userArrays.push(JSON.parse(localStorage.getItem(userIds[i])));
}



function toQuestions() {
    quizz.title = document.querySelector(".question-block :nth-child(1)").value;
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
    if (!(quizz.title.length > 20 && quizz.title.length < 65 && isURL(quizz.image))) {
        alert("Preencha os dados corretamente.")
        return;
    }
    document.querySelector(".creation.beginning").classList.add("hidden");
    renderizeQuestions();
}


function enterToQuestions(event) {
    let unicode = event.which;
    if (unicode === 13) {
        toQuestions();
    }
}



let isURL = (str) => {
    if ((str.substring(0, 8) === "https://" || str.substring(0, 3) === "www")) {
        return true;
    }
    return false;
}


function renderizeQuestions() {
    container = document.querySelector(".screen32");
    container.innerHTML = "<h3>Crie suas perguntas</h3>";
    for (let i = 1; i <= numberOfQuestions; i++) {
        container.innerHTML += `
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
    container.innerHTML += `<span class="nextSection" onclick="toLevels()">Prosseguir para criar perguntas</span>`
}

function toLevels() {
    let question = "";
    let current;
    for (i = 0; i < numberOfQuestions; i++) {
        question = document.querySelector(`.question-box.question${i + 1}`);
        quizz.questions[i] = {
            title: question.querySelector(".question input:nth-child(2)").value,
            color: question.querySelector(".question input:nth-child(3)").value
        }
        quizz.questions[i].answers = []
        quizz.questions[i].answers[0] = {
            text: question.querySelector(".correct-answer input:nth-child(2)").value,
            image: question.querySelector(".correct-answer input:nth-child(3)").value,
            isCorrectAnswer: true
        }
        quizz.questions[i].answers[1] = {
            text: question.querySelector(".wrong-answer.one input:nth-child(1)").value,
            image: question.querySelector(".wrong-answer.one input:nth-child(2)").value,
            isCorrectAnswer: false
        }
        quizz.questions[i].answers[2] = {
            text: question.querySelector(".wrong-answer.two input:nth-child(1)").value,
            image: question.querySelector(".wrong-answer.two input:nth-child(2)").value,
            isCorrectAnswer: false
        }
        quizz.questions[i].answers[3] = {
            text: question.querySelector(".wrong-answer.three input:nth-child(1)").value,
            image: question.querySelector(".wrong-answer.three input:nth-child(2)").value,
            isCorrectAnswer: false
        }
        if (!AnswerConditions(i)) {
            alert("Corrija as informações da pergunta " + (i + 1));
            return
        }

    }
    renderizeLevels();
}

const isHex = (str) => {
    if (str[0] !== "#") {
        return false;
    }
    let hex = (str.substring(1, 7)).toLowerCase();
    for (let i = 0; i < hex.length; i++) {
        if (hex[i] !== "a" && hex[i] !== "b" && hex[i] !== "c" && hex[i] !== "d" && hex[i] !== "e" && hex[i] !== "f") {
            return false;
        }
    }
    return true;
}

const AnswerConditions = (i) => {
    if (!(quizz.questions[i].title.length > 20 && isHex(quizz.questions[i].color))) return false
    if (quizz.questions[i].answers[0].text === "" || quizz.questions[i].answers[1].text === "") return false
    if (!isURL(quizz.questions[i].answers[0].image) || !isURL(quizz.questions[i].answers[1].image)
        || !isURL(quizz.questions[i].answers[2].image) || !isURL(quizz.questions[i].answers[3].image)) {
        return false;
    }
    return true
}

function renderizeLevels() {
    let container = document.querySelector(".screen32");
    container.innerHTML = `<h3>Agora, decida os níveis!</h3>`;

    for (i = 0; i < numberOfLevels; i++) {
        container.innerHTML +=
            `<div class="level lvl${i}">
            <span>Nível ${i + 1}</span>
            <input type="text" placeholder="Título do nível">
            <input type="text" placeholder="% de acerto mínima">
            <input type="text" placeholder="URL da imagem do nível">
            <input type="text" placeholder="Descrição do nível">
        </div>`
    }
    container.innerHTML += `<span class="nextSection" onclick="toSuccess()">Finalizar Quizz</span>`;

}


function toSuccess() {
    let level;
    let obj = {};
    quizz.levels = [];
    for (let i = 0; i < numberOfLevels; i++) {
        level = document.querySelector(`.lvl${i}`);

        quizz.levels[i] =
        {
            title: level.querySelector("input:nth-child(2)").value,
            image: level.querySelector("input:nth-child(4)").value,
            text: level.querySelector("input:nth-child(5)").value,
            minValue: Number(level.querySelector("input:nth-child(3)").value)
        }
        if (!levelConditions(i)) {
            alert(`Preencha os dados do nível ${i + 1} corretamente`);
            return;
        }
    }
    let counter = 0;
    for (let i = 0; i < numberOfLevels; i++) {
        if (quizz.levels[i].minValue === 0) counter++;
    }
    if (counter <= 0) {
        alert("Pelo menos um um nível precisa de 0% de acerto mínimo");
        return
    }

    document.querySelector(".screen32").innerHTML = "";
    uploadQuiz();


}

const levelConditions = (i) => {
    let lvl = quizz.levels[i];
    if (lvl.title.length < 10) return false;
    if (isNaN(lvl.minValue) || lvl.minValue < 0 || lvl.minValue > 100) return false;
    if (!isURL(lvl.image)) return false;
    if (lvl.text.length < 30) return false;
    return true;
}

// quizz.levels = [
// {
//     title: "",
//     image: "",
//     text: "",
//     minValue: 0
//     }
// ]
function uploadQuiz() {

    const requisition = axios.post('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes', quizz);
    requisition.then((response) => {
        let id = response.data.id;
        let serializedQuizz = JSON.stringify(response.data);
        localStorage.setItem(id, serializedQuizz);
        let deserializedQuizz = JSON.parse(localStorage.getItem(id));

    })

}
localStorageQuizz();

function localStorageQuizz() {

    console.log(userIds);


    console.log(userArrays);

}


function renderizeSuccess() {

}