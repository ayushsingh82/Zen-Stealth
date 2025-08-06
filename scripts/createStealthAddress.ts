#!/usr/bin/env ts-node

import { ethers } from 'ethers';
import { createStealthAddress, predictStealthSafeAddress } from '../src/helper/fluid';

async function main() {
    try {
        // Get user input for recipient address
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const question = (prompt: string): Promise<string> => {
            return new Promise((resolve) => {
                rl.question(prompt, resolve);
            });
        };

        console.log('🚀 Stealth Address Generator');
        console.log('============================\n');

        // Get recipient address from user
        const recipientAddress = await question('Enter recipient address (0x...): ');
        
        // Validate address format
        if (!ethers.isAddress(recipientAddress)) {
            throw new Error('Invalid address format. Please enter a valid Ethereum address.');
        }

        // Get amount (optional)
        const amountInput = await question('Enter amount to send (optional, press Enter to skip): ');
        const amount = amountInput ? ethers.parseEther(amountInput) : ethers.parseEther('0');

        console.log('\n📝 Input Summary:');
        console.log(`Recipient: ${recipientAddress}`);
        console.log(`Amount: ${ethers.formatEther(amount)} ETH`);
        console.log('\n⏳ Generating stealth address...');

        // Create a mock signer for demonstration
        // In a real scenario, you'd use the actual wallet signer
        const mockSigner = {
            signMessage: async (message: string) => {
                // This is a mock implementation
                // In real usage, this would be the actual wallet signature
                return '0x' + 'a'.repeat(130); // Mock signature
            }
        };

        // Generate stealth address
        const stealthAddress = await createStealthAddress(mockSigner, [recipientAddress as `0x${string}`]);
        
        console.log('\n✅ Stealth Address Generated!');
        console.log('============================');
        console.log(`Stealth Address: ${stealthAddress}`);
        
        // Predict Safe address
        const safeAddress = await predictStealthSafeAddress([stealthAddress as `0x${string}`]);
        console.log(`Safe Address: ${safeAddress}`);

        console.log('\n📋 Transaction Details:');
        console.log('=======================');
        console.log(`From: Your Wallet`);
        console.log(`To: ${stealthAddress}`);
        console.log(`Amount: ${ethers.formatEther(amount)} ETH`);
        console.log(`Network: Horizen Testnet (Chain ID: 845320009)`);

        console.log('\n⚠️  Note: This is a demonstration with mock signature.');
        console.log('   In production, use actual wallet integration.');

        rl.close();

    } catch (error) {
        console.error('\n❌ Error:', (error as Error).message);
        process.exit(1);
    }
}

// Run the script
if (require.main === module) {
    main().catch((error) => {
        console.error('Script failed:', error);
        process.exit(1);
    });
}

export { main }; 