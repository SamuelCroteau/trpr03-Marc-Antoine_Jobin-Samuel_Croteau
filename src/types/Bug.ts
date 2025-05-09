export interface Bug {
    userId: number;
    title: string;
    description: string;
    stepsToReproduce: string;
    priority: string;
    category: string;
    visibility: string;
}