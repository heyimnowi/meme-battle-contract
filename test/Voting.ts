import { expect } from "chai";
import { ethers } from "hardhat";

describe("Voting", function () {
	let voting: any;
	const options = ["Option A", "Option B", "Option C"];

	beforeEach(async function () {
		// Compile the contract
		const Voting = await ethers.getContractFactory("Voting");
		voting = await Voting.deploy(options);

		// Wait for the contract to be deployed
		await voting.deployed();

		const optionIndex = 0;
		const signer = (await ethers.getSigners())[0];
		await voting.connect(signer).vote(optionIndex);
	});

	it("Should return the right options", async function () {
		voting.getOptions().then((result: any) => {
			const names = result.map((option: any) => option.name);
			expect(names).to.equal(options);
		});
	});

	it("Should return the right option count", async function () {
		voting.getTotalVotes().then((result: any) => {
			expect(result).to.equal(1);
		});
	});

	it("should allow user to only vote once", async function () {
		try {
			const optionIndex = 0;
			const signer = (await ethers.getSigners())[0];
			await voting.connect(signer).vote(optionIndex);
		} catch (error) {
			const errorObj = error as Error;
			console.log(errorObj.message);
		}

		voting.getTotalVotes().then((result: any) => {
			expect(result).to.equal(1);
		});
	});

	it("should return all the options with their vote counts", async function () {
		const expectedVotes = [
			{
				name: "Option A",
				votes: 1,
			},
			{
				name: "Option B",
				votes: 0,
			},
			{
				name: "Option C",
				votes: 0,
			}
		];

		voting.getOptions().then((result: any) => {
			expect(result).to.equal(expectedVotes);
		});
	});

	it("should return the winning option", async function () {
		voting.getWinningOption().then((result: any) => {
			expect(result).to.equal({
				name: "Option A",
				votes: 1,
			});
		});
	});

});