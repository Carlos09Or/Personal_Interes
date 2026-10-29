#!/usr/bin/env python3
"""Rebuild the dependency-free, offline-readable index.html from src/ and assets/.
Run: python3 build.py
No network or npm required.
"""
from pathlib import Path
import json
import re
BASE=Path(__file__).resolve().parent
css=(BASE/'src/styles.css').read_text(encoding='utf-8')
data=(BASE/'src/data.js').read_text(encoding='utf-8')+'\n'+(BASE/'src/radar.js').read_text(encoding='utf-8')
js=(BASE/'src/app.js').read_text(encoding='utf-8')
world=json.loads((BASE/'assets/world.json').read_text(encoding='utf-8'))
monitor=json.loads((BASE/'data/source-monitor-report.json').read_text(encoding='utf-8'))
monitor_js='window.ATLAS_MONITOR='+json.dumps(monitor,ensure_ascii=False,separators=(',',':'))+';'
world_js='window.ATLAS_WORLD='+json.dumps(world,ensure_ascii=False,separators=(',',':'))+';'
# Escape closing script sequence in generated JS.
js_all=(data+'\n'+world_js+'\n'+monitor_js+'\n'+js).replace('</script','<\\/script')
html=f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#f7f9fd">
<meta name="description" content="Your personal atlas of global hackathons, scholarships, AI conferences, research and mentorship programs.">
<title>Opportunity Atlas — Your personal opportunity map</title>
<style>{css}</style>
</head>
<body><div id="app"></div><script>{js_all}</script></body>
</html>'''
(BASE/'index.html').write_text(html,encoding='utf-8')
print('Built index.html:',(BASE/'index.html').stat().st_size,'bytes,',len(world),'countries')
