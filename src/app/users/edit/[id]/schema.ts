import { z } from "zod";

const schema = z.object({
    name: z.string().min(3, 'نام شما باید بیشتر از 3 کاراکتر باشد.'),
    email: z.string().email('لطفا یک ایمیل معتبر وارد کنید.'),
    role: z.string().optional(),
    isActive: z.boolean().optional(),
})

export default schema;