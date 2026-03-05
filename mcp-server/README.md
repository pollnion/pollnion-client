# Pollnion Code Analysis MCP Server

Custom MCP (Model Context Protocol) server for analyzing the Pollnion Client codebase.

## Setup

```bash
cd mcp-server
npm install
npm run build
```

## Running

```bash
npm run dev
```

## Tools Provided

- **analyze_file** - Analyze a TypeScript/TSX file and extract imports, exports, and structure
- **find_files** - Find files matching a pattern (components, hooks, utils, tests, types)
- **get_project_structure** - Get an overview of the project directory structure
- **list_components** - List all React components in the project
- **analyze_component** - Detailed analysis of a React component

## Configuration

The MCP server is configured in `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "pollnion-analysis": {
      "command": "node",
      "args": ["/path/to/pollnion-client/mcp-server/build/server.js"],
      "env": {}
    }
  }
}
```

## Example Usage

Ask Claude: "List all components" or "Analyze the Button component"
