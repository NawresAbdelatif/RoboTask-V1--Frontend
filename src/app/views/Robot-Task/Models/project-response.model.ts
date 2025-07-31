export type ProjectStatus = 'BROUILLON' | 'COMPLETE' | 'ARCHIVE';
export interface Collaborator {
    username: string;
    email: string;
    roles: string[];
}
export interface ProjectResponse {
    id: number;
    reference: string;
    name: string;
    description: string;
    status: ProjectStatus;
    startDate: string;
    // endDate: string;
    creatorUsername: string;
    collaboratorsUsernames: string[];
    creator?: { username: string }
    archived: boolean;
    collaborators: Collaborator[];

}
