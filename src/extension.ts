import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable1 = vscode.commands.registerCommand('sql-columns.selectColumnNamesinTopMostCTE', function() {
		// This command selects the columns in the top-most CTE
		// Get the active text editor
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			// Get the query
			let query = document.getText();
			
			// Use regex to find my marker
			var patt = /(?<=SELECT\s)([\s\S]*?)(?=\sFROM)/gim;
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
				const selectedText = document.getText(range);
				console.log('selected text: ', selectedText);
				
				// Select the text in active editor
				editor.selection = new vscode.Selection(range.start, range.end);
			}
		}
	});
	context.subscriptions.push(disposable1);

	let disposable2 = vscode.commands.registerCommand('sql-columns.selectColumnNamesinCurrentCTE', function() {
		// This command selects the columns in the current CTE based on the cursor location
		// Get the active text editor
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			// Get current cursor position
			let cursorPos = editor.selection.active;
			// Return TextLine
			//console.log(document.lineAt(cursorPos).range.start.character);
			//console.log(document.lineAt(cursorPos).range.end.character);

			vscode.commands.executeCommand('editor.action.jumpToBracket');
			console.log(vscode.Selection.toString);
			// Select a CTE that our cursor is on, which will be between matching brackets


			// This doesn't work: live selection is not reflected
			// https://stackoverflow.com/questions/64561781/vscode-api-get-position-of-last-character-of-line
			// vscode.commands.executeCommand('editor.action.selectToBracket');
			//const selection = editor.selection;
			//const selectionRange = 
			//const text = editor.document.getText(selection);
			//console.log('selected cte: ', text.toString);
		}
	});
	context.subscriptions.push(disposable2);
}

// This method is called when your extension is deactivated
export function deactivate() {}