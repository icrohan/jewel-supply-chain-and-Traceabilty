const GoldVerify = artifacts.require("GoldVerify");

module.exports = function (deployer) {
  deployer.deploy(GoldVerify);
};