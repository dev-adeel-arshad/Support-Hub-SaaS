
import fs from "fs";

export const validate = (schema) => {

    return (req, res, next) => {

        const result = schema.safeParse(req.body);

        if (!result.success) {
  

      if (req.file?.path) {
        fs.unlinkSync(req.file.path);
      }
            return res.status(400).json({
                success: false,
                errors: result.error.issues
            });
        }

        req.body = result.data;

        next();
    };
};