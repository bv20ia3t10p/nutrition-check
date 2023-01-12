export const insApi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "i_name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "i_energy",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "i_protein",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "i_carbohydrate",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "i_totalSugar",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "i_fat",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "i_satFat",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "i_natri",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "i_productionDate",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "i_expiryDate",
                "type": "string"
            }
        ],
        "name": "addBatch",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint8",
                "name": "index",
                "type": "uint8"
            }
        ],
        "name": "getBatchAtIndex",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "batchToInspect",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "i_energy",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "i_protein",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "i_carbohydrate",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "i_totalSugar",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "i_fat",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "i_satFat",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "i_natri",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "i_productionDate",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "i_expiryDate",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "i_inspectedDate",
                "type": "string"
            }
        ],
        "name": "inspect",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "inspector",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
export const batchApi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "i_inspector",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "i_name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "i_energy",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "i_protein",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "i_carbohydrate",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "i_totalSugar",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "i_fat",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "i_satFat",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "i_natri",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "i_productionDate",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "i_expiryDate",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "uint8",
                "name": "statType",
                "type": "uint8"
            }
        ],
        "name": "getStat",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "energy",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "protein",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "carbohydrate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalSugar",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "fat",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "saturatedFat",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "natri",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "productionDate",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "expiriyDate",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "inspectedDate",
                        "type": "string"
                    }
                ],
                "internalType": "struct Batch.foodStat",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint8",
                "name": "index",
                "type": "uint8"
            }
        ],
        "name": "getStatChecks",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "i_energy",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "i_protein",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "i_carbohydrate",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "i_totalSugar",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "i_fat",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "i_satFat",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "i_natri",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "i_productionDate",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "i_expiryDate",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "i_inspectedDate",
                "type": "string"
            }
        ],
        "name": "inspect",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "inspector",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "maxAllowedDiff",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
export const ins = '0x9Ff85D4feB0Bfe22704b685894FA85494f1153A6';