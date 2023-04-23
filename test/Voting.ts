import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Voting", function () {
	const expiryDate = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
	const optionIndex = 0;
	const options = ["Option A", "Option B", "Option C"];
	let signer: SignerWithAddress;
	let voting: any;

	beforeEach(async function () {
		const Voting = await ethers.getContractFactory("Voting");
		voting = await Voting.deploy(options, expiryDate);
		await voting.deployed();
		signer = (await ethers.getSigners())[0];
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

	it("should not allow multiple votes from the same address", async function () {
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

	// TODO: Fix this test
	// it("should not allow voting after the expiry date", async function () {
	// 	const currentBlockTimestamp = await ethers.provider.getBlock("latest").then(block => block.timestamp);
	// 	await network.provider.send("evm_increaseTime", [604800]);
	// 	await network.provider.send("evm_mine", []);
	// 	await expect(voting.vote(0)).to.be.revertedWith("Voting has expired");
	// 	const options = await voting.getOptions();
	// 	expect(options[0].count).to.equal(0);
	// 	const totalVotes = await voting.getTotalVotes();
	// 	expect(totalVotes).to.equal(0);
	// });
});