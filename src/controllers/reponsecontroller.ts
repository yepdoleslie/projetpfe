import { Request, Response } from 'express';
import Reponse from '../models/reponse';

// GET - Récupérer toutes les réponses
export const getReponses = async (req: Request, res: Response) => {
  try {
    const reponses = await Reponse.find();
    res.status(200).json({ reponses });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch reponses', error: error.message });
  }
};

// GET - Récupérer une réponse par ID
export const getReponseById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const reponse = await Reponse.findById(id);
    if (!reponse) {
      return res.status(404).json({ message: 'Reponse not found' });
    }
    res.status(200).json({ reponse });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch reponse', error: error.message });
  }
};

// POST - Créer une nouvelle réponse
export const createReponse = async (req: Request, res: Response) => {
  const { questionId, selectedAnswer } = req.body;
  try {
    const reponse = new Reponse({ questionId, selectedAnswer });
    await reponse.save();
    res.status(201).json({ message: 'Reponse created successfully', reponse });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to create reponse', error: error.message });
  }
};

// PUT - Mettre à jour une réponse existante
export const updateReponse = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { questionId, selectedAnswer } = req.body;
  try {
    const reponse = await Reponse.findByIdAndUpdate(id, { questionId, selectedAnswer }, { new: true });
    if (!reponse) {
      return res.status(404).json({ message: 'Reponse not found' });
    }
    res.status(200).json({ message: 'Reponse updated successfully', reponse });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to update reponse', error: error.message });
  }
};

// DELETE - Supprimer une réponse existante
export const deleteReponse = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const reponse = await Reponse.findByIdAndDelete(id);
    if (!reponse) {
      return res.status(404).json({ message: 'Reponse not found' });
    }
    res.status(200).json({ message: 'Reponse deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to delete reponse', error: error.message });
  }
};

export default { getReponses, getReponseById, createReponse, updateReponse, deleteReponse };
