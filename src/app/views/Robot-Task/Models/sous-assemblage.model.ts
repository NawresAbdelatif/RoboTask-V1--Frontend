export type StatutSousAssemblage = 'NON_DEMARRE' | 'EN_COURS' | 'TERMINE';

export interface SousAssemblage {
    id?: number;
    nom: string;
    description?: string;
    ordre?: number;
    dateCreation?: string;
    statut?: StatutSousAssemblage;
    createurUsername?: string;
    createurId?: number;
    assemblageId?: number;
}

