module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Ganache GUI
      port: 7545,            // Default Ganache port
      network_id: 5777
    }
  },

  mocha: {
    timeout: 100000
  },

  compilers: {
    solc: {
      version: "0.8.17",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
        viaIR: true
      }
    }
  }
};
