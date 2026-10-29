#!/usr/bin/env python3
"""Polite and conservative source-change monitor.

Fetches explicitly curated public official pages, extracts HTML text, and detects
changes from the previous successful snapshot. It DOES NOT extract or invent
new opportunities or claim that an event opened. Always review publishers.

No dependencies outside Python standard library.
"""
from __future__ import annotations
import hashlib
from html.parser import HTMLParser
import json
import re
import time
from pathlib import Path
from urllib.request import Request,urlopen
from datetime import datetime,timezone

ROOT=Path(__file__).resolve().parent.parent
DATA=ROOT/'data'

class VisibleText(HTMLParser):
    def __init__(self):
        super().__init__();self.skip=0;self.chunks=[]
    def handle_starttag(self,tag,attrs):
        if tag in ('script','style','noscript','svg','footer'):
            self.skip+=1
    def handle_endtag(self,tag):
        if tag in ('script','style','noscript','svg','footer'):
            self.skip=max(0,self.skip-1)
    def handle_data(self,data):
        if not self.skip:
            chunk=' '.join(data.split())
            if len(chunk)>1:self.chunks.append(chunk)

def fetch_digest(url):
    if not url.startswith('https://'):
        raise ValueError('Only HTTPS official sources are allowed')
    req=Request(url,headers={'User-Agent':'OpportunityAtlasSourceMonitor/1.0 (personal education monitor)','Accept':'text/html'})
    with urlopen(req,timeout=18) as response:
        mime=response.headers.get('Content-Type','')
        if 'html' not in mime.lower():
            raise ValueError('URL did not serve HTML')
        raw=response.read(1_600_000)
    doc=VisibleText()
    doc.feed(raw.decode('utf-8',errors='ignore'))
    text=' '.join(doc.chunks)
    text=re.sub(r'\s+',' ',text).strip()[:100_000]
    if len(text)<80:raise ValueError('No meaningful public HTML content could be extracted')
    return hashlib.sha256(text.encode()).hexdigest()

def main():
    sources=json.loads((DATA/'official_sources.json').read_text(encoding='utf-8'))
    state=json.loads((DATA/'source-monitor-state.json').read_text(encoding='utf-8'))
    scanned=datetime.now(timezone.utc).isoformat(timespec='seconds')
    rows=[]
    for i,src in enumerate(sources):
        sid=src['id'];url=src['url'];prev=state.get(sid,{}).get('sha256')
        row={'id':sid,'name':src['name'],'url':url,'last_checked':scanned,'status':'error'}
        try:
            digest=fetch_digest(url)
            status='baseline' if not prev else 'changed' if digest!=prev else 'unchanged'
            row['status']=status
            state[sid]={'sha256':digest,'last_successful_check':scanned,'url':url}
        except Exception as exc:
            row['error']=str(exc)[:160]
        rows.append(row)
        print(f"{row['status']:9s} {src['name']}")
        if i<len(sources)-1:time.sleep(1.3)
    report={'generated_at':scanned,'checked':sum(x['status']!='error' for x in rows),
            'changed':sum(x['status']=='changed' for x in rows),
            'failed':sum(x['status']=='error' for x in rows),
            'sources':rows,
            'note':'A changed page is not proof of a new/open application. Confirm against the original announcement.'}
    (DATA/'source-monitor-state.json').write_text(json.dumps(state,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    (DATA/'source-monitor-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('Checked:',report['checked'],'Changed:',report['changed'],'Failed:',report['failed'])

if __name__=='__main__':main()
