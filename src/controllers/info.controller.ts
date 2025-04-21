import { Request, Response } from "express";

export const getInfoStatus = (_req: Request, res: Response) => {
    res.send("Akıllı Sera API'sine hoş geldiniz, her şey yolunda 🌿");
  };