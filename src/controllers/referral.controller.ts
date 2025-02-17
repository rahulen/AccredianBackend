import { Request, Response } from "express";
import { errorHandler } from "../utils/error";

export const createReferral = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    // Check if email already exists
    const existingReferral = await Referral.findOne({ email });
    if (existingReferral) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // Create new referral
    const newReferral = new Referral(req.body);
    await newReferral.save();
    res.status(201).json(newReferral);
  } catch (error) {
    errorHandler(error, req, res);
  }
};
