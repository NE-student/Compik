import "reflect-metadata"
import cors from "cors";
import express, { Express} from "express";
import { AppDataSource } from "./data-source"
import { type } from "./routes/type";
import { auth } from './routes/auth';
import { upload } from './routes/upload';
import { property } from "./routes/property";
import { propertyValue } from "./routes/propertyValue";
import { category } from "./routes/category";
import { component } from "./routes/component";
import { compareProperty } from "./routes/compareProperty";
import { comparePropertyValue } from "./routes/comparePropertyValue";
import { comparePropertyImpactCategory } from "./routes/comparePropertyImpactCategory";
import { configuration } from "./routes/configuration";

//Database connect and initialize
AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!")
})
.catch((err) => {
    console.error("Error during Data Source initialization:", err)
})

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use('/uploads',express.static('uploads'));

app.get("/", (_, res)=>{
    res.send("It's a root of a NodeJs express-program.");
})

//Routes
auth(app);
upload(app);
category(app);
property(app);
type(app);
propertyValue(app);
compareProperty(app);
comparePropertyValue(app);
comparePropertyImpactCategory(app);
component(app);
configuration(app);

//Starting server
app.listen(4444, ()=>{
    console.log("Server OK");
})