import app from "./server";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 2802;

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})