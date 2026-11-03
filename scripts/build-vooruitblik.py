#!/usr/bin/env python3
"""Compatibility entry point: validate the hand-maintained static toolkit.

Since the recovery of 2026-11-03, vooruitblik/*.html and hoofdstuk/*.html
are the authoritative source. Do not regenerate them from old JSON/templates:
that would discard the editorial updates recovered from the published repository.
See vooruitblik/TOOLKIT.md.
"""
import runpy
from pathlib import Path
runpy.run_path(str(Path(__file__).with_name("check-toolkit.py")), run_name="__main__")
