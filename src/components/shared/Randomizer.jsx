import React, { useState, useEffect } from 'react';

const Randomizer = ({ texts }) => {
    const [randomText, setRandomText] = useState('');

    useEffect(() => {
        generateRandomText();
    }, []);

    const generateRandomText = () => {
        const randomIndex = Math.floor(Math.random() * texts.length);
        setRandomText(texts[randomIndex]);
    };

    return (
        <div>
            {randomText && <p>{randomText}</p>}
        </div>
    );
};

export default Randomizer;