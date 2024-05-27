import { z } from "zod";

const schema = z.object({
  name: z.string().min(3, "نام نقش باید بیشتر از 3 کاراکتر باشد.").optional(),
  slug: z
    .string()
    .min(3, "شناسه نقش باید بیشتر از 3 کاراکتر باشد.")
    .refine(
      (value) => /^[a-zA-Z]+$/.test(value ?? ""),
      "شناسه نقش باید با حروف لاتین باشد"
    )
    .optional(),
});

export default schema;
