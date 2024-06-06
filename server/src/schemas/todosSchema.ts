import { z } from 'zod';

const TODO_STATUS = ['ACTIVE', 'COMPLETED'] as const;

export const createToDoSchema = z.object({
    title: z.string(),
    body: z.string(),
    status: z.enum(TODO_STATUS),
    userId: z.string(),
})

export const updateToDoSchema = z.object({
    title: z.string().optional(),
    body: z.string().optional(),
    status: z.enum(TODO_STATUS).optional(),
    userId: z.string().optional(),
})

