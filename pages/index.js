import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [textInput, setTextInput] = useState("");
  const [result, setResult] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setTextInput("");
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>AI Editor</title>
        <link rel="icon" href="/writingicon.png" />
      </Head>

      <main className={styles.main}>
        <img src="https://thumbs.dreamstime.com/b/grocery-list-line-icon-vector-outline-illustration-shopping-food-checklist-supermarket-consumer-paper-pictorgam-180766401.jpg" className={styles.icon} />
        <h3>Market Maven</h3>
        <p style={{fontFamily: "verdana"}}>Select your diet from the list (you can select more than one by holding Control).</p>
        <form id="diettype" onSubmit={handleSubmit}>
          <label htmlFor="diet">Choose a Diet:</label>
          <select
            name="diet"
            id="dietoptions"
            multiple
            onChange={handleDietChange}
          >
            <option value="Omnivore">Omnivore/Standard Diet</option>
            <option value="Vegan">Vegan</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Mediterranean">Mediterranean</option>
            <option value="Low-carb">Low-carb</option>
            <option value="Latin">Latin</option>
            <option value="Keto">Keto</option>
          </select>
          <br />
          <br />
          <input type="submit" value="Submit" />
        </form>
        <p>
          Hold down the Ctrl (windows) or Command (Mac) button to select multiple options.
        </p>
 <p>Give me a few seconds, I'm new and a little slow</p>
        {result.length > 0 && (
            <><p>Please select 5 options:</p><select name="selected-options" multiple value={selectedValues}
            onChange={(e) => setSelectedValues(Array.from(e.target.selectedOptions, (item) => item.value))}
          >
            {result.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select><button
            disabled={selectedValues.length !== 5}
            onClick={() => {
              alert(`Selected values: ${selectedValues.join(", ")}`);
            } }
          >
              Submit
            </button></>
  )}
</main>

<footer className={styles.footer}>

</footer>
</div>
  );
      }

