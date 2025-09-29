import {
	readFileSync,
	writeFileSync,
	mkdirSync,
	existsSync,
	readdirSync,
	statSync,
} from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

/**
 * Generate gated content versions for component documentation
 *
 * This script:
 * 1. Finds all component markdown files (which contain FULL content)
 * 2. Generates two versions:
 *    - Gated version: Full content (copy of original to /gated/)
 *    - Public version: Truncated content (overwrites original with frontmatter + sign-up message)
 */

const SIGN_UP_MESSAGE = `
:::note
📖 **Want to see more?** Sign in to access interactive examples, detailed implementation guidelines, and comprehensive component documentation.

[Sign In](/auth/login/) | [Create Account](/auth/signup/)
:::
`;

function findMarkdownFiles(dir) {
	const files = [];
	const items = readdirSync(dir);

	for (const item of items) {
		const fullPath = join(dir, item);
		const stat = statSync(fullPath);

		if (stat.isFile() && item.endsWith('.md')) {
			files.push(fullPath);
		}
	}

	return files;
}

async function generateGatedContent() {
	console.log('🔄 Generating gated content versions...\n');

	// Find all component markdown files
	const componentsDir = join(projectRoot, 'src/pages/components');
	const componentFiles = findMarkdownFiles(componentsDir);

	let generated = 0;
	let errors = 0;

	for (const filePath of componentFiles) {
		try {
			// Read the FULL content from the original file
			const fullContent = readFileSync(filePath, 'utf-8');
			const fileName = filePath.split('/').pop();

			// Generate gated version path (copy full content here)
			const gatedPath = filePath.replace(
				'/pages/components/',
				'/pages/gated/components/'
			);
			const gatedDir = dirname(gatedPath);

			// Ensure gated directory exists
			if (!existsSync(gatedDir)) {
				mkdirSync(gatedDir, { recursive: true });
			}

			// Generate truncated public version
			const publicContent = truncateToPageHeader(fullContent);

			// Write files:
			// 1. Gated version gets FULL content
			writeFileSync(gatedPath, fullContent, 'utf-8');
			// 2. Public version gets TRUNCATED content (overwrite original)
			writeFileSync(filePath, publicContent, 'utf-8');

			console.log(`✅ ${fileName}`);
			console.log(
				`   Public: ${filePath.replace(projectRoot, '')} (truncated)`
			);
			console.log(
				`   Gated:  ${gatedPath.replace(projectRoot, '')} (full content)\n`
			);

			generated++;
		} catch (error) {
			console.error(`❌ Error processing ${filePath}:`, error.message);
			errors++;
		}
	}

	console.log(`\n✨ Done! Generated ${generated} gated content pairs`);
	if (errors > 0) {
		console.log(`⚠️  ${errors} errors encountered`);
		process.exit(1);
	}
}

/**
 * Truncate content after the frontmatter and add sign-up message
 *
 * Strategy: Keep only the frontmatter, then add sign-up message
 * The PageHeader component renders from frontmatter (title, description)
 * so we don't need to keep any markdown content for the public version
 */
function truncateToPageHeader(content) {
	// Match frontmatter (between --- markers)
	const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

	if (!frontmatterMatch) {
		console.warn('⚠️  No frontmatter found, keeping full content');
		return content;
	}

	const frontmatter = frontmatterMatch[0];

	// Return just frontmatter + sign-up message
	return `${frontmatter}\n${SIGN_UP_MESSAGE}\n`;
}

// Run the script
generateGatedContent().catch((error) => {
	console.error('Fatal error:', error);
	process.exit(1);
});
