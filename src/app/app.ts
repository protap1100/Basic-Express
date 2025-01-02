import express, { Request, Response, NextFunction } from "express";
const app = express();

// parsers
app.use(express.json());
app.use(express.text());

const useRouter = express.Router();
const courseRouter = express.Router();

app.use("/api/v1/users", useRouter);
app.use("/api/v1/courses", courseRouter);

useRouter.post("/api/v1/users/create-user", (req: Request, res: Response) => {
  const user = req.body;
  console.log(user);
  res.json({
    success: true,
    message: "User is  created successfully",
    data: user,
  });
});

// middleware
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url, req.method);
  next();
};

courseRouter.post("/create-course", (req: Request, res: Response) => {
  const course = req.body;
  console.log(course);
  res.json({
    success: true,
    message: " Course Created Successfully",
    data: course,
  });
});

app.get(
  "/",
  logger,
  async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.query);
    try {
      res.send();
    } catch (error) {
      // console.log(error);
      // res.status(400).json({
      //   success: false,
      //   message: "failed to get data",
      // });
      next(error);
    }
    res.send("Sever is Running ");
  }
);

app.post("/", logger, (req: Request, res: Response) => {
  console.log(req.body);
  res.json({
    message: "successfully received data",
  });
});

app.all("*", (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: "Url Not Found",
  });
});

// global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  // console.log(error);
  if (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

export default app;
