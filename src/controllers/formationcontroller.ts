import { Request, Response } from 'express';
import Formation, { IFormation } from '../models/formation';
import Module, {IModule} from '../models/module';

// Création d'une formation
export const createFormation = async (req: Request, res: Response): Promise<void> => {
    try {
        const formation: IFormation = new Formation(req.body);
        const savedFormation: IFormation = await formation.save();
        res.status(201).json(savedFormation);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Obtenir toutes les formations
export const getAllFormations = async (req: Request, res: Response): Promise<void> => {
    try {
        const formations: IFormation[] = await Formation.find();
        res.status(200).json(formations);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Obtenir une formation par ID avec les modules complets
export const getFormationById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const formation: IFormation | null = await Formation.findById(id);
        if (!formation) {
            res.status(404).json({ message: 'Formation not found' });
            return;
        }
        res.status(200).json(formation);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Mettre à jour une formation
export const updateFormation = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const updatedFormation: IFormation | null = await Formation.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        if (!updatedFormation) {
            res.status(404).json({ message: 'Formation not found' });
            return;
        }
        res.status(200).json(updatedFormation);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Supprimer une formation
export const deleteFormation = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const deletedFormation: IFormation | null = await Formation.findByIdAndDelete(id);
        if (!deletedFormation) {
            res.status(404).json({ message: 'Formation not found' });
            return;
        }
        res.status(200).json({ message: 'Formation deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
