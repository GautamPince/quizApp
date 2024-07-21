const startBtn = document.querySelector(".start-btn");
const popupInfo = document.querySelector(".popup-info");
const exitBtn = document.querySelector(".exit-btn");
const main = document.querySelector(".main");
const continueBtn = document.querySelector(".continue-btn");
const quizSection = document.querySelector(".quiz-section");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const tryAgainBtn = document.querySelector(".tryAgain-btn");
const goHome = document.querySelector(".goHome-btn");


startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}
goHome.onclick = () => {
    quizSection.classList.remove('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');

    questionCount = 0;

    questionNumber = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumber);

}
tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');

    questionCount = 0;

    questionNumber = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumber);

    headerScore();
}
let questionCount = 0;
let questionNumber = 1;
let userScore = 0;

continueBtn.onclick = () => {
    quizSection.classList.add('active')
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add("active");

    showQuestions(0);
    questionCounter(1);
    headerScore();
}


// for next btn 
const nextBtn = document.querySelector(".next-btn");

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);

        questionNumber++;
        questionCounter(questionNumber);
        nextBtn.classList.remove('active');
    }
    else {
        console.log("question completed");
        showResultBox();
    }
}

//for displaying option list
const optionList = document.querySelector(".option-list");



// getting question and option from an array
function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = ` ${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div> 
    <div class="option"><span>${questions[index].options[1]}</span></div> 
    <div class="option"><span>${questions[index].options[2]}</span></div> 
    <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}
// function optionSelected(answer) {
//     let userAnswer = answer.textContent;
//     let correctAnswer = questions[questionCount].answer;
//     let allOptions = optionList.children.length;

//     if (userAnswer == correctAnswer) {
//         answer.classList.add('correct')
//         userScore += 1;
//         headerScore();
//     }
//     else {
//         // console.log("Answer is incorrect");
//         answer.classList.add('incorrect')

//         // if answewr incorrect, auto selected correct answer

//         for (let i = 0; i < allOptions; i++) {
//             if (optionList.children[i].textContent == correctAnswer) {
//                 optionList.children[i].setAttribute('class', 'option correct')
//             }

//         }

//     }
//     // if user has selected, disabled all options
//     for (let i = 0; i < allOptions; i++) {
//         optionList.children[i].classList.add('disabled');
//     }

//     nextBtn.classList.add('active');
// }



// increasingin footer question counter

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    if (userAnswer == correctAnswer) {
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    } else {
        answer.classList.add('incorrect');
        userScore -= 0.25; // Deduct 1/4 point for a wrong answer
        headerScore();

        // Automatically select the correct answer if the user's answer is incorrect
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute('class', 'option correct');
            }
        }
    }

    // Disable all options after the user has selected an answer
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');
}


function questionCounter(index) {
    const questionTotal = document.querySelector(".question-total");
    questionTotal.textContent = `${index} of ${questions.length} questions`;
}

// counting the score that you perform
function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}
function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const resultScoreText = document.querySelector('.score-text');
    resultScoreText.textContent = `Your Score: ${userScore} out of ${questions.length}`;

    // it return calculated value like static///////////////
    // const resultPercentage = document.querySelector('.progress-value');
    // resultPercentage.textContent = `${(userScore * 100) / questions.length}%`


    const progressValue = document.querySelector('.progress-value');
    const circularProgress = document.querySelector('.circuler-progress');
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;
        console.log(progressStartValue);

        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255,255,255,.1) 0deg)`;

        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }
    }, speed)
}
