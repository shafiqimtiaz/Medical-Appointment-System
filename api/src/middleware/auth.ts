import { Request, Response, NextFunction } from 'express';
import { jwt } from '../util/jwt';

export interface CustomRequest extends Request {
  token: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    res.status(401);
    return res.json("Unauthorized!!! Please provide valid credentials.");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if(payload){
      (req as CustomRequest).token = payload;
    }
    
  } catch (err) {
    res.status(401);
    return res.json("Unauthorized!!! Please provide valid access token.")
  }

  return next();
}