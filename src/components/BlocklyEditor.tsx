
import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

const BlocklyEditor = forwardRef((props, ref) => {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspace = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    getCode: () => {
      if (workspace.current) {
        return generateJavaScriptCode(workspace.current);
      }
      return '';
    }
  }));

  useEffect(() => {
    if (blocklyDiv.current && !workspace.current) {
      // Initialize a simple block-based interface
      initializeBlockly();
    }
  }, []);

  const initializeBlockly = () => {
    // Create a simple visual block interface
    const container = blocklyDiv.current;
    if (!container) return;

    container.innerHTML = `
      <div class="blockly-toolbox bg-gray-100 p-4 rounded-lg">
        <h4 class="font-bold text-gray-700 mb-3">🧩 Drag Blocks Here:</h4>
        <div class="space-y-2">
          <div class="block-item bg-blue-500 text-white p-3 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors" 
               draggable="true" data-command="moveForward">
            ➡️ Move Forward
          </div>
          <div class="block-item bg-green-500 text-white p-3 rounded-lg cursor-pointer hover:bg-green-600 transition-colors" 
               draggable="true" data-command="turnLeft">
            ↩️ Turn Left
          </div>
          <div class="block-item bg-orange-500 text-white p-3 rounded-lg cursor-pointer hover:bg-orange-600 transition-colors" 
               draggable="true" data-command="turnRight">
            ↪️ Turn Right
          </div>
          <div class="block-item bg-purple-500 text-white p-3 rounded-lg cursor-pointer hover:bg-purple-600 transition-colors" 
               draggable="true" data-command="repeat">
            🔄 Repeat 3 times
          </div>
        </div>
      </div>
      <div class="blockly-workspace bg-white border-2 border-dashed border-gray-300 rounded-lg p-4 mt-4 min-h-[300px]">
        <h4 class="font-bold text-gray-700 mb-3">📝 Your Code:</h4>
        <div id="code-blocks" class="space-y-2 min-h-[200px]">
          <p class="text-gray-500 italic">Drop blocks here to build your code!</p>
        </div>
      </div>
    `;

    setupDragAndDrop();
  };

  const setupDragAndDrop = () => {
    const toolboxItems = blocklyDiv.current?.querySelectorAll('.block-item');
    const workspace = blocklyDiv.current?.querySelector('#code-blocks');

    toolboxItems?.forEach(item => {
      item.addEventListener('dragstart', (e: DragEvent) => {
        const target = e.target as HTMLElement;
        const command = target.dataset.command || '';
        e.dataTransfer?.setData('text/plain', command);
        e.dataTransfer?.setData('text/html', target.outerHTML);
        console.log('Dragging command:', command);
      });
    });

    workspace?.addEventListener('dragover', (e: DragEvent) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLElement;
      target.classList.add('border-blue-400', 'bg-blue-50');
    });

    workspace?.addEventListener('dragleave', (e: DragEvent) => {
      const target = e.currentTarget as HTMLElement;
      target.classList.remove('border-blue-400', 'bg-blue-50');
    });

    workspace?.addEventListener('drop', (e: DragEvent) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLElement;
      target.classList.remove('border-blue-400', 'bg-blue-50');
      
      const command = e.dataTransfer?.getData('text/plain');
      const html = e.dataTransfer?.getData('text/html');
      
      console.log('Dropping command:', command);
      console.log('Dropping HTML:', html);
      
      if (command && html) {
        addBlockToWorkspace(command, html);
      }
    });
  };

  const addBlockToWorkspace = (command: string, html: string) => {
    const workspace = blocklyDiv.current?.querySelector('#code-blocks');
    if (!workspace) return;

    // Remove placeholder text
    const placeholder = workspace.querySelector('p');
    if (placeholder) {
      placeholder.remove();
    }

    // Create new block element
    const blockDiv = document.createElement('div');
    blockDiv.innerHTML = html;
    const blockElement = blockDiv.firstElementChild as HTMLElement;
    
    if (blockElement) {
      // Ensure the command data attribute is preserved
      blockElement.setAttribute('data-command', command);
      blockElement.classList.add('workspace-block');
      blockElement.draggable = false;
      
      // Add delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = '❌';
      deleteBtn.className = 'ml-2 text-red-500 hover:text-red-700';
      deleteBtn.onclick = () => {
        blockElement.remove();
        // If no blocks left, show placeholder
        const remainingBlocks = workspace.querySelectorAll('.workspace-block');
        if (remainingBlocks.length === 0) {
          workspace.innerHTML = '<p class="text-gray-500 italic">Drop blocks here to build your code!</p>';
        }
      };
      blockElement.appendChild(deleteBtn);
      
      workspace.appendChild(blockElement);
      console.log('Added block with command:', command);
    }
  };

  const generateJavaScriptCode = (workspace: any) => {
    const blocks = blocklyDiv.current?.querySelectorAll('.workspace-block');
    const commands: string[] = [];
    
    console.log('Found blocks:', blocks?.length);
    
    blocks?.forEach(block => {
      const command = block.getAttribute('data-command');
      console.log('Block command:', command);
      if (command) {
        commands.push(command);
      }
    });
    
    console.log('Generated commands:', commands);
    return commands;
  };

  return (
    <div 
      ref={blocklyDiv} 
      className="w-full h-96 border rounded-lg bg-gray-50"
    />
  );
});

BlocklyEditor.displayName = 'BlocklyEditor';

export default BlocklyEditor;
