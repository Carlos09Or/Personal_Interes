#!/usr/bin/env python3
"""Build a portable calendar from user-supplied Radar Global records, with exact TZIDs and alerts."""
import json, re
from datetime import date,timedelta,datetime,timezone
from pathlib import Path
BASE=Path(__file__).resolve().parents[1]
raw=(BASE/'src/radar.js').read_text()
events=json.loads(re.search(r'window\.ATLAS_RADAR_EVENTS = (\[.*?\]);\nwindow\.ATLAS_RADAR_OPPORTUNITIES',raw,re.S).group(1))
assert len(events)==20

def clean(s):
 return str(s or '').replace('\\','\\\\').replace(';','\\;').replace(',','\\,').replace('\n','\\n')
def dd(s): return s.replace('-','')
def fold(line):
 lines=[];piece=''
 for ch in line:
  if len((piece+ch).encode('utf8'))>74:
   lines.append(piece);piece=' '+ch
  else:piece+=ch
 lines.append(piece)
 return lines
lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Opportunity Atlas//Radar Global 2026//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH','X-WR-CALNAME:Opportunity Atlas - Personal Radar',
 'BEGIN:VTIMEZONE','TZID:America/Panama','BEGIN:STANDARD','DTSTART:19700101T000000','TZOFFSETFROM:-0500','TZOFFSETTO:-0500','TZNAME:EST','END:STANDARD','END:VTIMEZONE',
 'BEGIN:VTIMEZONE','TZID:America/New_York','BEGIN:DAYLIGHT','DTSTART:19700308T020000','TZOFFSETFROM:-0500','TZOFFSETTO:-0400','TZNAME:EDT','RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU','END:DAYLIGHT','BEGIN:STANDARD','DTSTART:19701101T020000','TZOFFSETFROM:-0400','TZOFFSETTO:-0500','TZNAME:EST','RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU','END:STANDARD','END:VTIMEZONE']
for e in events:
 lines+=['BEGIN:VEVENT',f"UID:{e['id']}@opportunity-atlas.local",f"DTSTAMP:{datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')}",f"SUMMARY:{clean(e['title']+(' (tentative)' if e['tentative'] else ''))}"]
 if e['startTime']:
  lines += [f"DTSTART;TZID={e['timezone']}:{dd(e['start'])}T{e['startTime'].replace(':','')}00",f"DTEND;TZID={e['timezone']}:{dd(e['start'])}T{e['endTime'].replace(':','')}00"]
  r='RRULE:FREQ=WEEKLY;BYDAY='+','.join(e['weekdays'])
  if e['until']:r+=';UNTIL='+dd(e['until'])+'T235959Z'
  lines.append(r)
 else:
  end=(date.fromisoformat(e['end'])+timedelta(days=1)).strftime('%Y%m%d')
  lines += [f"DTSTART;VALUE=DATE:{dd(e['start'])}",f"DTEND;VALUE=DATE:{end}"]
 lines.append('STATUS:TENTATIVE' if e['tentative'] else 'STATUS:CONFIRMED')
 if e['url']:lines.append('URL:'+e['url'])
 if e['location']:lines.append('LOCATION:'+clean(e['location']))
 desc='\n'.join(z for z in [e['status'] and 'Status: '+e['status'],e['notes'],e['url'],e['origin']] if z)
 lines.append('DESCRIPTION:'+clean(desc))
 for m in e['reminders']:
  val='-PT15M' if m==15 else '-P'+str(m//1440)+'D'
  lines += ['BEGIN:VALARM','ACTION:DISPLAY','TRIGGER:'+val,'DESCRIPTION:'+clean(e['title']),'END:VALARM']
 lines.append('END:VEVENT')
lines.append('END:VCALENDAR')
text='\r\n'.join(part for ln in lines for part in fold(ln))+'\r\n'
out=BASE/'calendar'/'Radar-Global-2026-2027.ics';out.parent.mkdir(exist_ok=True)
out.write_bytes(text.encode('utf8'))
print(out, 'bytes',out.stat().st_size,'VEVENT',text.count('BEGIN:VEVENT'),'VALARM',text.count('BEGIN:VALARM'))
