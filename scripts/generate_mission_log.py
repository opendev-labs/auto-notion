import subprocess
import json
import os

def generate_log():
    # Use null bytes as separators to handle any characters in commit messages
    cmd = [
        'git', 'log', '-n', '60',
        '--pretty=format:%h%x00%s%x00%b%x00%ai'
    ]
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        lines = result.stdout.strip().split('\n')
        
        commits = []
        for line in lines:
            if not line:
                continue
            parts = line.split('\x00')
            if len(parts) >= 4:
                commits.append({
                    "hash": parts[0],
                    "title": parts[1],
                    "body": parts[2].strip(),
                    "date": parts[3]
                })
        
        output_path = os.path.join('docs', 'mission-log.json')
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        with open(output_path, 'w') as f:
            json.dump(commits, f, indent=2)
            
        print(f"Successfully generated {output_path} with {len(commits)} commits.")
        
    except subprocess.CalledProcessError as e:
        print(f"Error running git log: {e}")
        exit(1)
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        exit(1)

if __name__ == "__main__":
    generate_log()
