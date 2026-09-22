
# ================================================================= write
io.open(OUT, 'w', encoding='utf-8').write(h)
print(f'OK  {len(LOG)} edits applied  ->  {OUT} ({len(h)} bytes)')
