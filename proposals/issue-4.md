# Graph Contract Tests for Node Types Prototype Document

## Feature Restatement
This prototype implements Graph Contract Tests to enforce that all node types (both custom and built-in) used within graphs have associated contract tests, thereby increasing trust in the library and ensuring the safety of node behaviors during execution. By introducing a `contractTestId` attribute within the node definition, we can automatically validate that nodes undergo necessary tests before being processed, preventing potential erroneous outputs from untested nodes.

## Design

### Data Shapes

#### Updated `SerializedNode` Definition

```typescript
interface SerializedNode {
    id: string;
    allowedTools?: string[];
    inputs?: Array<NodeInput>;
    contractTestId?: string; // New field for contract testing
    // ... other existing fields
}
```

### Engine Hook Points

1. **Graph Execution Logic**: Modify the `executeSubgraph` method to include a check for `contractTestId`. If present, trigger the test associated with that ID before processing the node.

2. **Test Execution Management**: Enhance the `runGraphTests` function to filter nodes by their `contractTestId` and fetch the relevant tests from the store. 

3. **Error Handling**: Emit an error and halt graph execution if any contract test fails, mirroring the behavior for top-level tests.

## Example

### Code Example for Graph Execution Logic

```typescript
function executeSubgraph(graph: SerializedGraph) {
    for (const node of graph.nodes) {
        if (node.contractTestId) {
            const testResult = runContractTest(node.contractTestId);
            if (!testResult.success) {
                throw new Error(`Contract test failed for node ${node.id}: ${testResult.message}`);
            }
        }
        // Continue to process the node...
    }
}

function runContractTest(contractTestId: string) {
    // Logic to fetch and execute the contract test...
    return { success: true }; // or { success: false, message: '...' }
}
```

### Example Graph JSON Configuration

```json
{
    "nodes": [
        {
            "id": "node1",
            "allowedTools": ["tool1"],
            "inputs": [],
            "contractTestId": "test123" // Node with contract test
        },
        {
            "id": "node2",
            "allowedTools": ["tool2"],
            "inputs": [],
            // No contract test defined for this node
        }
    ]
}
```

By implementing the above structure, we ensure that the graph execution system can enforce contract tests on all nodes, paving the way for a robust, error-less execution methodology.