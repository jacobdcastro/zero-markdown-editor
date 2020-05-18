import { markdownToDraft, draftToMarkdown } from 'markdown-draft-js';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

export const convertMdToDraft = (activeFile): EditorState => {
  const rawDraftObj = markdownToDraft(activeFile.content);
  const contentState = convertFromRaw(rawDraftObj);
  const newEditorState = EditorState.createWithContent(contentState);
  return newEditorState;
};

export const convertDraftToMd = (editorState: EditorState): string => {
  const content = editorState.getCurrentContent();
  const rawObject = convertToRaw(content);
  const markdownString = draftToMarkdown(rawObject);
  return markdownString;
};
