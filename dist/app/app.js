"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use(express_1.default.text());
const useRouter = express_1.default.Router();
const courseRouter = express_1.default.Router();
app.use("/api/v1/users", useRouter);
app.use("/api/v1/courses", courseRouter);
useRouter.post("/api/v1/users/create-user", (req, res) => {
    const user = req.body;
    console.log(user);
    res.json({
        success: true,
        message: "User is  created successfully",
        data: user,
    });
});
// middleware
const logger = (req, res, next) => {
    console.log(req.url, req.method);
    next();
};
courseRouter.post("/create-course", (req, res) => {
    const course = req.body;
    console.log(course);
    res.json({
        success: true,
        message: " Course Created Successfully",
        data: course,
    });
});
app.get("/", logger, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.query);
    try {
        res.send(something);
    }
    catch (error) {
        // console.log(error);
        // res.status(400).json({
        //   success: false,
        //   message: "failed to get data",
        // });
        next(error);
    }
    res.send("Sever is Running because o john the don ");
}));
app.post("/", logger, (req, res) => {
    console.log(req.body);
    res.json({
        message: "successfully received data",
    });
});
app.all("*", (req, res) => {
    res.status(400).json({
        success: false,
        message: "Url Not Found",
    });
});
// global error handler
app.use((error, req, res, next) => {
    // console.log(error);
    if (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
});
exports.default = app;
