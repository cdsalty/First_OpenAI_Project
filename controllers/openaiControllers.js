const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// create function to generate image. will be async since openai returns a promise
const generateimage = async (req, res) => {
  const { prompt, size } = req.body;

  const imageSize =
    size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";

  try {
    const response = await openai.createImage({
      // the prompt will later serve where the user types to search
      // n will represent the number of images which is being hard coded to one
      // prompt: "happy dog running from his giant tail",
      // n: 1,
      // size: "512x512",
      prompt: prompt,
      n: 1,
      size: imageSize,
    });
    // the response is going to return an imageUrl that we need
    const imageUrl = response.data.data[0].url;

    res.status(200).json({
      success: true,
      data: imageUrl, // Added but there are many other options to choose/use
      // verifyDataOnFront: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    res.status(400).json({
      success: false,
      error: "The image could not be generated",
    });
  }
};

module.exports = { generateimage };

/*
// The reason I may get some errrors are for violating the context policy

// Another option they provide is an image variation tool that generates a varation of a given image

*/
