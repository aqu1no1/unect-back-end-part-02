import { Response, Request } from "express";
import { Pet } from "../schema/Pet.schema";
import { getToken } from "../utils/get-token";
import { getUserByToken } from "../utils/get-user-by-token";
import { Types } from "mongoose";
import { RequestUser } from "../types/requestUserId";

export const create = async (req: Request, res: Response) => {
  const { name, age, weight, color } = req.body;
  const available = true;

  if (!name) {
    res.status(422).json({ message: "Name is required!" });
    return;
  }

  if (!age) {
    res.status(422).json({ message: "Age is required!" });
    return;
  }

  if (!weight) {
    res.status(422).json({ message: "Weight is required!" });
    return;
  }

  if (!color) {
    res.status(422).json({ message: "Color is required!" });
    return;
  }

  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: "Token undefined or invalid!" });
  }

  const user = await getUserByToken(token);

  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  const pet = new Pet({
    name: name,
    age: age,
    color: color,
    weight: weight,
    available: available,
    user: user._id,
  });

  try {
    const newPet = await pet.save();
    await newPet.populate("user", "_id name phone");
    res.status(200).json({
      message: "Pet create was right",
      newPet,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error to create a pet in the system" });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const pets = await Pet.find();
    res.status(200).json({ message: "This all the pets in our system", pets });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error to get all a pet in the system" });
  }
};

export const getById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const pet = await Pet.findById(id);

    if (!pet) {
      res.status(404).json({ message: "Pet does noit exists" });
      return;
    }

    res.status(200).json({ message: "This is the pet get by id", pet });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error to get pet by id in the system" });
  }
};

export const getAllPetsUser = async (req: Request, res: Response) => {
  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: "Token undefined or invalid!" });
  }

  const user = await getUserByToken(token);

  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  try {
    const getAllPets = await Pet.find({ user: user._id }).sort("-createdAt");
    res.status(200).json({
      getAllPets,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error to get all pets for user in the system" });
  }
};

export const getAllUserAdoptions = async (req: Request, res: Response) => {
  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: "Token undefined or invalid!" });
  }

  const user = await getUserByToken(token);

  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  try {
    const getAllPets = await Pet.find({ adopter: user._id });
    res.status(200).json({
      getAllPets,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error to get all user adoptions in the system" });
  }
};

export const updatePet = async (req: Request, res: Response) => {
  const { name, age, weight, color, available } = req.body;
  const pet = await Pet.findById({ _id: req.params.id });

  if (!pet) {
    res.status(404).json({ message: "This pet was not found" });
    return;
  }

  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: "Token undefined or invalid!" });
  }

  const user = await getUserByToken(token);

  if (!user) {
    res.status(404).json({ message: "This user was not found" });
    return;
  }

  if (pet.user._id.toString() != user._id.toString()) {
    res.status(404).json({
      message: "Something happend with the request",
    });
    return;
  }

  if (!name) {
    res.status(422).json({ message: "Name is required!" });
    return;
  }

  pet.name = name;

  if (!age) {
    res.status(422).json({ message: "Age is required!" });
    return;
  }

  pet!.age = age;

  if (!weight) {
    res.status(422).json({ message: "Weight is required!" });
    return;
  }

  pet!.weight = weight;

  if (!color) {
    res.status(422).json({ message: "Color is required!" });
    return;
  }

  pet!.color = color;

  if (!available) {
    res.status(422).json({ message: "available is required!" });
    return;
  } else {
    pet.available = available;
  }

  try {
    await Pet.findByIdAndUpdate(
      {
        _id: pet._id,
      },
      { $set: pet },
      { new: true }
    );

    res.status(200).json({ message: "The pet was update with sucess" });
  } catch (error) {
    res.status(500).json({ message: error });
    return;
  }
};

export const deletePet = async (req: Request, res: Response) => {
  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: "Token undefined or invalid!" });
  }

  const user = await getUserByToken(token);

  if (!user) {
    res.status(404).json({ message: "This user was not found" });
    return;
  }

  const pet = req.params.id;

  try {
    await Pet.findByIdAndDelete(pet);

    res.status(200).json({ message: "This pet was deleted with sucess" });
  } catch (error) {
    res.status(404).json({ message: "Error to delete this pet" });
    return;
  }
};

export const schedule = async (req: RequestUser, res: Response) => {
  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: "Token undefined or invalid!" });
  }

  const user = await getUserByToken(token);

  if (!user) {
    return res.status(404).json({ message: "This user was not found" });
  }

  const id = req.params.id;

  const pet = await Pet.findById(id).populate("user").populate("adopter");

  if (!pet) {
    return res.status(404).json({ message: "This pet was not found" });
  }

  if (pet.user._id.equals(user._id)) {
    return res.status(422).json({
      message: "You can't schedule a visit for your own pet!",
    });
  }

  if (pet.adopter && pet.adopter._id.equals(user._id)) {
    return res.status(422).json({
      message: "You already scheduled a visit for this pet!",
    });
  }

  pet.adopter = user._id;

  try {
    await Pet.findByIdAndUpdate(pet._id, pet);

    return res.status(200).json({
      message: `Visit scheduled successfully!`,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error scheduling visit" });
  }
};

export const conclude = async (req: RequestUser, res: Response) => {
  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: "Token undefined or invalid!" });
  }

  const user = await getUserByToken(token);

  if (!user) {
    return res.status(404).json({ message: "This user was not found" });
  }

  const id = req.params.id;

  const pet = await Pet.findById(id).populate("user").populate("adopter");

  if (!pet) {
    return res.status(404).json({ message: "This pet was not found" });
  }

  if (!pet.user._id.equals(user._id)) {
    return res.status(403).json({
      message: "Only the pet owner can conclude the adoption",
    });
  }

  if (!pet.adopter) {
    return res.status(422).json({
      message: "You can not conclude because no one scheduled a visit",
    });
  }

  pet.available = false;

  try {
    await Pet.findByIdAndUpdate(pet._id, pet);

    return res.status(200).json({
      pet,
      message: "The adoption process has been successfully concluded!",
    });
  } catch (error) {
    return res.status(500).json({ message: "Error concluding adoption" });
  }
};
