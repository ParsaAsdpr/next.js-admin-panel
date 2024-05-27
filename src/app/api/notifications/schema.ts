import { z } from "zod";

const userSchema = z.object({
    label: z.string(),
    value: z.string(),
  })
  
export default z.object({
    body: z.string().min(10, "متن اعلان باید بیشتر از 10 کاراکتر باشد."),
    allUsers: z.boolean(),
    receivers: z.array(userSchema)
}).refine((data) => {
    if (data.allUsers) {
      return true;
    }
    return data.receivers.length > 0;
  }, {
    message: "حداقل یک کاربر انتخاب کنید",
    path: ["receivers"],
  });