import fs from 'fs';
import { EditorState, convertToRaw } from 'draft-js';
import { draftToMarkdown } from 'markdown-draft-js';
import { File } from './buildFilesystemObj';

const contentHasChanged = (
  editorState: EditorState,
  fileNode: File
): boolean => {
  // get markdown content from filesystem
  const filesystemMd: string = fs.readFileSync(fileNode.path, 'utf8');

  // get markdown content from editor
  const content = editorState.getCurrentContent();
  const rawObject = convertToRaw(content);
  const editorMd: string = draftToMarkdown(rawObject);

  if (filesystemMd === editorMd) return false;
  return true;
};

export default contentHasChanged;
