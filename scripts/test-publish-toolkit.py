#!/usr/bin/env python3
"""Exercise publication drift detection with small, isolated Git repositories."""
import importlib.util, pathlib, subprocess, tempfile, unittest
spec=importlib.util.spec_from_file_location('publisher', pathlib.Path(__file__).with_name('publish-toolkit.py'))
publisher=importlib.util.module_from_spec(spec); spec.loader.exec_module(publisher)

def git(root,*args):
    return subprocess.check_output(['git', '-C', str(root), *args], stderr=subprocess.DEVNULL).decode().strip()
def init(root):
    root.mkdir();git(root,'init','-q');git(root,'config','user.email','test@example.invalid');git(root,'config','user.name','Test')
def commit(root):
    git(root,'add','-A');git(root,'commit','-qm','test');return git(root,'rev-parse','HEAD')

class PublicationTest(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory();self.addCleanup(self.temp.cleanup)
        self.root=pathlib.Path(self.temp.name);self.source=self.root/'source';self.target=self.root/'target'
        init(self.source);init(self.target)
        (self.source/'vooruitblik').mkdir();(self.source/'vooruitblik/index.html').write_text('restored content')
        (self.source/'vooruitblik/data').mkdir();(self.source/'vooruitblik/data/private.json').write_text('{}')
        (self.source/'404.html').write_text('not found');commit(self.source)
        (self.target/'index.html').write_text('old live content')
        publisher.RECOVERY_BASE=commit(self.target);publisher.ROOT=self.source
    def test_recovery_and_subsequent_publication(self):
        publisher.stage(self.target);commit(self.target)
        self.assertEqual((self.target/'index.html').read_text(),'restored content')
        self.assertFalse((self.target/'data').exists())
        (self.source/'vooruitblik/index.html').write_text('next content');commit(self.source)
        publisher.stage(self.target)
        self.assertEqual((self.target/'index.html').read_text(),'next content')
    def test_direct_live_edit_is_preserved_and_blocks_publication(self):
        publisher.stage(self.target);commit(self.target)
        (self.target/'index.html').write_text('new editorial correction');commit(self.target)
        before=publisher.fingerprint(self.target)
        with self.assertRaisesRegex(RuntimeError,'rechtstreeks gewijzigd'):
            publisher.stage(self.target)
        self.assertEqual(before,publisher.fingerprint(self.target))
    def test_unknown_initial_version_is_preserved(self):
        (self.target/'extra.html').write_text('unreviewed edit');commit(self.target)
        before=publisher.fingerprint(self.target)
        with self.assertRaisesRegex(RuntimeError,'Onbekende websiteversie'):
            publisher.stage(self.target)
        self.assertEqual(before,publisher.fingerprint(self.target))

if __name__=='__main__': unittest.main()
