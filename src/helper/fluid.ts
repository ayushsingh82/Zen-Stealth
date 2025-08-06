import { 
    generateKeysFromSignature, 
    extractViewingPrivateKeyNode,
    generateEphemeralPrivateKey,
    generateStealthAddresses,
    predictStealthSafeAddressWithClient,
  } from '@fluidkey/stealth-account-kit'

// Fluidkey Parameters as per documentation
const chainId = 845320009 // Horizen testnet chain ID
const safeVersion = '1.3.0'
const useDefaultAddress = true
const threshold = 1

async function createStealthAddress(signer: any, recipientPublicKeys: `0x${string}`[] = []) {
    try {
        // Generate signature for stealth key generation
        const signature = await signer.signMessage("Generate stealth keys");
        
        // Generate user's private keypair from signature
        const { viewingPrivateKey } = generateKeysFromSignature(signature);
        
        // Extract BIP-32 node from private viewing key
        const viewingPrivateKeyNode = extractViewingPrivateKeyNode(viewingPrivateKey);
        
        // Generate ephemeral private key based on viewing key node
        const ephemeral = generateEphemeralPrivateKey({
            viewingPrivateKeyNode,
            nonce: BigInt(0),
            chainId
        });
        
        // Generate stealth addresses based on ephemeral secret and spending public keys
        const stealthAddrs = generateStealthAddresses({
            spendingPublicKeys: recipientPublicKeys,
            ephemeralPrivateKey: ephemeral.ephemeralPrivateKey
        });
        
        // Return the first stealth address
        return stealthAddrs.stealthAddresses[0];
        
    } catch (error) {
        console.error("Error creating stealth address:", error);
        throw error;
    }
}

// Function to predict stealth Safe address
async function predictStealthSafeAddress(stealthAddresses: `0x${string}`[]) {
    try {
        const stealthSafeAddress = predictStealthSafeAddressWithClient({
            stealthAddresses,
            safeVersion,
            useDefaultAddress,
            threshold
        });
        
        return stealthSafeAddress;
    } catch (error) {
        console.error("Error predicting stealth Safe address:", error);
        throw error;
    }
}

export { createStealthAddress, predictStealthSafeAddress };