# Charity Blockchain App

## Overview
The Charity Blockchain App is a decentralized application (dApp) built on the Ethereum blockchain that facilitates charitable donations and management of charity campaigns. This project aims to provide transparency and trust in the donation process by leveraging blockchain technology.

## Features
- **Create Charity Campaigns**: Users can create new charity campaigns through a user-friendly form.
- **Manage Donations**: The app allows users to view and manage donations made to various campaigns.
- **Dashboard**: A dedicated dashboard for users to track their campaigns and view donation statistics.
- **Blockchain Integration**: Utilizes Ethereum smart contracts to manage donations and contributors securely.

## Project Structure
```
charity-blockchain-app
├── contracts
│   ├── Charity.sol          # Smart contract for managing charity campaigns
│   └── Migrations.sol       # Migration contract for deploying smart contracts
├── src
│   ├── components
│   │   ├── CharityForm.js   # Form for creating charity campaigns
│   │   └── DonationList.js   # Displays list of donations
│   ├── pages
│   │   ├── Home.js          # Home page of the application
│   │   └── Dashboard.js      # Dashboard for managing campaigns
│   ├── utils
│   │   └── web3.js          # Utility functions for blockchain interaction
│   ├── App.js                # Main application component
│   └── index.js              # Entry point of the React application
├── test
│   ├── Charity.test.js       # Test cases for the Charity smart contract
│   └── utils.js              # Utility functions for testing
├── scripts
│   └── deploy.js             # Script for deploying smart contracts
├── migrations
│   └── 1_initial_migration.js # Migration script for Migrations contract
├── package.json               # npm configuration file
├── hardhat.config.js          # Hardhat configuration file
├── truffle-config.js          # Truffle configuration file
└── README.md                  # Project documentation
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd charity-blockchain-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the environment:
   - Create a `.env` file and add your Ethereum node provider URL and other necessary configurations.

## Usage
1. Start the development server:
   ```
   npm start
   ```

2. Deploy the smart contracts:
   ```
   npm run deploy
   ```

3. Access the application in your browser at `http://localhost:3000`.

## Testing
To run the tests for the smart contracts, use:
```
npm test
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.