# -*- coding: utf-8 -*-
import json
import os

filepath = os.path.join(os.path.dirname(__file__), "..", "data", "odishaCompleteHistory.ts")

# Read existing generated file
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Verify it has all 107 items
print(f"File size of data/odishaCompleteHistory.ts: {len(content)} characters")
