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

// começo renderizar quizzes do usuario
renderizeUserQuizzes();
function renderizeUserQuizzes() {
    const list = document.querySelector(".local-quizzes");

    for (let i = 0; i < userIds.length; i++) {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${userIds[i]}`)
        promise.then((response) => {
            console.log(response.data)
            console.log(userIds[i]);
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
    const promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/4`);
    promise.then((response) => {
        randomizeQuizz(response.data);
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


/*    if (verifyAnswer === "false"){
        document.getElementById(`text${click.id}`).style.color = "red";
    } else {
        document.getElementById(`text${click.id}`).style.color = "green";
        pointcounter ++;
    } */
//   document.getElementById(`${click.id}`).style.opacity = 0.5;

function answerQuizz(click) {
    let answerString = click.id;
    let questionID = answerString[0] * 1;
    let answerID = answerString[1] * 1;
    let isCorrectAnswer = answerString.slice(2, 7);
    let score = 0;

    for (let i = 0; i < 4; i++) {
        if (i !== answerID) {
            console.log(`${questionID}${i}${isCorrectAnswer}`);
            if (isCorrectAnswer === 'true') {
                document.getElementById(`text${answerString}`).style.color = "green";
                document.getElementById(`text${questionID}${i}false`).style.color = "red";
                document.getElementById(`${questionID}${i}false`).style.opacity = 0.5;
            }
        }
    }

}