import { Request, Response, NextFunction } from "express";
import { jwt } from "../util/jwt";
import * as userService from "../service/user.service";

export interface CustomRequest extends Request {
  token: string;
  role: string;
  user_id: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    res.status(401);
    return res.json("Invalid token");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (payload) {
      (req as CustomRequest).token = payload;
      (req as CustomRequest).role = payload.role;
      (req as CustomRequest).user_id = payload.user_id;
    }
  } catch (err) {
    res.status(401);
    return res.json("Please provide valid credentials");
  }

  return next();
}

export const authorizeRoles = (...authorizedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if ("token" in req) {
      const { role } = req as CustomRequest;
      if (authorizedRoles.includes(role)) {
        return next();
      }
    }
    return res.json("Unauthorized");
  };
};

export const authorizeTypes = (...authorizedTypes: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if ("token" in req) {
      const { user_id } = req as CustomRequest;
      const staff_type = userService.returnStaffType(+user_id);
      if (authorizedTypes.includes(await staff_type)) {
        return next();
      }
    }
    return res.json("Unauthorized");
  };
};
