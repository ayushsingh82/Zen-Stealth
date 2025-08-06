// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Transfer {
    event TransferCompleted(address indexed from, address indexed to, uint256 amount);
    event TransferFailed(address indexed from, address indexed to, uint256 amount, string reason);

    /**
     * @dev Transfer ETH to a specified address
     * @param recipient The address to send ETH to
     * @param amount The amount of ETH to send (in wei)
     */
    function transferETH(address payable recipient, uint256 amount) external payable {
        require(recipient != address(0), "Transfer: recipient cannot be zero address");
        require(amount > 0, "Transfer: amount must be greater than 0");
        require(msg.value >= amount, "Transfer: insufficient ETH sent");
        require(address(this).balance >= amount, "Transfer: contract has insufficient balance");

        // Transfer the ETH
        (bool success, ) = recipient.call{value: amount}("");
        
        if (success) {
            emit TransferCompleted(msg.sender, recipient, amount);
            
            // Refund excess ETH if any
            uint256 excess = msg.value - amount;
            if (excess > 0) {
                (bool refundSuccess, ) = payable(msg.sender).call{value: excess}("");
                require(refundSuccess, "Transfer: failed to refund excess ETH");
            }
        } else {
            emit TransferFailed(msg.sender, recipient, amount, "Transfer failed");
            revert("Transfer: ETH transfer failed");
        }
    }

    /**
     * @dev Get the contract's ETH balance
     */
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

   

    /**
     * @dev Allow the contract to receive ETH
     */
    receive() external payable {}
}
