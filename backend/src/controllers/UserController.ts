import { body, validationResult } from "express-validator";
import { compare, genSalt, hash } from 'bcrypt';
import { randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { Request, Response } from "express";
const { sendVerificationMail } = require("../mail/sendVerificationMail");


const userRepository = AppDataSource.getRepository(User);

export const register = async (req: Request, res: Response) => {


    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    try {
        const emailTokenBefore = randomBytes(64).toString("hex");

        const user = new User();

        user.Nickname = req.body.Nickname;
        user.email = req.body.email;
        user.password = hashedPassword;
        user.emailToken = emailTokenBefore;
        user.isVerified = false;
        user.isAdmin = false;

        await userRepository.save(user)

        sendVerificationMail(user);



        return res.status(200).json({
            success: true,

        })
    }
    catch (error: any) {
        console.log(error)

        return res.status(500).json({
            message: "Something went wrong... Try again later.",
            detail: error.detail
        });

    }
};

export const verifyEmail = async (req: Request, res: Response) => {
    try {
        const emailTokenBefore = req.query.emailToken;
        if (!emailTokenBefore) return res.status(400).json("EmailToken not found!");


        let user = await userRepository.findOneBy({
            emailToken: emailTokenBefore as string,
        })

        if (user) {
            user.isVerified = true;
            user.emailToken = "";

            await userRepository.save(user);

            const token = jwt.sign({
                id: user.id
            }, process.env.SECRET_KEY as string,
                {
                    expiresIn: "30d"
                })

            const userData = {
                id: user.id,
                Nickname: user.Nickname,
                email: user.email,
                isVerified: user.isVerified,
                isAdmin: user.isAdmin,
                token: token
            }

            return res.status(200).json({ success: true, ...userData });
        }
        else {
            return res.status(404).json({ success: false, message: "Invalid email token!" });
        }
    }
    catch (err: any) {
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong... Try again later.",
            detail: err.detail
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, ...errors });
        }

        const email = req.body.email;
        const Password = req.body.password;
        let user = await userRepository.findOneBy({
            email
        });
        if (!user) {
            return res.status(400).json({ success: false, message: "Email or password is wrong." })
        }

        const isValidPassword = await compare(Password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ success: false, message: "Email or password is wrong." })
        }

        const token = jwt.sign({
            id: user.id
        }, process.env.SECRET_KEY as string,
            {
                expiresIn: "30d"
            })

        const userData = {
            id: user.id,
            Nickname: user.Nickname,
            email: user.email,
            isVerified: user.isVerified,
            isAdmin: user.isAdmin,
            token
        }
        return res.status(200).json({ success: true, ...userData });

    }
    catch (err: any) {
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong... Try again later.",
            detail: err.detail
        });
    }
};

export const getMe = async (req: Request, res: Response) => {
    try {
        const user = await userRepository.findOne({
            relations: {
                configurations: {
                    components: true
                }
            },
            where: {
                id: req.body.userId
            }
        });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        console.log(user)
        const userData = {
            id: user.id,
            Nickname: user.Nickname,
            email: user.email,
            isVerified: user.isVerified,
            isAdmin: user.isAdmin,
            configurations: user.configurations,
        }
        return res.status(200).json({ success: true, ...userData });
    }
    catch (err: any) {
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong... Try again later.",
            detail: err.detail
        });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    const page = +(req.params.page);
    let itemsPerPage = 10;

    const users = await userRepository.createQueryBuilder("User").limit(itemsPerPage).offset((page - 1) * itemsPerPage).getMany();

    if (!users) {
        return res.status(404).json({ success: false, message: "Users were not found" })
    }

    var json = JSON.stringify({ ...users, page, success: true });
    res.writeHead(200, { 'content-type': 'application/json', 'content-length': Buffer.byteLength(json) });
    res.end(json);
};