import mongoose, { Schema, Document } from "mongoose";

// Définition de l'interface pour la table Module
export interface IModule extends Document {
    titre: string;
    description: string;
    contenu: string;
    formation: Schema.Types.ObjectId; // Référence à la formation associée
}

// Schéma de la table Module
const ModuleSchema: Schema = new Schema(
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
        contenu: {
            type: String,
            required: true,
        },
        formation: { type: Schema.Types.ObjectId, ref: "Formation" }, // Référence à la formation associée
    },
    {
        timestamps: true,
    }
);

// Création du modèle Module à partir du schéma
const Module = mongoose.model<IModule>("Module", ModuleSchema);

export default Module;
