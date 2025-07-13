export type ProjectStatus = 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED';

export interface ProjectResponse {
    id: number;
    name: string;
    description: string;
    status: ProjectStatus;
    startDate: string;
    endDate: string;
    creatorUsername: string;
    collaboratorsUsernames: string[];
    creator?: { username: string }
}
