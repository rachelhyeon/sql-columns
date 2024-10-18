import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('sql-columns.selectCurrentCTECols', function() {
		// Get the active text editor
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			// Get the query
			let query = document.getText();
			
			// Use regex to find my marker
			// const re = RegExp("(?<=select)([\s\S]*?)(?=from)");
			var patt = /(?<=select)([\s\S]*?)(?=from)/gm;
			var match = patt.exec(query);

			if (match) {
				// Find start and end positions of match
				const minMatchPosition = match.index;
				const maxMatchPosition = patt.lastIndex;
				
				// Create Range object using start and end positions
				let minPos = document.positionAt(minMatchPosition);
				let maxPos = document.positionAt(maxMatchPosition);
				console.log('min cursor position: ', minPos);
				console.log('max cursor position: ', maxPos);
				const range = new vscode.Range(minPos, maxPos);
				console.log('range: ', range);

				// Get the text within the range
				const highlightText = document.getText(range);
				console.log('highlighted text: ', highlightText);
				
				// Select the text in active editor
				editor.selection = new vscode.Selection(range.start, range.end);
			}
		}});
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
