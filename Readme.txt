E-VOTE: A Decentralized Blockchain-Based Voting System
Overview
E-VOTE is a decentralized and transparent voting platform built using blockchain technology to ensure the integrity and security of the voting process. By leveraging Ethereum Smart Contracts and a secure MongoDB & IPFS-based backend, E-VOTE guarantees that each vote is recorded permanently, preventing tampering or unauthorized changes. This project aims to bring transparency, efficiency, and trust to the election process.

Features
Blockchain-Based Voting: Uses Ethereum blockchain and Solidity smart contracts to ensure a secure and tamper-proof voting process.
Voter Authentication: Includes login and sign-up functionality for voters using email authentication.
End-to-End Encryption: Securely stores votes and user information on decentralized systems like IPFS.
Live Results Dashboard: Provides real-time updates and visual representations of voting results with charts using Chart.js or Recharts.
Email Notification: Sends confirmation emails to voters upon successful vote submission using services like SendGrid or Mailgun.
Tech Stack
Frontend: React.js
Backend: Node.js with Express
Blockchain: Ethereum (Solidity for Smart Contracts)
Database: MongoDB & IPFS
Email Service: SendGrid/Mailgun
Charting Library: Chart.js / Recharts
File Structure

e-vote/
│
├── backend/               # Backend (Node.js & Express)
│   ├── controllers/       # API controllers
│   ├── models/            # MongoDB models (Mongoose schemas)
│   ├── routes/            # API routes
│   ├── services/          # Email service (SendGrid/Mailgun)
│   ├── config/            # Configuration files (DB, Blockchain)
│   ├── app.js             # Main backend application file
│   └── package.json       # Node.js dependencies
│
├── contracts/             # Smart Contracts (Solidity)
│   ├── migrations/        # Deployment scripts for contracts
│   ├── contracts/         # Solidity smart contracts
│   ├── build/             # Compiled smart contracts (ABI, bytecode)
│   ├── truffle-config.js  # Truffle configuration file
│   └── package.json       # Dependencies for smart contracts
│
├── frontend/              # Frontend (React.js)
│   ├── public/            # Static assets (index.html, etc.)
│   ├── src/               # React source files
│   │   ├── components/    # React components (e.g., login, voting, dashboard)
│   │   ├── services/      # API and blockchain service calls
│   │   ├── App.js         # Main React app
│   │   ├── index.js       # React entry point
│   └── package.json       # React dependencies
│
├── README.md              # Project documentation
└── .env                   # Environment variables (Not included in version control)
Prerequisites
Node.js: Ensure you have Node.js installed (v12.x or higher).
MongoDB: Local or cloud MongoDB instance.
Metamask Wallet: Installed for blockchain transactions.
Ethereum Test Network: Ropsten or similar test network.
Truffle: Install Truffle for compiling and deploying smart contracts.
Installation
Backend
Clone the repository:

git clone https://github.com/yourusername/e-vote
cd e-vote/backend
Install dependencies:

npm install
Create a .env file in the backend/ directory and add the following:

MONGO_URI=your_mongo_db_url
SENDGRID_API_KEY=your_sendgrid_api_key
ETHEREUM_NODE_URL=your_ethereum_node_url
Start the server:

npm start
Frontend
Navigate to the frontend directory:

cd ../frontend
Install dependencies:

npm install
Run the development server:

npm start
Smart Contracts
Go to the smart contract directory:

cd ../contracts
Install dependencies:

npm install
Compile the smart contract:

truffle compile
Deploy the contract to an Ethereum test network:

truffle migrate --network ropsten
Usage
Open your browser and navigate to http://localhost:3000 for the frontend.
Register as a new voter or log in if you already have an account.
Connect your Ethereum wallet (via MetaMask) to the platform.
Cast your vote on the active election.
Check real-time results on the dashboard.
Screenshots
Login/Sign Up Page:
Voting Page:
Results Dashboard:
Future Enhancements
Multi-chain support for interoperability across different blockchain networks.
More advanced vote visualization tools.
Mobile app for remote voting access.
Integration with government authentication systems for enhanced security.
Contributing
Contributions are welcome! Please follow the standard GitHub flow for submitting pull requests.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
For any queries, feel free to contact:

Name: Sneha  Manded
Email: snehamanded@gmail.com
Name: Veeresh Hiremath
Email: hveeresh19@gmail.com
