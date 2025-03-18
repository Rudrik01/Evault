#!/bin/sh

# Wait for Hardhat node to be ready
echo "Waiting for Hardhat node to be ready..."
wget --retry-connrefused --waitretry=1 --read-timeout=20 --timeout=15 --tries=30 http://blockchain-node:8545 -q

if [ $? -ne 0 ]; then
    echo "Error: Failed to connect to Hardhat node"
    exit 1
fi

echo "Hardhat node is ready!"

# Run deployment script
echo "Running deployment script..."
echo "This will:"
echo "1. Deploy the main EVault contract"
echo "2. Register test judges, lawyers, and clients"
echo "3. Create test cases"
echo "4. Update case progress"

# Set the correct network URL
export HARDHAT_NETWORK=localhost
export HARDHAT_NETWORK_URL=http://blockchain-node:8545

npx hardhat run scripts/deploy_fetchCaseDetailsByAClient.js --network localhost

if [ $? -ne 0 ]; then
    echo "Error: Deployment failed"
    exit 1
fi

echo "Deployment completed successfully!" 