import {z} from "zod";
// VALIDATION FOR REGISTER
const registerSchema = z.object({
    username:z.string()
    .min(8,"Username must be at least 8 characters"),
    email:z.string()
    .email(),
    password:z.string()
    .min(8,"Password must be at least 8 characters oncluding upperCase,lowerCase and Number!")
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/),
     profileImage: z.any().optional()
});

// VALIDATION FOR LOOGIN
 const loginSchema = z.object({
    email:z.string().email(),
    password:z.string().min(8,"Password must be at least 8 characters oncluding upperCase,lowerCase and Number!").regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/)
  })

export { registerSchema ,loginSchema }