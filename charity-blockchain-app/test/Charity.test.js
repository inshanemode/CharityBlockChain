import { expect } from "chai";
import { ethers } from "hardhat";

describe("Charity Contract", function () {
    let Charity;
    let charity;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        Charity = await ethers.getContractFactory("Charity");
        [owner, addr1, addr2] = await ethers.getSigners();
        charity = await Charity.deploy();
        await charity.deployed();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await charity.owner()).to.equal(owner.address);
        });

        it("Should initialize with zero donations", async function () {
            const donationCount = await charity.getDonationCount();
            expect(donationCount).to.equal(0);
        });
    });

    describe("Donations", function () {
        it("Should accept donations", async function () {
            await charity.connect(addr1).donate({ value: ethers.utils.parseEther("1.0") });
            const donationCount = await charity.getDonationCount();
            expect(donationCount).to.equal(1);
        });

        it("Should track donations correctly", async function () {
            await charity.connect(addr1).donate({ value: ethers.utils.parseEther("1.0") });
            const donation = await charity.donations(0);
            expect(donation.amount).to.equal(ethers.utils.parseEther("1.0"));
            expect(donation.donor).to.equal(addr1.address);
        });
    });

    describe("Withdrawals", function () {
        it("Should allow the owner to withdraw funds", async function () {
            await charity.connect(addr1).donate({ value: ethers.utils.parseEther("1.0") });
            const initialBalance = await ethers.provider.getBalance(owner.address);
            await charity.withdraw();
            const finalBalance = await ethers.provider.getBalance(owner.address);
            expect(finalBalance).to.be.gt(initialBalance);
        });

        it("Should not allow non-owners to withdraw funds", async function () {
            await charity.connect(addr1).donate({ value: ethers.utils.parseEther("1.0") });
            await expect(charity.connect(addr2).withdraw()).to.be.revertedWith("Not the owner");
        });
    });
});