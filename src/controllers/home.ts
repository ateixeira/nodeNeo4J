import { Request, Response } from 'express';

/**
 * Home page.
 * @route GET /
 */
export const index = async (req: Request, res: Response) => {
  res.render('home', {
    title: 'Home'
  });
};
