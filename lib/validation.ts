import { z } from "zod";

export const formSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(5).max(500),
    writername: z.string().min(3),
    bookname: z.string().min(3),
    body: z.string().min(10),
})