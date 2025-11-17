import * as vscode from 'vscode';
import { ProfilerController } from './controllers/profilerController';

let controller: ProfilerController | undefined;

export async function activate(context: vscode.ExtensionContext) {
    console.log('SQL Server Profiler extension is now active');

    try {
        // Initialize the profiler controller
        controller = new ProfilerController(context);
        await controller.activate();

        // Log successful activation
        vscode.window.showInformationMessage('SQL Server Profiler extension activated!');
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        vscode.window.showErrorMessage(`Failed to activate SQL Server Profiler: ${message}`);
        console.error('Activation error:', error);
    }
}

export function deactivate() {
    if (controller) {
        controller.deactivate();
        controller = undefined;
    }
}
