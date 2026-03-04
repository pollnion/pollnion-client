import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { Octokit } from '@octokit/rest';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { z } from 'zod';
const PROJECT_ROOT = join(import.meta.url.replace('file://', ''), '../../../');
const SRC_DIR = join(PROJECT_ROOT, 'src');
const APP_DIR = join(PROJECT_ROOT, 'app');
// GitHub configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = 'pollnion';
const GITHUB_REPO = 'client';
const octokit = new Octokit({
    auth: GITHUB_TOKEN,
});
const server = new McpServer({
    name: 'pollnion-code-analysis',
    version: '1.0.0',
});
// === CODE ANALYSIS TOOLS ===
server.tool('analyze_file', 'Analyze a TypeScript/TSX file and extract imports, exports, and structure', z.object({
    file_path: z.string().describe('Relative path to the file (e.g., src/components/Button.tsx)'),
}), async (args) => {
    const filePath = args.file_path;
    const fullPath = join(PROJECT_ROOT, filePath);
    const content = readFileSync(fullPath, 'utf-8');
    const imports = content.match(/import\s+[\s\S]*?from\s+['"][^'"]+['"]/g) || [];
    const exports = content.match(/export\s+(default\s+)?(function|const|class|interface|type)\s+(\w+)/g) || [];
    return {
        content: [
            {
                type: 'text',
                text: JSON.stringify({
                    file: filePath,
                    size: content.length,
                    lines: content.split('\n').length,
                    imports: imports.map((i) => i.replace(/^import\s+/, '').split('from')[1]),
                    exports: exports.map((e) => e.match(/\w+$/)?.[0]),
                    preview: content.slice(0, 500),
                }, null, 2),
            },
        ],
    };
});
server.tool('find_files', 'Find files matching a pattern (components, hooks, utils, tests, etc.)', z.object({
    type: z
        .enum(['components', 'hooks', 'utils', 'tests', 'types', 'all'])
        .describe('Type of files to search for'),
    pattern: z.string().optional().describe('Optional filename pattern to filter by'),
}), async (args) => {
    const type = args.type;
    const pattern = args.pattern;
    const extensions = {
        components: ['.tsx', '.ts'],
        hooks: ['.ts', '.tsx'],
        utils: ['.ts', '.tsx'],
        tests: ['.test.ts', '.test.tsx'],
        types: ['.ts'],
        all: ['.ts', '.tsx'],
    };
    const searchDirs = type === 'tests' ? [SRC_DIR] : [SRC_DIR, APP_DIR];
    const exts = extensions[type] || ['.ts', '.tsx'];
    const files = [];
    for (const dir of searchDirs) {
        try {
            const entries = readdirSync(dir, { recursive: true });
            for (const entry of entries) {
                const ext = entry.toString().slice(entry.toString().lastIndexOf('.'));
                if (exts.includes(ext)) {
                    const relPath = relative(PROJECT_ROOT, join(dir, entry.toString()));
                    if (!pattern || relPath.includes(pattern)) {
                        files.push(relPath);
                    }
                }
            }
        }
        catch {
            // Directory doesn't exist
        }
    }
    return {
        content: [
            {
                type: 'text',
                text: `Found ${files.length} files:\n${files.join('\n')}`,
            },
        ],
    };
});
server.tool('get_project_structure', 'Get an overview of the project directory structure', z.object({
    depth: z.number().optional().describe('How deep to traverse (default: 2)'),
}), async (args) => {
    const depth = args.depth || 2;
    const structure = getDirectoryStructure(PROJECT_ROOT, 0, depth);
    return {
        content: [
            {
                type: 'text',
                text: structure,
            },
        ],
    };
});
server.tool('list_components', 'List all React components in the project', z.object({}), async () => {
    const components = listComponents();
    return {
        content: [
            {
                type: 'text',
                text: `Found ${components.length} components:\n${components.join('\n')}`,
            },
        ],
    };
});
server.tool('analyze_component', 'Detailed analysis of a React component', z.object({
    component_name: z.string().describe('Name of the component (e.g., Button, Modal)'),
}), async (args) => {
    const componentName = args.component_name;
    const components = listComponents();
    const found = components.find((c) => c.toLowerCase().includes(componentName.toLowerCase()));
    if (!found) {
        return {
            content: [
                {
                    type: 'text',
                    text: `Component "${componentName}" not found`,
                },
            ],
        };
    }
    const fullPath = join(PROJECT_ROOT, found);
    const content = readFileSync(fullPath, 'utf-8');
    return {
        content: [
            {
                type: 'text',
                text: `Component: ${found}\n\n${content.slice(0, 1000)}...`,
            },
        ],
    };
});
// === GITHUB TOOLS ===
server.tool('get_repo_info', 'Get repository information (stars, forks, language, etc.)', z.object({}), async () => {
    if (!GITHUB_TOKEN) {
        return {
            content: [
                {
                    type: 'text',
                    text: 'GitHub token not configured. Set GITHUB_TOKEN environment variable.',
                },
            ],
            isError: true,
        };
    }
    const repo = await octokit.repos.get({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
    });
    return {
        content: [
            {
                type: 'text',
                text: JSON.stringify({
                    name: repo.data.name,
                    description: repo.data.description,
                    stars: repo.data.stargazers_count,
                    forks: repo.data.forks_count,
                    language: repo.data.language,
                    topics: repo.data.topics,
                    url: repo.data.html_url,
                    updated_at: repo.data.updated_at,
                }, null, 2),
            },
        ],
    };
});
server.tool('list_issues', 'List issues in the repository', z.object({
    state: z
        .enum(['open', 'closed', 'all'])
        .optional()
        .describe('Filter by issue state (default: open)'),
    limit: z.number().optional().describe('Maximum number of issues to return (default: 10)'),
}), async (args) => {
    if (!GITHUB_TOKEN) {
        return {
            content: [
                {
                    type: 'text',
                    text: 'GitHub token not configured. Set GITHUB_TOKEN environment variable.',
                },
            ],
            isError: true,
        };
    }
    const state = args.state || 'open';
    const limit = args.limit || 10;
    const issues = await octokit.issues.listForRepo({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        state,
        per_page: limit,
    });
    const formatted = issues.data.map((issue) => ({
        number: issue.number,
        title: issue.title,
        state: issue.state,
        created_at: issue.created_at,
        labels: issue.labels.map((l) => (typeof l === 'string' ? l : l.name)),
    }));
    return {
        content: [
            {
                type: 'text',
                text: JSON.stringify(formatted, null, 2),
            },
        ],
    };
});
server.tool('list_prs', 'List pull requests in the repository', z.object({
    state: z
        .enum(['open', 'closed', 'all'])
        .optional()
        .describe('Filter by PR state (default: open)'),
    limit: z.number().optional().describe('Maximum number of PRs to return (default: 10)'),
}), async (args) => {
    if (!GITHUB_TOKEN) {
        return {
            content: [
                {
                    type: 'text',
                    text: 'GitHub token not configured. Set GITHUB_TOKEN environment variable.',
                },
            ],
            isError: true,
        };
    }
    const state = args.state || 'open';
    const limit = args.limit || 10;
    const prs = await octokit.pulls.list({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        state,
        per_page: limit,
    });
    const formatted = prs.data.map((pr) => ({
        number: pr.number,
        title: pr.title,
        state: pr.state,
        author: pr.user?.login,
        created_at: pr.created_at,
        labels: pr.labels.map((l) => (typeof l === 'string' ? l : l.name)),
    }));
    return {
        content: [
            {
                type: 'text',
                text: JSON.stringify(formatted, null, 2),
            },
        ],
    };
});
server.tool('get_issue', 'Get details for a specific issue', z.object({
    issue_number: z.number().describe('Issue number'),
}), async (args) => {
    if (!GITHUB_TOKEN) {
        return {
            content: [
                {
                    type: 'text',
                    text: 'GitHub token not configured. Set GITHUB_TOKEN environment variable.',
                },
            ],
            isError: true,
        };
    }
    const issueNumber = args.issue_number;
    const issue = await octokit.issues.get({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        issue_number: issueNumber,
    });
    return {
        content: [
            {
                type: 'text',
                text: JSON.stringify({
                    number: issue.data.number,
                    title: issue.data.title,
                    state: issue.data.state,
                    body: issue.data.body,
                    author: issue.data.user?.login,
                    created_at: issue.data.created_at,
                    updated_at: issue.data.updated_at,
                    labels: issue.data.labels.map((l) => (typeof l === 'string' ? l : l.name)),
                    comments: issue.data.comments,
                }, null, 2),
            },
        ],
    };
});
server.tool('get_pr', 'Get details for a specific pull request', z.object({
    pr_number: z.number().describe('Pull request number'),
}), async (args) => {
    if (!GITHUB_TOKEN) {
        return {
            content: [
                {
                    type: 'text',
                    text: 'GitHub token not configured. Set GITHUB_TOKEN environment variable.',
                },
            ],
            isError: true,
        };
    }
    const prNumber = args.pr_number;
    const pr = await octokit.pulls.get({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        pull_number: prNumber,
    });
    return {
        content: [
            {
                type: 'text',
                text: JSON.stringify({
                    number: pr.data.number,
                    title: pr.data.title,
                    state: pr.data.state,
                    body: pr.data.body,
                    author: pr.data.user?.login,
                    created_at: pr.data.created_at,
                    updated_at: pr.data.updated_at,
                    merged_at: pr.data.merged_at,
                    additions: pr.data.additions,
                    deletions: pr.data.deletions,
                    changed_files: pr.data.changed_files,
                    labels: pr.data.labels.map((l) => (typeof l === 'string' ? l : l.name)),
                }, null, 2),
            },
        ],
    };
});
server.tool('list_commits', 'List recent commits to the main branch', z.object({
    limit: z.number().optional().describe('Maximum number of commits to return (default: 10)'),
}), async (args) => {
    if (!GITHUB_TOKEN) {
        return {
            content: [
                {
                    type: 'text',
                    text: 'GitHub token not configured. Set GITHUB_TOKEN environment variable.',
                },
            ],
            isError: true,
        };
    }
    const limit = args.limit || 10;
    const commits = await octokit.repos.listCommits({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        per_page: limit,
    });
    const formatted = commits.data.map((commit) => ({
        sha: commit.sha.slice(0, 7),
        message: commit.commit.message.split('\n')[0],
        author: commit.commit.author?.name,
        date: commit.commit.author?.date,
    }));
    return {
        content: [
            {
                type: 'text',
                text: JSON.stringify(formatted, null, 2),
            },
        ],
    };
});
// === HELPER FUNCTIONS ===
function getDirectoryStructure(dir, indent, maxDepth) {
    if (indent >= maxDepth)
        return '';
    let result = '';
    try {
        const entries = readdirSync(dir);
        for (const entry of entries) {
            if (entry.startsWith('.'))
                continue;
            const fullPath = join(dir, entry);
            const stats = statSync(fullPath);
            const prefix = '  '.repeat(indent) + '├─ ';
            if (stats.isDirectory()) {
                result += `${prefix}${entry}/\n`;
                result += getDirectoryStructure(fullPath, indent + 1, maxDepth);
            }
            else {
                result += `${prefix}${entry}\n`;
            }
        }
    }
    catch {
        // Skip inaccessible directories
    }
    return result;
}
function listComponents() {
    const components = [];
    try {
        const srcFiles = readdirSync(SRC_DIR, { recursive: true });
        for (const file of srcFiles) {
            const str = file.toString();
            if ((str.endsWith('.tsx') || str.endsWith('.ts')) && str.includes('components')) {
                components.push(relative(PROJECT_ROOT, join(SRC_DIR, str)));
            }
        }
    }
    catch {
        // Directory doesn't exist
    }
    return components;
}
// === START SERVER ===
const transport = new StdioServerTransport();
await server.connect(transport);
console.error('Pollnion Code Analysis MCP Server running');
