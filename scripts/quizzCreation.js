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
    console.log(quizz.image);
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
    document.querySelector(".creation.beginning").classList.add("hide");
}   