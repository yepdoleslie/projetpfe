import express from 'express';
import {
  getReponses,
  getReponseById,
  createReponse,
  updateReponse,
  deleteReponse,
} from '../controllers/reponsecontroller';

const reponseRouter = express.Router();

// GET - Récupérer toutes les réponses
reponseRouter.get('/', getReponses);

// GET - Récupérer une réponse par ID
reponseRouter.get('/:id', getReponseById);

// POST - Créer une nouvelle réponse
reponseRouter.post('/', createReponse);

// PUT - Mettre à jour une réponse existante
reponseRouter.put('/:id', updateReponse);

// DELETE - Supprimer une réponse existante
reponseRouter.delete('/:id', deleteReponse);

export default reponseRouter;