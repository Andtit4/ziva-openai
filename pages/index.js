import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ animal: animalInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setAnimalInput("");
  }

  return (
    <div>
      <Head>
        <link rel="icon" href="/Ziva+logo-vector.png" />
        <title>ziva - start</title>
      </Head>

      <main className={styles.main}>

        <img src="/Ziva+logo-vector.png" style={{width: '100px',height:'100px'}}/>
        <h3>Ziva - openai</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Ecrire un message "
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Générer" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
