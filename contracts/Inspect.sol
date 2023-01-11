// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./Batch.sol";

contract Inspector {
    address public immutable inspector;

    //Only inspector is allowed to perform certain actions
    modifier onlyInspector() {
        require(msg.sender == inspector, "You're not privileged to do this");
        _;
    }

    constructor() {
        inspector = msg.sender;
    }

    //Store items that are added but not inspected
    address[] private batchesToInspect;
    //Store items that are inspected
    address[] private inspectedBatches;

    function addBatch(
        string memory i_name,
        uint256 i_energy,
        uint256 i_protein,
        uint256 i_carbohydrate,
        uint256 i_totalSugar,
        uint256 i_fat,
        uint256 i_satFat,
        uint256 i_natri,
        string memory i_productionDate,
        string memory i_expiryDate
    ) public onlyInspector {
        // Create a new batch with given inputs
        Batch newBatch = new Batch(
            inspector,
            i_name,
            i_energy,
            i_protein,
            i_carbohydrate,
            i_totalSugar,
            i_fat,
            i_satFat,
            i_natri,
            i_productionDate,
            i_expiryDate
        );
        // Push newly added item into itemsToInspect array
        batchesToInspect.push(address(newBatch));
    }

    function inspect(
        address batchToInspect,
        uint256 i_energy,
        uint256 i_protein,
        uint256 i_carbohydrate,
        uint256 i_totalSugar,
        uint256 i_fat,
        uint256 i_satFat,
        uint256 i_natri,
        string memory i_productionDate,
        string memory i_expiryDate,
        string memory i_inspectedDate
    ) public onlyInspector {
        // Create a Batch contract from address passed into function
        Batch inspectingBatch = Batch(batchToInspect);
        // Perform inspect
        inspectingBatch.inspect(
            i_energy,
            i_protein,
            i_carbohydrate,
            i_totalSugar,
            i_fat,
            i_satFat,
            i_natri,
            i_productionDate,
            i_expiryDate,
            i_inspectedDate
        );
        // Push batch to inspected batches
        inspectedBatches.push(batchToInspect);
        // Remove batch from batch to inpecct
        checkBatchAsInspected(batchToInspect);
    }

    // Get the inspected batch, move to the end of the array and perform delete
    function checkBatchAsInspected(address batchToMove) private {
        for (uint8 i = 0; i < batchesToInspect.length; i++) {
            if (batchesToInspect[i] == batchToMove) {
                if (i == batchesToInspect.length - 1) {
                    // If the batch is already at the end of the array
                    delete batchesToInspect[i];
                    return;
                }
                // Save the batch at index where address match batchToMove
                address temp = batchesToInspect[i];
                // Perform swap
                batchesToInspect[i] = batchesToInspect[
                    batchesToInspect.length - 1
                ];
                batchesToInspect[batchesToInspect.length - 1] = temp;
                delete batchesToInspect[batchesToInspect.length - 1];
            }
        }
    }

    //Get batches that have been inspected
    function getAllInspectedBatches() public view returns (address[] memory) {
        return inspectedBatches;
    }

    //Get all batches that haven't been inspected
    function getAllBatchesToInspect() public view returns (address[] memory) {
        return batchesToInspect;
    }

    //Get batch at specified index
    function getBatchAtIndex(uint8 index) public view returns (address) {
        return batchesToInspect[index];
    }
}
