import {rateLimit} from "express-rate-limit"

export const createRateLimit = ({
    windowMs = 15 *60 * 1000,
    limit = 10,
    message = "Too many attempts ! Try again later "
}={})=>{

    return rateLimit({
        windowMs,
        limit,
        message,
        standardHeaders: "draft-8",
        legacyHeaders: false,
        ipv6Subnet: 56,
        handler: (req, res) => {
         res.status(429).json({
        success: false,
        message,
      });
        }
    })

}