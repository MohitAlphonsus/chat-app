import mongoose from "mongoose";

async function connectDatabse() {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URI);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (err) {
		console.log(`MongoDB connection error ${err}`);
	}
}

export default connectDatabse;
