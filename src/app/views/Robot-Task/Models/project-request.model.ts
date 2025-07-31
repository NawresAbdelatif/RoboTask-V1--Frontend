
export type ProjectStatus = 'BROUILLON' | 'COMPLETE' | 'ARCHIVE';

export interface ProjectRequest {
    reference: string;
    name: string;
    description: string;
    status: ProjectStatus;
    startDate: string;
    // endDate: string;

}
