import { Request, Response } from "express";

const express = require("express");
const server = new express();

interface Profile {
    name: string;
    age: number;
}
interface Data {
    profile: Profile;
}

server.get("/", (req: Request, res: Response) => {
    console.log(req.url);
    res.status(200).send("Hello world");
});

server.get("/getData", (req: Request, res: Response) => {
    let data: Data = {
        profile: {
            name: "Anandu",
            age: 22,
        },
    };
    console.log(data.profile.name);

    res.status(200).send(data);
});

server.get("/name", (req: Request, res: Response) => {
    res.status(200).send("I am Anandu");
});
server.listen(3000, () => {
    console.log("Server running on port 3000");
});
