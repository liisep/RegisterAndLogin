import { app } from "./index";

const PORT: Number = 5000;

// start express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});