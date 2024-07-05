const { ethers, upgrades } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    const token = await ethers.getContractFactory("Token");
    const deployedToken = await token.deploy(deployer.address, 10000);
    console.log("Token address:", deployedToken.target);

    const wallet = await ethers.getContractFactory("Wallet");
    const deployedWallet = await wallet.deploy(deployer.address);
    console.log("Wallet address:", deployedWallet.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})