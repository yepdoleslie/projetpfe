import express from 'express';
import {
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from '../controllers/questioncontroller';

const questionRouter = express.Router();

// GET - Récupérer toutes les questions
questionRouter.get('/', getQuestions);

// GET - Récupérer une question par ID
questionRouter.get('/:id', getQuestionById);

// POST - Créer une nouvelle question
questionRouter.post('/', createQuestion);

// PUT - Mettre à jour une question existante
questionRouter.put('/:id', updateQuestion);

// DELETE - Supprimer une question existante
questionRouter.delete('/:id', deleteQuestion);

export default questionRouter;