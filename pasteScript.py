#!/usr/bin/env python3
print("python script running...")
script = open("src/webpage.js").read()
with open("src/contentScriptTemplate.js", "rt") as fin:
    with open("src/contentScript.js", "wt") as fout:
        for line in fin:
            fout.write(line.replace("###", script))


