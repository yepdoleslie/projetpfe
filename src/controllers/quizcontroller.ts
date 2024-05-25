import { Request, Response } from 'express';
import Quiz from '../models/quiz';
import Reponse from '../models/reponse';

// Créer un quiz
export const createQuiz = async (req: Request, res: Response) => {
  try {
    const { title, questions } = req.body;
    const quiz = new Quiz({ title, questions });
    await quiz.save();
    res.status(201).json({ message: 'Quiz created successfully', quiz });
  } catch(error: any){
    res.status(500).json({ message: 'Failed to create quiz', error: error.message });
  }
};

// Obtenir tous les quizzes
export const getQuizzes = async (req: Request, res: Response) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json({ quizzes });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch quizzes', error: error.message });
  }
};

// Obtenir un quiz par ID
export const getQuizById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json({ quiz });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch quiz', error: error.message });
  }
};

// Mettre à jour un quiz
export const updateQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, questions } = req.body;
    const updatedQuiz = await Quiz.findByIdAndUpdate(id, { title, questions }, { new: true });
    if (!updatedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json({ message: 'Quiz updated successfully', quiz: updatedQuiz });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to update quiz', error: error.message });
  }
};

// Supprimer un quiz
export const deleteQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedQuiz = await Quiz.findByIdAndDelete(id);
    if (!deletedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to delete quiz', error: error.message });
  }
};

// Fonction pour évaluer les réponses soumises par l'utilisateur
export const evaluateReponses = async (req: Request, res: Response) => {
    try {
      const quizId = req.params.id; // Récupérer l'ID du quiz depuis les paramètres de la requête
      const reponses = await Reponse.find({ quizId }); // Récupérer toutes les réponses pour ce quiz
      const quiz = await Quiz.findById(quizId); // Récupérer le quiz correspondant
  
      // Vérifier si le quiz et les réponses existent
      if (!quiz || !reponses) {
        return res.status(404).json({ message: 'Quiz or responses not found' });
      }
  
      // Comparer les réponses avec les bonnes réponses du quiz
      let score = 0;
      for (const reponse of reponses) {
        const question = quiz.questions.find((q) => q.toString() === reponse.questionId.toString());
        if (question && (question as any).correctAnswer === reponse.selectedAnswer) {
          score++;
        }
      }
  
      res.status(200).json({ score });
    } catch(error: any) {
      res.status(500).json({ message: 'Failed to evaluate responses', error: error.message });
    }
  };
