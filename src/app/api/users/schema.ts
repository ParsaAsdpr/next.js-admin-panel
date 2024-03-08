import {z} from 'zod'

const userSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.string().optional(),
    isActive: z.boolean().optional(),
    createdAt: z.date().optional(),
    lastLogin: z.date().optional(),
})

export default userSchema;