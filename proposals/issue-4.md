# Prototype Document: Implement Graph Contract Tests for Node Types

## Feature Restatement
The proposal aims to enhance the graph-execution system by integrating contract tests for all node types (both custom and built-in). This integration ensures that every node used within graphs has an associated contract test, thereby reinforcing reliability and safety in executing graphs. The absence of tests could lead to untraced errors during execution; therefore, adding a `contractTestId` to the `SerializedNode` type is vital for referencing these tests automatically during execution.

## Design

### Data Shapes
The primary modification involves extending the existing `SerializedNode` interface.

```typescript
interface SerializedNode {
    id: string;
    allowedTools?: string[];
    inputs?: Array<NodeInput>;
    contractTestId?: string; // New field for contract testing
    // Other existing fields...
}
```

### Engine Hook Points
1. **Node Processing in Execution**: Modify `executeSubgraph` to include a check for the existence of `contractTestId`. Execute the corresponding contract test prior to processing the node.
2. **Test Execution Management**: Augment `runGraphTests` to filter and launch tests based on each node's `contractTestId`.
3. **Error Handling**: Emit an error message for nodes that fail their contract tests, halting further graph processing.

## Example

### Graph JSON Example
Here’s an example of how nodes can be configured in graph JSON to utilize contract tests:

```json
{
    "nodes": [
        {
            "id": "node1",
            "allowedTools": ["toolA"],
            "inputs": [],
            "contractTestId": "testNode1"
        },
        {
            "id": "node2",
            "allowedTools": ["toolB"],
            "inputs": [{ "from": "node1" }],
            "contractTestId": null // This node will not run contract tests
        }
    ],
    "edges": [
        { "from": "node1", "to": "node2" }
    ]
}
```

### Pseudo Code for Execution Logic

```typescript
function executeSubgraph(graph: Graph) {
    for (const node of graph.nodes) {
        if (node.contractTestId) {
            const testResult = runGraphTests(node.contractTestId);
            if (!testResult.passed) {
                throw new Error(`Contract test failed for node ${node.id}`);
            }
        }
        // Proceed with executing the node processing...
    }
}
```

### Unit Test Example
An example of a unit test could be:

```typescript
test('should not process graph with failing contract tests', () => {
    const graphWithFailingTest = getGraphWithFailingContractTest();
    expect(() => executeSubgraph(graphWithFailingTest)).toThrow('Contract test failed for node node1');
});
```

This prototype lays the groundwork for integrating contract tests seamlessly into the existing graph-execution framework, ensuring greater reliability and trust in node behavior.