import { z } from 'zod';

export const InformationSchema = z.object({
    name: z.string().min(1).max(255).nullable(),
    fullname: z.string().min(1).max(255).nullable(),
    email: z.string().min(1).max(255).email().nullable(),
    jobTitle: z.string().min(1).max(255).nullable(),
    birthDate: z.string().datetime().nullable(),
    location: z.string().min(1).max(255).nullable(),
    phone: z.string().min(1).max(16).nullable(),
    telegramID: z.string().min(1).max(255).nullable(),
    GithubID: z.string().min(1).max(255).nullable(),
    InstagramID: z.string().min(1).max(255).nullable(),
    WhatsApp: z.string().min(1).max(255).nullable(),
});
