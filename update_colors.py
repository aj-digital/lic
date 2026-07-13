import re

def update_colors(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Left nav active circle background
    content = content.replace("#10b981", "#00529B", 1)
    
    # Left nav active line (make it Yellow for accent)
    content = content.replace("#10b981", "#F4B301", 1)

    # Continue Button Background
    content = content.replace("backgroundColor: '#0f172a'", "backgroundColor: '#00529B'")
    
    # Continue Button Hover
    content = content.replace("backgroundColor: '#1e293b'", "backgroundColor: '#003D73'")
    
    # Text headers
    # "PART 1 OF 3" color
    content = content.replace("color: 'primary.main'", "color: '#00529B'")

    with open(filepath, 'w') as f:
        f.write(content)

update_colors('src/components/FormConversational.jsx')
update_colors('src/components/ResultSummary.jsx')
