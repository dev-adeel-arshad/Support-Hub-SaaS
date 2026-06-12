
import {z} from "zod"

const ticketDataValidator = z.object({
    title:z.string().max(30,"Maximim 30 characters !"),
    description:z.string().max(90,"Max 90 characters"),
})

export {ticketDataValidator}