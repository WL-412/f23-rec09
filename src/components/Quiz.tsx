import React, { Component, useState, useEffect, useRef } from 'react'
import './Quiz.css'
import QuizQuestion from '../core/QuizQuestion';
import QuizCore from '../core/QuizCore';

// interface QuizState {
//   questions: QuizQuestion[]
//   currentQuestionIndex: number
//   selectedAnswer: string | null
//   score: number
// }

// const Quiz: React.FC = () => {
//   const initialQuestions: QuizQuestion[] = [
//     {
//       question: 'What is the capital of France?',
//       options: ['London', 'Berlin', 'Paris', 'Madrid'],
//       correctAnswer: 'Paris',
//     },
//   ];
//   const [state, setState] = useState<QuizState>({
//     questions: initialQuestions,
//     currentQuestionIndex: 0,  // Initialize the current question index.
//     selectedAnswer: null,  // Initialize the selected answer.
//     score: 0,  // Initialize the score.
//   });

//   const handleOptionSelect = (option: string): void => {
//     setState((prevState) => ({ ...prevState, selectedAnswer: option }));
//   }


//   const handleButtonClick = (): void => {
//     // Task3: Implement the logic for button click, such as moving to the next question.
//   } 

//   const { questions, currentQuestionIndex, selectedAnswer, score } = state;
//   const currentQuestion = questions[currentQuestionIndex];

const Quiz: React.FC = () => {
  const quizCore = useRef(new QuizCore()).current;

  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(quizCore.getCurrentQuestion());
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);

  useEffect(() => {
    setScore(quizCore.getScore());
  }, [currentQuestion]);

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option);
    quizCore.answerQuestion(option);
  }

  const handleButtonClick = (): void => {
    if (quizCore.hasNextQuestion()) {
      quizCore.nextQuestion();
      setSelectedAnswer(null);
      setCurrentQuestion(quizCore.getCurrentQuestion());
    } else {
      setShowScore(true);
    }
  } 

  if (showScore) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {score} out of {quizCore.getScore()}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion?.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion?.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      {
        quizCore.hasNextQuestion() ? 
        <button onClick={handleButtonClick}>Next Question</button> :
        <button onClick={handleButtonClick}>Submit</button>
      }
    </div>
  );
};

export default Quiz;