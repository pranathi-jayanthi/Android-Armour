export const Progress = {
    PENDING: "PENDING",
    IN_PROGRESS: "IN_PROGRESS",
    COMPLETED: "COMPLETED"
} as const;
export type Progress = (typeof Progress)[keyof typeof Progress];
