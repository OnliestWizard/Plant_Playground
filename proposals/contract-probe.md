# Contract Probe Feature Prototype

## Feature Restatement
The Contract Probe feature is designed to facilitate the inspection and validation of contract compliance within the graph-execution system. It aims to allow users to create probes that monitor specific elements or conditions of a contract and trigger alerts or actions based on contract thresholds or breaches.

## Design
### Data Shapes
- **Contract**: An object representing the terms, conditions, and entities involved in the contract.
  ```json
  {
    "id": "uuid",
    "parties": ["string"],
    "terms": {
      "thresholds": {
        "amount": "number",
        "percentage": "number",
        "date": "string"
      },
      "conditions": ["string"]
    },
    "status": "string"
  }
  ```

- **Probe**: An object that defines the parameters for monitoring contract conditions.
  ```json
  {
    "contractId": "uuid",
    "type": "string",
    "threshold": "number",
    "callbackUrl": "string"
  }
  ```

### Engine Hook Points
- **onContractStatusChange**: Triggered when a contract's status changes (e.g., active, breached).
- **onThresholdExceeded**: Triggered when predefined contract thresholds are exceeded.
- **onConditionMet**: Triggered when a specific condition in the contract is met.

## Example

### Graph JSON Example
```json
{
  "graph": {
    "nodes": [
      {
        "id": "contract-1",
        "type": "Contract",
        "data": {
          "parties": ["Party A", "Party B"],
          "terms": {
            "thresholds": {
              "amount": 100000,
              "percentage": 10,
              "date": "2024-12-31"
            },
            "conditions": ["Payment Due", "Performance Review"]
          },
          "status": "active"
        }
      },
      {
        "id": "probe-1",
        "type": "ContractProbe",
        "data": {
          "contractId": "contract-1",
          "type": "amount",
          "threshold": 100000,
          "callbackUrl": "http://example.com/alert"
        }
      }
    ],
    "edges": [
      {
        "source": "contract-1",
        "target": "probe-1",
        "type": "monitors"
      }
    ]
  }
}
```

This example defines a contract and a corresponding probe that monitors the amount threshold set in the contract's terms. Upon exceeding this threshold, an alert will be sent to the specified callback URL.