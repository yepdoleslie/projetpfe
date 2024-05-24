import { Router } from 'express';
import * as ModuleController from '../controllers/modulecontroller';

const moduleRouter = Router();

// Route pour créer un module
moduleRouter.post('/', ModuleController.createModule);

// Route pour obtenir tous les modules
moduleRouter.get('/', ModuleController.getAllModules);

// Route pour obtenir un module par ID
moduleRouter.get('/:id', ModuleController.getModuleById);

// Route pour mettre à jour un module
moduleRouter.put('/:id', ModuleController.updateModule);

// Route pour supprimer un module
moduleRouter.delete('/:id', ModuleController.deleteModule);

export default moduleRouter;
