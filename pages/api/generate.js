import { Configuration, OpenAIApi } from "openai";
const [showShoppingList, setShowShoppingList] = useState(false);
import { useState } from 'react';
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const text = req.body.text || '';
  const words = text.trim().split(/\s+/).length;
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      // PROMPT GOES HERE// To Do: add your own prompt here
      prompt: "show a list of top 20 easy meals for this diet type, less than 6 ingredients, include at least two breakfasts in the list but don't label it as 'breakfast', number the options 1-20" + text,
      ///PROMPT ENDS HERE
      max_tokens: 250,
      temperature: 0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}async function onSubmit(event) {
  event.preventDefault();
  const [mealList, setMealList] = useState("");
  const [shoppingList, setShoppingList] = useState("");
  setShowShoppingList(true);
  }

  try {
    // API call for meal list
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: "show a list of top 20 easy meals for this diet type, less than 6 ingredients, include at least two breakfasts in the list but don't label it as 'breakfast', number the options 1-20" + selectedValues,
        max_tokens: 250,
        temperature: 0,
      }),
    });

    const data = await response.json();
    if (response.status !== 200) {
      throw data.error || new Error(`Request failed with status ${response.status}`);
    }

    console.log(data.result);
    setMealList(data.result);

    // API call for shopping list
    const response2 = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: "Show numbered list all grocery items needed for these meals. Second show each recipe. Each recipe less than 6 ingredients" + selectedValues,
        max_tokens: 1000,
        temperature: 0,
      }),
    });

    const data2 = await response2.json();
    if (response2.status !== 200) {
      throw data2.error || new Error(`Request failed with status ${response2.status}`);
    }

    console.log(data2.result);
    setShoppingList(data2.result);
  } catch (error) {
    console.error(error);
  }
