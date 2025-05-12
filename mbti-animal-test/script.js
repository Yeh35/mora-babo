// MBTI 질문과 선택지
const questions = [
    {
        question: "친구들과 함께 있을 때 당신은?",
        options: [
            { text: "여러 사람들과 활발하게 대화한다", type: "E" },
            { text: "소수의 친한 친구들과 깊이 있는 대화를 나눈다", type: "I" }
        ]
    },
    {
        question: "새로운 정보를 받아들일 때 당신은?",
        options: [
            { text: "구체적이고 실제적인 사실에 집중한다", type: "S" },
            { text: "가능성과 의미를 찾아본다", type: "N" }
        ]
    },
    {
        question: "의사결정을 할 때 당신은?",
        options: [
            { text: "논리와 객관적 사실을 중시한다", type: "T" },
            { text: "감정과 가치를 중시한다", type: "F" }
        ]
    },
    {
        question: "일상생활에서 당신은?",
        options: [
            { text: "계획을 세우고 체계적으로 행동한다", type: "J" },
            { text: "상황에 따라 유연하게 대처한다", type: "P" }
        ]
    }
];

let currentQuestion = 0;
let mbtiResult = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
};

// DOM 요소
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const resultImage = document.getElementById('result-image');
const resultDescription = document.getElementById('result-description');
const restartButton = document.getElementById('restart-button');

// 테스트 시작
function startTest() {
    currentQuestion = 0;
    mbtiResult = {
        E: 0, I: 0,
        S: 0, N: 0,
        T: 0, F: 0,
        J: 0, P: 0
    };
    showQuestion();
}

// 질문 표시
function showQuestion() {
    if (currentQuestion < questions.length) {
        const question = questions[currentQuestion];
        questionText.textContent = question.question;
        optionsContainer.innerHTML = '';

        question.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-button';
            button.textContent = option.text;
            button.addEventListener('click', () => selectOption(option.type));
            optionsContainer.appendChild(button);
        });
    } else {
        showResult();
    }
}

// 선택지 처리
function selectOption(type) {
    mbtiResult[type]++;
    currentQuestion++;
    showQuestion();
}

// 결과 표시
async function showResult() {
    const mbtiType = calculateMBTI();
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    try {
        const response = await fetch('results.json');
        const results = await response.json();
        const result = results[mbtiType];

        resultImage.innerHTML = `<img src="${result.image}" alt="${result.animal}">`;
        resultDescription.innerHTML = `
            <h3>${mbtiType} - ${result.animal}</h3>
            <p>${result.description}</p>
        `;
    } catch (error) {
        console.error('결과를 불러오는데 실패했습니다:', error);
    }
}

// MBTI 유형 계산
function calculateMBTI() {
    const type = [
        mbtiResult.E > mbtiResult.I ? 'E' : 'I',
        mbtiResult.S > mbtiResult.N ? 'S' : 'N',
        mbtiResult.T > mbtiResult.F ? 'T' : 'F',
        mbtiResult.J > mbtiResult.P ? 'J' : 'P'
    ].join('');
    return type;
}

// 다시하기 버튼 이벤트
restartButton.addEventListener('click', () => {
    resultContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    startTest();
});

// 테스트 시작
startTest(); 