import { z } from "zod";

const schema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  role: z.string().optional(),
  isActive: z.boolean().optional(),
  createdAt: z.date().optional(),
  lastLogin: z.date().optional(),
})

export default schema