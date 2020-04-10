import express from "express";
import bodyParser from "body-parser";
import { filterImageFromURL, deleteLocalFiles } from "./util/util";

(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());
  /**************************************************************************** */

  // Root Endpoint
  // Displays a simple message to the user
  /**************************************************************************** */
  app.get("/filteredimage", async (req, res) => {
    const imageUrl = req.query.image_url;

    // check imageUrl is valid
    if (!imageUrl) {
      return res.status(400).send({
        message: "The image url is required or malformed",
      });
    }

    try {
      const filteredImageFromURL = await filterImageFromURL(imageUrl);
      res.sendFile(filteredImageFromURL, () =>
        deleteLocalFiles([filteredImageFromURL])
      );
    } catch (error) {
      res.sendStatus(422).send("Unable to process image at the provided url");
    }
  });

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}");
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
