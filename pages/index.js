import Head from "next/head";
import Image from "next/image";
import ultimaLogo from "../assets/ultima-logo-full.png";
import React from "react";
import { useState } from "react";

const Home = () => {
    const [userInput, setUserInput] = useState("");
    const [apiOutput, setApiOutput] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const callGenerateEndpoint = async () => {
        setIsGenerating(true);

        console.log("Calling OpenAI...");
        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userInput }),
        });

        const data = await response.json();
        const { output } = data;
        console.log("OpenAI replied...", output.text);

        setApiOutput(`${output.text}`);
        setIsGenerating(false);
    };

    const onUserChangedText = (event) => {
        console.log(event.target.value);
        setUserInput(event.target.value);
    };

    return (
        <div className="root">
            <Head>
                <title>Indie Game Blurb Generator</title>
            </Head>
            <div className="container">
                <div className="header">
                    <div className="header-title">
                        <h1>Generate Game Blurb</h1>
                    </div>
                    <div className="header-subtitle">
                        <h2>
                            Write out some details of your game and receive a
                            captivating synopsis.
                            <span className="header-example">
                                (Ex. Title, genre, items, plot, character names,
                                multiplayer, systems, etc.)
                            </span>
                        </h2>
                    </div>
                </div>
                <div className="prompt-container">
                    <textarea
                        className="prompt-box"
                        placeholder="Skylight is a farming and romance simulator set in a sky city. Your decisions matter!"
                        value={userInput}
                        onChange={onUserChangedText}
                    ></textarea>
                    <div className="prompt-buttons">
                        <a
                            className={
                                isGenerating
                                    ? "generate-button loading"
                                    : "generate-button"
                            }
                            onClick={callGenerateEndpoint}
                        >
                            <div className="generate">
                                {isGenerating ? (
                                    <span class="loader"></span>
                                ) : (
                                    <p>Generate</p>
                                )}
                            </div>
                        </a>
                    </div>
                    {apiOutput && (
                        <div className="output">
                            <div className="output-header-container">
                                <div className="output-header">
                                    <h3>Output</h3>
                                </div>
                            </div>
                            <div className="output-content">
                                <p>{apiOutput}</p>
                            </div>
                        </div>
                    )}
                </div>
                <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                >
                    <div className="badge">
                        <p>Coming Soon to the Chrome Webstore</p>
                    </div>
                </a>
            </div>
            <div className="badge-container grow">
                <a
                    href="https://ultima.gg/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <div className="badge">
                        <Image src={ultimaLogo} alt="Ultima.gg logo" />
                        <p>By Ultima</p>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default Home;
