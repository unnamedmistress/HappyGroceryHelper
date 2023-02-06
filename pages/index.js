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
        <img src="/writingicon.png" className={styles.icon} />
        <h3>AutoCorrect on Steroids!</h3>
        <p style={{fontFamily: "verdana"}}>Select your diet from the list (you can select more than one by holding Control).</p>
        <form onSubmit={onSubmit}>
          <textarea
            rows="10"
            cols="50"
            name="text"
            placeholder="Enter text (max 250 words)"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <input type="submit" value="Edit text" />
          <p>Give me a few seconds, I'm new and a little slow</p>
        </form>

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
  <a
    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
    target="_blank"
    rel="noopener noreferrer"
  >
    Powered by <img src="/vercel.svg" alt="Vercel Logo" />
  </a>
</footer>
</div>
  );
      }

