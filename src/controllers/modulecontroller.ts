import { Request, Response } from 'express';
import Module, { IModule } from '../models/module';
import Formation from '../models/formation';

// Créer un nouveau module
export const createModule = async (req: Request, res: Response): Promise<void> => {
    try {
        const { titre, description, contenu, formationId } = req.body;

        // Vérifier si la formation existe
        const formation = await Formation.findById(formationId);
        if (!formation) {
            res.status(404).json({ message: 'Formation not found' });
            return;
        }

        const module: IModule = new Module({ titre, description, contenu, formation: formationId });
        const savedModule: IModule = await module.save();

        // Ajouter le module à la formation
        formation.modules.push(savedModule._id);
        await formation.save();

        res.status(201).json(savedModule);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Obtenir tous les modules
export const getAllModules = async (req: Request, res: Response): Promise<void> => {
    try {
        const modules: IModule[] = await Module.find().populate('formation');
        res.status(200).json(modules);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Obtenir un module par ID
export const getModuleById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const module: IModule | null = await Module.findById(id).populate('formation');
        if (!module) {
            res.status(404).json({ message: 'Module not found' });
            return;
        }
        res.status(200).json(module);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Mettre à jour un module
export const updateModule = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const updatedModule: IModule | null = await Module.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        if (!updatedModule) {
            res.status(404).json({ message: 'Module not found' });
            return;
        }
        res.status(200).json(updatedModule);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Supprimer un module
export const deleteModule = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const deletedModule: IModule | null = await Module.findByIdAndDelete(id);
        if (!deletedModule) {
            res.status(404).json({ message: 'Module not found' });
            return;
        }

        // Supprimer le module de la formation associée
        await Formation.findByIdAndUpdate(deletedModule.formation, { $pull: { modules: deletedModule._id } });

        res.status(200).json({ message: 'Module deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
