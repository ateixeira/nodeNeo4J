import { Request, Response } from 'express';
import axios from 'axios';

function fetchApi(endpoint: string) {
  return axios.get(endpoint);
}

/**
 * Home page.
 * @route GET /
 */
export const index = async (req: Request, res: Response) => {
  await fetchApi('http://localhost:3009/api/tree').then((data) => {
    res.render('home', {
      title: 'Home'
    });
  });
};
