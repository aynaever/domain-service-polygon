const hre = require("hardhat");

async function main() {
	const [owner, randomUser] = await hre.ethers.getSigners();
	const Domains = await hre.ethers.getContractFactory("Domains");
	const domains = await Domains.deploy();

	await domains.deployed();
	console.log("Domains deployed to:", domains.address);
	console.log("Contract deployed by:", owner.address);

	let txn = await domains.register("crazystuff");
	await txn.wait();

	const domainOwner = await domains.getAddress("crazystuff");
	console.log("Domain Owner : ", domainOwner);

	txn = await domains.connect(randomUser).setRecord("crazystuff", "you are amazing!");
  await txn.wait();

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
