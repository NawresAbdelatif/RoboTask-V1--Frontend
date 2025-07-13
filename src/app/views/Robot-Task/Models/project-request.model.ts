
export type ProjectStatus = 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED';

export interface ProjectRequest {
    name: string;
    description: string;
    status: ProjectStatus;
    startDate: string;
    endDate: string;

}
