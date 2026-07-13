import json
import re

transcript_path = '/Users/ajith/.gemini/antigravity/brain/9be9c638-9741-4e9f-8a89-99d1c90e3560/.system_generated/logs/transcript_full.jsonl'
lines = {}

with open(transcript_path, 'r') as f:
    for line_str in f:
        try:
            entry = json.loads(line_str)
            
            # We are looking for PLANNER_RESPONSE or RUN_COMMAND?
            # It's actually a TOOL_RESPONSE in older versions, but here it might be part of the `content` field
            # when `type` == 'TOOL_RESPONSE' or 'RUN_COMMAND' or whatever handles tool results.
            
            # Look at the content field of the entry
            content = entry.get('content', '')
            if 'Showing lines' in content and 'File Path:' in content and 'FormConversational.jsx' in content:
                # This is a view_file response
                code_part = content.split('The following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>. Please note that any changes targeting the original code should remove the line number, colon, and leading space.')[1]
                code_part = code_part.split('\nThe above content')[0]
                
                for code_line in code_part.split('\n'):
                    match = re.match(r'^(\d+): (.*)$', code_line)
                    if match:
                        num = int(match.group(1))
                        text = match.group(2)
                        lines[num] = text
        except Exception as e:
            pass

if lines:
    max_line = max(lines.keys())
    restored = []
    for i in range(1, max_line + 1):
        restored.append(lines.get(i, ''))
    
    with open('src/components/FormConversational.jsx', 'w') as f:
        f.write('\n'.join(restored))
    print(f"Restored {max_line} lines.")
else:
    print("Could not find lines.")
