#!/usr/bin/env python3
import subprocess
import json
import os
import sys

# Field Separator (US) and Record Separator (RS)
FS = '\x1f'
RS = '\x1e'

def generate_log():
    # Use standard ASCII separators to handle any characters in commit messages
    # RS separates commits, FS separates fields within a commit
    cmd = [
        'git', 'log', '-n', '60',
        f'--pretty=format:%h{FS}%s{FS}%b{FS}%ai{RS}'
    ]
    
    print(f"Executing: {' '.join(cmd)}", file=sys.stderr)
    
    try:
        # Use subprocess to get raw bytes
        result = subprocess.run(cmd, capture_output=True, check=True)
        raw_output = result.stdout.decode('utf-8', errors='replace')
        
        if not raw_output.strip():
            print("Error: git log returned no output.", file=sys.stderr)
            sys.exit(1)
        
        records = raw_output.split(RS)
        commits = []
        
        for record in records:
            record = record.strip() # Remove leading/trailing whitespace including newlines between records
            if not record:
                continue
            parts = record.split(FS)
            if len(parts) >= 4:
                commits.append({
                    "hash": parts[0].strip(),
                    "title": parts[1].strip(),
                    "body": parts[2].strip(),
                    "date": parts[3].strip()
                })
            else:
                # Log but skip malformed records
                print(f"Skipping malformed record: {len(parts)} parts found", file=sys.stderr)
        
        if not commits:
            print("Error: No valid commits processed.", file=sys.stderr)
            sys.exit(1)
            
        output_path = os.path.join('docs', 'mission-log.json')
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        # Write with UTF-8 and beautiful indentation
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(commits, f, indent=2, ensure_ascii=False)
            
        print(f"Successfully generated {output_path} with {len(commits)} commits.")
        
    except subprocess.CalledProcessError as e:
        print(f"Error running git log: {e.stderr.decode() if e.stderr else e}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"An unexpected error occurred: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    generate_log()
