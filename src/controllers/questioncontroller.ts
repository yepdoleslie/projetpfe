import { Request, Response } from 'express';
import Question from '../models/question';

// GET - Récupérer toutes les questions
export const getQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await Question.find();
    res.status(200).json({ questions });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch questions', error: error.message });
  }
};

// GET - Récupérer une question par ID
export const getQuestionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json({ question });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch question', error: error.message });
  }
};

// POST - Créer une nouvelle question
export const createQuestion = async (req: Request, res: Response) => {
  const { title, options, correctAnswer } = req.body;
  try {
    const question = new Question({ title, options, correctAnswer });
    await question.save();
    res.status(201).json({ message: 'Question created successfully', question });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to create question', error: error.message });
  }
};

// PUT - Mettre à jour une question existante
export const updateQuestion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, options, correctAnswer } = req.body;
  try {
    const question = await Question.findByIdAndUpdate(id, { title, options, correctAnswer }, { new: true });
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json({ message: 'Question updated successfully', question });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to update question', error: error.message });
  }
};

// DELETE - Supprimer une question existante
export const deleteQuestion = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const question = await Question.findByIdAndDelete(id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to delete question', error: error.message });
  }
};

export default { getQuestions, getQuestionById, createQuestion, updateQuestion, deleteQuestion };
