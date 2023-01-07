// SPDX-License-Indentifier: MIT
pragma solidity ^0.8.9;

contract Batch {
    string public name;
    struct foodStat {
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
    foodStat public suppliedStat;
    foodStat public inspectedStat;

    // When getting new batch to inspect, manually insert these the original stat supplied from partner to create a new product resembling
    // the whole batch ( as a smart contract )
    constructor(
        // i stans for input
        string memory i_name,
        uint256 i_energy,
        uint256 i_protein,
        uint256 i_carbohydrate,
        uint256 i_totalSugar,
        uint256 i_fat,
        uint256 i_satFat,
        uint256 i_natri
    ) {
        name = i_name;
        suppliedStat.energy = i_energy;
        suppliedStat.protein = i_protein;
        suppliedStat.carbohydrate = i_carbohydrate;
        suppliedStat.totalSugar = i_totalSugar;
        suppliedStat.fat = i_fat;
        suppliedStat.saturatedFat = i_satFat;
        suppliedStat.natri = i_natri;
    }
}
