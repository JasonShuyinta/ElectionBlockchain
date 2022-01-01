import { ElectionContext } from "./context/ElectionContext";
import React, { useState, useEffect } from "react";

const App = () => {
  const {
    currentAccount,
    connectWallet,
    candidates,
    voteCandidate,
    addCandidate,
  } = React.useContext(ElectionContext);

  const [candidateName, setCandidateName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addCandidate(candidateName);
  };

  return (
    <div className="App">
      <h1>hello world</h1>
      <p>{currentAccount}</p>
      <button onClick={connectWallet}>Connect to metamask</button>
      <div>
        <input
          type="text"
          name="candidateName"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Add Candidate
        </button>
      </div>
      <div style={{ display: "flex" }}>
        {candidates.map((candidate, i) => {
          console.log(candidate);
          return (
            <div
              key={i}
              style={{
                width: `${100 / candidates.length}%`,
                textAlign: "center",
              }}
            >
              <p>{candidate.name}</p>
              <p>CandidateID: {candidate.id._hex}</p>
              <p>Vote count: {parseInt(candidate.voteCount._hex)}</p>
              <button onClick={() => voteCandidate(candidate.id)}>Vote</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
