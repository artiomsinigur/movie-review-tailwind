#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

/**
 * FOUNDRY CLI: Internal Task Runner
 * This script handles basic maintenance tasks across the project.
 */

const [, , task, ...args] = process.argv;

/**
 * Clean Task: Removes directories/files safely.
 * Usage: foundry clean [dir1] [dir2]
 */
const clean = (dirs) => {
    const targets = dirs.length > 0 ? dirs : ['dist', 'node_modules'];
    
    targets.forEach((dir) => {
        const targetPath = path.resolve(process.cwd(), dir);

        if (fs.existsSync(targetPath)) {
            try {
                fs.rmSync(targetPath, { recursive: true, force: true });
                console.log(`✅ Cleaned: ${dir}`);
            } catch (error) {
                console.error(`❌ Failed to clean ${dir}:`, error.message);
            }
        }
    });
};

// Dispatcher
switch (task) {
    case 'clean':
        clean(args);
        break;
    default:
        console.log(`Unknown task: ${task}. Use clean`)
        process.exit(task ? 1 : 0);
}
