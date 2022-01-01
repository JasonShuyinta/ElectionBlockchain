// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Election {
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    mapping(address => bool) public voters;
    //Store and fetch candidates
    mapping(uint256 => Candidate) public candidates;
    uint256 public candidatesCount;

    Candidate[] cands;

    event VotedEvent(uint256 indexed _candidateId);
    event AddCandidateEvent(string _name);

    constructor() public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    function addCandidate(string memory _name) public {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
        cands.push(Candidate(candidatesCount, _name, 0));
        emit AddCandidateEvent(_name);
    }

    function vote(uint256 _candidateId) public {
        require(!voters[msg.sender]);

        require(_candidateId > 0 && _candidateId <= candidatesCount);

        voters[msg.sender] = true;
        candidates[_candidateId].voteCount++;
        emit VotedEvent(_candidateId);
    }

    function getAllCandidates() public view returns (Candidate[] memory) {
        return cands;
    }
}
