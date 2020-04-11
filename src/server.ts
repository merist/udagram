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

  // Filetr image endpoint
  // Displays a simple message to the user
  /**************************************************************************** */
  app.get("/filteredimage", async (req, res) => {
    const imageUrl = req.query.image_url;

    // check if imageUrl is invalid and return a message to the user
    if (!imageUrl) {
      return res.status(400).send({
        message: "The image url cannot be found",
      });
    }

    try {
      const filteredImageFromURL = await filterImageFromURL(imageUrl);
      res.sendFile(filteredImageFromURL, () =>
        deleteLocalFiles([filteredImageFromURL])
      );
    } catch (error) {
      res
        .sendStatus(422)
        .send("Failed to filter the image from the current url");
    }
  });

  // Displays a simple message to the user to add the correct path in order to filter the image
  app.get("/", async (req, res) => {
    res.send(
      "Add this path after your EB url example: /filteredimage?image_url=https://d20vrrgs8k4bvw.cloudfront.net/images/open-graph/udacity.png"
    );
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
