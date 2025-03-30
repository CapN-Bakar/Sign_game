import { useState, useEffect } from "react";
import "./CryptoTrivia.css";

const triviaList = [
  "Sign Protocol enables verifiable, on-chain attestations across multiple blockchain ecosystems.",
  "Instead of relying on trust assumptions, Sign Protocol leverages zero-knowledge cryptography and digital signatures.",
  "What once required a notary public can now be done digitally with trustless attestations via Sign Protocol.",
  "Sign Protocol makes attesting information as easy as making a phone call—no unnecessary complexity.",
  "Unlike legacy systems, Sign Protocol is open-source and accessible for startups, enterprises, and individuals.",
  "Using TEEs and partnerships with Lit Protocol, Sign Protocol verifies attestations across Ethereum, Base, BNB Chain, Arweave, and more.",
  "Hybrid attestations store large attestation data off-chain on IPFS or Arweave while keeping metadata securely linked on-chain.",
  "Domains and DIDs establish identity, but attestations define reputation—verifiable claims tell your story.",
  "Developers contributing valuable feedback to Sign Protocol can win a $300 prize, blog features, and priority beta access!",
  "Sign Protocol’s attestations power governance, reputation networks, reward systems, and decentralized identity in Web3.",
];

export default function CryptoTrivia() {
  const [trivia, setTrivia] = useState(triviaList[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * triviaList.length);
      setTrivia(triviaList[randomIndex]);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return <div className="crypto-trivia">📜 {trivia}</div>;
}
