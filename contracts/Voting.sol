// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Option {
        string name;
        uint256 count;
    }

    bool public resultsDeclared;
    mapping(address => bool) public voters;
    Option public winningOption;
    Option[] public votes;
    uint256 public expiryDate;
    uint256 public totalVotes;

    constructor(string[] memory optionNames, uint256 _expiryDate) {
        for (uint256 i = 0; i < optionNames.length; i++) {
            votes.push(Option(optionNames[i], 0));
        }
        expiryDate = _expiryDate;
        totalVotes = 0;
    }

    function getVotes () public view returns (Option[] memory) {
        return votes;
    }

    function getExpiryDate () public view returns (uint256) {
        return expiryDate;
    }

    function getTotalVotes () public view returns (uint256) {
        return totalVotes;
    }

    // Define a function to vote for a given option
    function vote(uint256 optionIndex) public {
        require(block.timestamp < expiryDate, "Voting has expired");
        require(!voters[msg.sender], "You have already voted");
        require(optionIndex < votes.length, "Invalid option index");
        votes[optionIndex].count++;
        totalVotes++;
        voters[msg.sender] = true;
    }

    function calculateWinningOption() private {
        uint256 winningVoteCount = 0;
        for (uint256 i = 0; i < votes.length; i++) {
            if (votes[i].count > winningVoteCount) {
                winningVoteCount = votes[i].count;
                winningOption = votes[i];
            }
        }
    }

    // Define a function to declare the results
    function declareResults() public {
        require(block.timestamp >= expiryDate, "Voting is still ongoing");
        require(!resultsDeclared, "Results have already been declared");
        resultsDeclared = true;
        calculateWinningOption();  
    }

    // Define a modifier to check if the contract has expired
    modifier votingExpired() {
        require(block.timestamp >= expiryDate, "Voting is still ongoing");
        _;
    }

    // Define a function to declare the results using the modifier
    function declareResultsUsingModifier() public votingExpired {
        require(!resultsDeclared, "Results have already been declared");
        resultsDeclared = true;
        calculateWinningOption();  
    }
}
