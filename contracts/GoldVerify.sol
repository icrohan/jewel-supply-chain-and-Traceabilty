// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract GoldVerify {

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // ROLES
    mapping(address => bool) public manufacturers;
    mapping(address => bool) public retailers;
    mapping(address => bool) public consumers; // 🔥 NEW

    modifier onlyManufacturer() {
        require(manufacturers[msg.sender], "Not manufacturer");
        _;
    }

    modifier onlyRetailer() {
        require(retailers[msg.sender], "Not retailer");
        _;
    }

    // 🔥 GOLD STRUCT
    struct Gold {
        string goldId;
        string purity;
        string weight;
        string hallmarkNumber;
        string origin;

        string result;
        uint confidence;

        address manufacturer;
        bool verified;
        uint timestamp;
    }

    mapping(string => Gold) private goldRecords;

    // EVENTS
    event ManufacturerRegistered(address user);
    event RetailerRegistered(address user);
    event ConsumerRegistered(address user); // 🔥 NEW
    event GoldUploaded(string goldId);
    event GoldVerified(string goldId, address retailer);

    // ✅ REGISTER FUNCTIONS
    function registerManufacturer() public {
        require(!manufacturers[msg.sender], "Already registered");
        manufacturers[msg.sender] = true;

        emit ManufacturerRegistered(msg.sender);
    }

    function registerRetailer() public {
        require(!retailers[msg.sender], "Already registered");
        retailers[msg.sender] = true;

        emit RetailerRegistered(msg.sender);
    }

    // 🔥 OPTIONAL CONSUMER REGISTER
    function registerConsumer() public {
        require(!consumers[msg.sender], "Already registered");
        consumers[msg.sender] = true;

        emit ConsumerRegistered(msg.sender);
    }

    // 🔥 UPLOAD GOLD
    function uploadGold(
        string memory goldId,
        string memory purity,
        string memory weight,
        string memory hallmarkNumber,
        string memory origin,
        string memory result,
        uint confidence
    ) public onlyManufacturer {

        require(bytes(goldId).length > 0, "Invalid ID");
        require(goldRecords[goldId].timestamp == 0, "Already exists");

        goldRecords[goldId] = Gold(
            goldId,
            purity,
            weight,
            hallmarkNumber,
            origin,
            result,
            confidence,
            msg.sender,
            false,
            block.timestamp
        );

        emit GoldUploaded(goldId);
    }

    // 🔥 VERIFY GOLD (RETAILER)
    function verifyGold(string memory goldId) public onlyRetailer {
        require(goldRecords[goldId].timestamp != 0, "Not found");
        require(!goldRecords[goldId].verified, "Already verified");

        goldRecords[goldId].verified = true;

        emit GoldVerified(goldId, msg.sender);
    }

    // 🔥 GET GOLD DETAILS (CONSUMER USE)
    function getGold(string memory goldId)
        public view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            uint,
            address,
            bool,
            uint
        )
    {
        require(goldRecords[goldId].timestamp != 0, "Not found");

        Gold memory g = goldRecords[goldId];

        return (
            g.goldId,
            g.purity,
            g.weight,
            g.hallmarkNumber,
            g.origin,
            g.result,
            g.confidence,
            g.manufacturer,
            g.verified,
            g.timestamp
        );
    }

    // 🔥 EXTRA HELPER (VERY USEFUL)
    function isVerified(string memory goldId) public view returns (bool) {
        require(goldRecords[goldId].timestamp != 0, "Not found");
        return goldRecords[goldId].verified;
    }
}