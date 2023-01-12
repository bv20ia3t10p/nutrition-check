// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Batch {
    // Batch item is added and assigned inspector at the same time
    // For this development purpose, it'll be the account that create the contract
    address public immutable inspector;
    // Only inspector can perform certain functions (inspect)
    modifier onlyInspector() {
        // If the address calling this contract isn't the inspector's address, the function will stop and throw an error "You're not..."
        require(
            inspector == msg.sender,
            "You're not privileged to do this on the batch"
        );
        _;
    }
    struct foodStat {
        string name;
        uint256 energy; // In Kcal / KJ
        uint256 protein; // g
        uint256 carbohydrate; // g
        uint256 totalSugar; // g
        uint256 fat; // g
        uint256 saturatedFat; // g
        uint256 natri; // mg]
        string productionDate; // dd-mm-yyyy
        string expiriyDate; //dd-mm-yyyy
        string inspectedDate; //dd-mm-yyyy suppliedStat will be initialise with 0
    }
    foodStat private suppliedStat;
    foodStat private inspectedStat;
    //statChecks work the same as foodStat but with string for everything except for inspectedDate.
    //In this concept, expiryDate and productionDate MUST be the same for legal problems
    string[9] private statChecks;
    // Max allowed difference between provided stat and inspected stat
    uint8 public maxAllowedDiff = 1;

    // When getting new batch to inspect, manually insert these the original stat supplied from partner to create a new product resembling
    // the whole batch ( as a smart contract )

    // From inspect contract deploy this contract
    // Store each of these contract address into an array in Inspect contract
    constructor(
        // i stands for input
        address i_inspector,
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
    ) {
        inspector = i_inspector;
        suppliedStat.name = i_name;
        suppliedStat.energy = i_energy;
        suppliedStat.protein = i_protein;
        suppliedStat.carbohydrate = i_carbohydrate;
        suppliedStat.totalSugar = i_totalSugar;
        suppliedStat.fat = i_fat;
        suppliedStat.saturatedFat = i_satFat;
        suppliedStat.natri = i_natri;
        suppliedStat.productionDate = i_productionDate;
        suppliedStat.expiriyDate = i_expiryDate;
        suppliedStat.inspectedDate = "Not inspected";
    }

    function getStatChecks() public view returns (string[9] memory) {
        return statChecks;
    }

    // If 0, returns suppliedStat
    // If 1, returns inspectedStat
    // If 2, returns checks
    function getStat(uint8 statType) public view returns (foodStat memory) {
        if (statType == 0) {
            return suppliedStat;
        } else return inspectedStat;
    }

    function getDesignedInspector() public view returns (address) {
        return inspector;
    }

    //onlyInspector is the modifier for only assigned inspector (station) is allowed to do this, declared at top of contract
    function inspect(
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
        inspectedStat.name = suppliedStat.name;
        inspectedStat.energy = i_energy;
        inspectedStat.protein = i_protein;
        inspectedStat.carbohydrate = i_carbohydrate;
        inspectedStat.totalSugar = i_totalSugar;
        inspectedStat.fat = i_fat;
        inspectedStat.saturatedFat = i_satFat;
        inspectedStat.natri = i_natri;
        inspectedStat.productionDate = i_productionDate;
        inspectedStat.expiriyDate = i_expiryDate;
        inspectedStat.inspectedDate = i_inspectedDate;
        //Check if provided stat are up to actual stat
        //Loop from the first index to the 7th item in statChecks
        //Energy check
        statChecks[0] = checkIfUnderMaxAllowance(
            suppliedStat.energy,
            inspectedStat.energy
        );
        //Protein check
        statChecks[1] = checkIfUnderMaxAllowance(
            suppliedStat.protein,
            inspectedStat.protein
        );
        //carbohydrate check
        statChecks[2] = checkIfUnderMaxAllowance(
            suppliedStat.carbohydrate,
            inspectedStat.carbohydrate
        );
        //totalSugar check
        statChecks[3] = checkIfUnderMaxAllowance(
            suppliedStat.totalSugar,
            inspectedStat.totalSugar
        );
        //totalSugar check
        statChecks[4] = checkIfUnderMaxAllowance(
            suppliedStat.fat,
            inspectedStat.fat
        );
        //saturatedFat check
        statChecks[5] = checkIfUnderMaxAllowance(
            suppliedStat.saturatedFat,
            inspectedStat.saturatedFat
        );
        //natri check
        statChecks[6] = checkIfUnderMaxAllowance(
            suppliedStat.natri,
            inspectedStat.natri
        );
        //productionDate check
        //keccak256 is a hashing function
        //Solidity can't directly compare strings so this is one workaround
        statChecks[7] = keccak256(
            abi.encodePacked(suppliedStat.productionDate)
        ) == keccak256(abi.encodePacked(inspectedStat.productionDate))
            ? "Pass"
            : "Alert";
        //expiryDate check
        statChecks[8] = keccak256(abi.encodePacked(suppliedStat.expiriyDate)) ==
            keccak256(abi.encodePacked(inspectedStat.expiriyDate))
            ? "Pass"
            : "Alert";
    }

    function checkIfUnderMaxAllowance(
        uint256 supplied,
        uint256 inspected
    ) private view returns (string memory) {
        if (supplied > inspected) {
            if (supplied - inspected <= maxAllowedDiff) return "Pass";
            else return "Alert";
        } else {
            // If Insppected <= Supplied will make the difference be at most 0 and not negative
            if (inspected - supplied <= maxAllowedDiff) return "Pass";
            else return "Alert";
        }
    }
}
