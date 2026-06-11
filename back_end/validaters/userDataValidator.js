import {z} from "zod";

// REGISTER DATA HANDLER
  const regesterUser = z.object({
    username: z.string().min(8,'It should be consists of minimum 8 character !').max(20,"Maximum it should contain 20 characters !"),
    email:z.string().email(),
    password:z.string().min(8,"Minimum 8 characters One upper case,lowercase and number is must !").regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/),

  });

  // LOGIN DATA HANDLER
  const loginData = z.object({
    email:z.string().email(),
    password:z.string().min(8,"Minimum 8 characters One upper case,lowercase and number is must !").regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/)
  })

  export {loginData,regesterUser}