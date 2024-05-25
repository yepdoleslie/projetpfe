import express from 'express';
import {
  getQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} from '../controllers/quizcontroller';
import { evaluateReponses } from '../controllers/quizcontroller';

const quizRouter = express.Router();

// GET - Récupérer tous les quizzes
quizRouter.get('/', getQuizzes);

// GET - Récupérer un quiz par ID
quizRouter.get('/:id', getQuizById);

// POST - Créer un nouveau quiz
quizRouter.post('/', createQuiz);

// PUT - Mettre à jour un quiz existant
quizRouter.put('/:id', updateQuiz);

// DELETE - Supprimer un quiz existant
quizRouter.delete('/:id', deleteQuiz);

// POST - Évaluer les réponses pour un quiz donné
quizRouter.post('/:id/evaluate', evaluateReponses);

export default quizRouter;
