import { Router } from 'express';
import * as FormationController from '../controllers/formationcontroller';

const formationRouter = Router();

// Route pour créer une formation
formationRouter.post('/', FormationController.createFormation);

// Route pour obtenir toutes les formations
formationRouter.get('/', FormationController.getAllFormations);

// Route pour obtenir une formation par ID
formationRouter.get('/:id', FormationController.getFormationById);

// Route pour mettre à jour une formation
formationRouter.put('/:id', FormationController.updateFormation);

// Route pour supprimer une formation
formationRouter.delete('/:id', FormationController.deleteFormation);

export default formationRouter;
