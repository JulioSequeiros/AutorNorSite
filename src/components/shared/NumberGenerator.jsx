import React, { useState, useEffect } from 'react';

const NumberGenerator = () => {
    const [randomNumber, setRandomNumber] = useState(0);

    useEffect(() => {
        generateRandomNumber();
    }, []);

    const generateRandomNumber = () => {
        const newRandomNumber = Math.floor(Math.random() * 800) + 1;
        setRandomNumber(newRandomNumber);
    };

    return (
        <div>
            <p>{randomNumber} €</p>
        </div>
    );
};

export default NumberGenerator;
