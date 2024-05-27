import { z } from "zod";

const schema = z.object({
    name: z.string().min(3, 'نام شما باید بیشتر از 3 کاراکتر باشد.'),
    email: z.string().email('لطفا یک ایمیل معتبر وارد کنید.'),
    password: z.string().min(8, 'گذرواژه شما باید بیشتر از 8 کاراکتر باشد.'),
    confirmPassword: z.string().min(8, 'گذرواژه شما باید بیشتر از 8 کاراکتر باشد.'),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "گذرواژه های شما با هم مطابقت ندارد.",
        path: ['confirmPassword'],
      });
    }
  });

export default schema;