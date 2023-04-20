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

    // Define a constructor to add the vote options
    constructor(string[] memory optionNames) {
        for (uint256 i = 0; i < optionNames.length; i++) {
            options.push(Option(optionNames[i], 0));
        }
    }

    // Define a function to vote for a given option
    function vote(uint256 optionIndex) public {
        // Check if the sender has already voted
        require(!voters[msg.sender], "You have already voted");

        // Check if the option index is valid
        require(optionIndex < options.length, "Invalid option index");

        // Increment the vote count for the selected option
        options[optionIndex].count++;

        // Mark the sender as a voter
        voters[msg.sender] = true;
    }
}
