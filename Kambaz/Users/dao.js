// import db from "../Database/index.js";
// import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
// let { users } = db;
// export const createUser = async (user) => {
//     return await model.create(user);
// };
export const createUser = (user) => {
    return model.create(user);
};
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) => model.findOne({ username: username });
// export const findUserByCredentials = (username, password) => model.findOne({ username, password });
export const findUserByCredentials = (username, password) => {
    // console.log(`Searching for user with username: "${username}" and password: "${password}"`);
    // const findAllUsers = () => model.find({});
    // console.log(findAllUsers());
    return model.findOne({ username, password });
}
export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
export const findUsersByRole = (role) => model.find({ role: role });
export const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
    return model.find({
        $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
    });
};

