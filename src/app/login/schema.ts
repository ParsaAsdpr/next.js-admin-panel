import { z } from "zod";

const schema = z.object({
    email: z.string().email('لطفا یک ایمیل معتبر وارد کنید.'),
    password: z.string().min(8, 'نام شما باید بیشتر از 3 کاراکتر باشد.'),
})

export default schema;