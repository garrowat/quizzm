const quizzes = {
  0: {
    question: 'To display something in the browser console: console."___"',
    answers: ['log', 'table'],
  },
};

const getRandomQuizQuestion = () => {
  const quizKeys = Object.keys(quizzes);
  const id = Math.floor(Math.random() * quizKeys.length)
  const quiz = quizzes[id];
  const { question } = quiz;
  return { id, question };
};

const getQuizAnswer = (id) => {
  return quizzes[id].answer;
};

module.exports = { getRandomQuizQuestion, getQuizAnswer };
