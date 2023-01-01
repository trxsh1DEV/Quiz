// Initial Data
let currentQuestion = 0;
let answersHits = 0;

showQuestion();

// Events
document.querySelector('.scoreArea button').addEventListener('click', () => {
    answersHits = 0;
    currentQuestion = 0;
    showQuestion();
})

// Functions
function showQuestion() {
    let contQuest = 0;

    if(questions[currentQuestion]) {
        // Questão atual
        let quest = questions[currentQuestion];

        let pctLoadingQuest = Math.floor((currentQuestion / questions.length) * 100);
        // console.log(pctLoadingQuest, currentQuestion, questions.length);
        document.querySelector('.progress--bar').style.width = `${pctLoadingQuest}%`

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = quest.question;

        let optionsHtml = '';
        for(let opt of quest.options){
            optionsHtml += `<div data-op="${contQuest++}" class="option"><span>${contQuest}</span> ${opt}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml;
        contQuest = 1;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionEventClick);
        })
    } else {
        finishQuiz();
    }
}

function optionEventClick(e){
    const el = e.target;
    let clickOption = parseInt(el.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickOption) {
        answersHits++;
    }
    currentQuestion++;
    showQuestion();
};

function finishQuiz() {
    let pctHits = Math.floor((answersHits / questions.length) * 100);

    if(pctHits <= 30) {
        document.querySelector('.scoreText1').innerHTML = 'A realidade tende a ser decepcionante';
        document.querySelector('.scorePct').style.color = '#f00';
    } else if(pctHits <= 70){
        document.querySelector('.scoreText1').innerHTML = 'Nhéééé... Esperava mais de você!';
        document.querySelector('.scorePct').style.color = '#ffff00';
    } else if(pctHits){
        document.querySelector('.scoreText1').innerHTML = 'Fuerte demás, manito!';
        document.querySelector('.scorePct').style.color = '#0d630d';
    }

    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${answersHits}.`
    document.querySelector('.scorePct').innerHTML = `Acertou ${pctHits}%`;
    
    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = `${100}%`
}