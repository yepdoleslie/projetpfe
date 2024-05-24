import mongoose, { Schema, Document } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import Module from './module'; // Importez le modèle Module avant d'utiliser

// Définition de l'interface pour la table Formation
export interface IFormation extends Document {
    titre: string;
    description: string;
    categorie: string;
    modules: Array<Schema.Types.ObjectId>; // Tableau d'identifiants de modules associés
    duree: number;
    niveau: string;
    prix: number;
    evaluationMoyenne: number;
    participants: Array<Schema.Types.ObjectId>; // Tableau d'identifiants des participants
    availableSeats: number;
}

// Schéma de la table Formation
const FormationSchema: Schema = new Schema(
    {
        titre: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        categorie: {
            type: String,
            required: true,
            trim: true,
        },
        modules: [{
            type: Schema.Types.ObjectId,
            ref: 'Module',
            autopopulate: true // Activation de l'auto-population
        }],
        niveau: {
            type: String,
            required: true,
            enum: ['Débutant', 'Intermédiaire', 'Avancé'],
        },
        prix: {
            type: Number,
            required: true,
        },
        evaluationMoyenne: {
            type: Number,
            default: 0, // Valeur par défaut pour l'évaluation moyenne
        },
        participants: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Référence aux participants
    },
    {
        timestamps: true,
    }
);

FormationSchema.plugin(autopopulate); // Ajout du plugin au schéma

// Création du modèle Formation à partir du schéma
const Formation = mongoose.model<IFormation>('Formation', FormationSchema);

export default Formation;

