const { ethers, upgrades } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    const token = await ethers.getContractFactory("Token");
    const deployedToken = await upgrades.deployProxy(token, [deployer.address, 100000], {initializer: 'initialize'});
    await deployedToken.deployed();
    console.log("Token deployed to:", deployedToken.address);

    const wallet = await ethers.getContractFactory("Wallet");
    const deployedWallet = await upgrades.deployProxy(wallet, [], {initializer: 'initialize'});
    await deployedWallet.deployed();
    console.log("Wallet deployed to:", deployedWallet.address);
    const gasEstimate = await token.estimateGas.transfer(deployer.address, ethers.utils.parseEther("1"));

    console.log("Estimated gas cost:", gasEstimate.toString());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})