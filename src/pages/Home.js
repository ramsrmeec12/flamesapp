import React, { useState } from 'react';
import { saveToFirebase } from '../utils/firebase';
import image1 from '../assets/image.png';

const memeDialogues = {
    Friends: "Love pannadhinga bro, vaazhka nalla irukum 😎",
    Lovers: "Sirikaadha bro please!!! Naliki CCC training iruku, padi bro 😭",
    Affection: "Sathiyama konjam kuda feelings illa da ivanuku 😐",
    Marriage: "Pombala soooku kekkudhoooo 💍💃",
    Enemies: "Ivanuku orae oru vaati chance kuduthen, athuvum en FLAMES result-la 😡",
    Siblings: "Amma sollirukaaley, annan thangachi madhiri irukanum nu 👩‍👦"
};

function flamesLogic(name1, name2) {
    let str1 = name1.toLowerCase().replace(/ /g, "");
    let str2 = name2.toLowerCase().replace(/ /g, "");

    for (let i = 0; i < str1.length; i++) {
        const char = str1[i];
        if (str2.includes(char)) {
            str1 = str1.replace(char, '');
            str2 = str2.replace(char, '');
            i--;
        }
    }

    const flames = ['Friends', 'Lovers', 'Affection', 'Marriage', 'Enemies', 'Siblings'];
    const count = (str1 + str2).length;
    let idx = 0;

    while (flames.length > 1) {
        idx = (idx + count - 1) % flames.length;
        flames.splice(idx, 1);
    }

    return flames[0];
}

export default function Home() {
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = async () => {
        const res = flamesLogic(name1, name2);
        setResult(res);
        await saveToFirebase(name1, name2);
    };


    const tamilMemes = [
        "Avaluku naan love panren nu solla bayam illa... avaluku naan venam nu solla bayama iruku da! 🥲",
        "Love panradhuku laam scene venam da... guts venum! 😤",
        "Unna patha udane 'nee than da' nu sollanum... aana naan thaan sonna aval oodhitta! 😢",
        "Kalyanam pannuna thaan puriyum da... kadhal la oru comedy iruku 🤡",
        "Love ah propose panna aval sonna 'naan unga akka da!' 😭",
        "Avanayae kadhalikura... aana avan friend ah backup vachu irukura! 🤯",
        "Nee unna love pannura nu avalukku theriyum... but unakku aval yaaru nu theriyadha 🤪",
        "Kaadhal la success aana aalunga... memes kekkama iruka maataanga 😂",
        "Kadhal panradhu easy da... aana kadhal pudicha ponnu kita solluradhu dhaan toughest 😬",
        "Aval thalaatti siricha... naan engagement card print paniten 🤡"
    ];

    function getRandomMeme() {
        const index = Math.floor(Math.random() * tamilMemes.length);
        return tamilMemes[index];
    }

    return (
        <div className="min-h-screen bg-white">
            <nav className="flex justify-center items-center px-8 py-4 shadow-md">
                <div className="text-xl font-bold text-red-500">Love CALC</div>
            </nav>

            <div className="flex flex-col-reverse md:flex-row items-center justify-center p-8 md:p-20 gap-10">
                <img src={image1} alt="valentine" className="w-full md:w-1/2" />

                <div className="text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold text-purple-800">
                        Is Today
                    </h1>
                    <h1 className="text-4xl md:text-5xl font-bold text-purple-800">
                        Valentine’s Day?
                    </h1>
                    <p className="mt-4 text-gray-600 text-md md:text-lg">
                        Unkooda 100 Varusham vaazhanum daaaa!!!!
                    </p>

                    <div className="mt-6 flex flex-col gap-3">
                        <input
                            value={name1}
                            onChange={(e) => setName1(e.target.value)}
                            placeholder="Your Name"
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <input
                            value={name2}
                            onChange={(e) => setName2(e.target.value)}
                            placeholder="Crush Name"
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button
                            onClick={handleSubmit}
                            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                        >
                           Avalukku nee yaaru???
                        </button>

                        {result && (
                            <div className="mt-4 text-center md:text-left">
                                <h3 className="text-xl font-bold text-purple-700">Result: {result}</h3>
                                <p className="mt-2 text-lg text-gray-700 italic">"{memeDialogues[result]}"</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <footer className="bg-gray-900 text-white py-8 mt-10 shadow-inner">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-xl md:text-2xl font-bold text-pink-400 mb-4">💘 Tamil Kadhal Comedy 💘</h2>
                    <p className="text-lg md:text-xl font-semibold text-gray-200">
                        {getRandomMeme()}
                    </p>
                    <p className="mt-3 text-sm text-gray-400">– Powered by Kaadhal Memes Dept. 😎</p>
                    <p>Refresh pannu maamae vera dialogue varum....</p>
                    <div className="mt-4 flex justify-center space-x-4 text-2xl">
                        <span>😂</span>
                        <span>❤️</span>
                        <span>💃</span>
                        <span>🎉</span>
                        <span>😎</span>
                    </div>
                </div>
            </footer>

        </div>
    );
}
