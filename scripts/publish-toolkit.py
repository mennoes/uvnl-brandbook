#!/usr/bin/env python3
"""Stage a publication only if the destination still matches its recorded source.
Never pushes. The caller commits/pushes normally to preserve history and catch races.
"""
from pathlib import Path
import subprocess, sys, tempfile, shutil, hashlib, re
ROOT = Path(__file__).resolve().parents[1]
# Last live revision before this recovery; explicitly reviewed and incorporated.
RECOVERY_BASE = '22e737a0248576d84b1dbb6d8b401e71459a0e7a'
EXCLUDED = {'data', 'feedback', 'TOOLKIT.md'}

def git(*args, cwd=None):
    return subprocess.check_output(['git', *args], cwd=cwd or ROOT)

def assemble(revision, destination):
    destination.mkdir(parents=True, exist_ok=True)
    # Read only tracked files at the chosen source commit.
    paths = git('ls-tree', '-r', '--name-only', revision, 'vooruitblik').decode().splitlines()
    for name in paths:
        relative = Path(name).relative_to('vooruitblik')
        if relative.parts[0] in EXCLUDED:
            continue
        target = destination / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(git('show', f'{revision}:{name}'))
    (destination / '404.html').write_bytes(git('show', f'{revision}:404.html'))
    (destination / 'CNAME').write_text('vooruitblik.universiteitvanvlaanderen.be\n')
    (destination / '.nojekyll').touch()
    (destination / '.source-revision').write_text(revision + '\n')

def fingerprint(directory):
    return {str(p.relative_to(directory)): hashlib.sha256(p.read_bytes()).hexdigest()
            for p in directory.rglob('*') if p.is_file() and '.git' not in p.relative_to(directory).parts}

def stage(destination):
    source = git('rev-parse', 'HEAD').decode().strip()
    target_head = git('rev-parse', 'HEAD', cwd=destination).decode().strip()
    if git('status', '--porcelain', cwd=destination).strip():
        raise RuntimeError('Publicatiemap bevat lokale wijzigingen; niets overschreven.')
    marker = destination / '.source-revision'
    with tempfile.TemporaryDirectory() as temp:
        temp = Path(temp)
        if marker.exists():
            previous = marker.read_text().strip()
            if not re.fullmatch(r'[0-9a-f]{40}', previous):
                raise RuntimeError('Ongeldig bronversienummer; niets overschreven.')
            assemble(previous, temp / 'previous')
            if fingerprint(destination) != fingerprint(temp / 'previous'):
                raise RuntimeError('Website rechtstreeks gewijzigd sinds vorige publicatie. Neem die wijzigingen eerst over in uvnl-brandbook/vooruitblik; niets overschreven.')
        elif target_head != RECOVERY_BASE:
            raise RuntimeError('Onbekende websiteversie zonder bronverwijzing; niets overschreven.')
        assemble(source, temp / 'next')
        for path in destination.iterdir():
            if path.name == '.git': continue
            if path.is_dir(): shutil.rmtree(path)
            else: path.unlink()
        shutil.copytree(temp / 'next', destination, dirs_exist_ok=True)

if __name__ == '__main__':
    stage(Path(sys.argv[1]).resolve())
