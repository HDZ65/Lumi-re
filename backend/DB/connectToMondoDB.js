import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://lumiere:hbqpshbqps@Lumiere.0rzawaa.mongodb.net/Lumiere?retryWrites=true&w=majority")
    } catch {
console.log("error connecting to MongoDB", error);
    }
}

export default connectToMongoDB;
