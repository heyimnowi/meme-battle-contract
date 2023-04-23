// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    // Define a struct to represent a vote option
    struct Option {
        string name;
        uint256 count;
    }

    // Define an array to store the vote options
    Option[] public options;

    // Define a mapping to keep track of who has voted
    mapping(address => bool) public voters;

    // Define a variable to store the expiry date
    uint256 public expiryDate;

    // Define a constructor to add the vote options and expiry date
    constructor(string[] memory optionNames, uint256 _expiryDate) {
        for (uint256 i = 0; i < optionNames.length; i++) {
            options.push(Option(optionNames[i], 0));
        }
        expiryDate = _expiryDate;
    }

    // Define a function to vote for a given option
    function vote(uint256 optionIndex) public {
        // Check if the contract has expired
        require(block.timestamp < expiryDate, "Voting has expired");

        // Check if the sender has already voted
        require(!voters[msg.sender], "You have already voted");

        // Check if the option index is valid
        require(optionIndex < options.length, "Invalid option index");

        // Increment the vote count for the selected option
        options[optionIndex].count++;

        // Mark the sender as a voter
        voters[msg.sender] = true;
    }

    // Define a function to return the array of options
    function getOptions() public view returns (Option[] memory) {
        return options;
    }

    // Define a function to return the total number of votes
    function getTotalVotes() public view returns (uint256) {
        uint256 totalVotes = 0;
        for (uint256 i = 0; i < options.length; i++) {
            totalVotes += options[i].count;
        }
        return totalVotes;
    }

    // Define a function to return the winning option
    function getWinningOption() public view returns (Option memory) {
        Option memory winningOption = options[0];
        for (uint256 i = 1; i < options.length; i++) {
            if (options[i].count > winningOption.count) {
                winningOption = options[i];
            }
        }
        return winningOption;
    }
}
