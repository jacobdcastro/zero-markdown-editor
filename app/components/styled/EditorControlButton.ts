import styled from 'styled-components';

const EditorControlButton = styled.button`
  margin: 3px;
  padding: 5px;
  color: #555;
  background-color: transparent;
  border: none;
  border-radius: 3px;

  &:hover {
    background-color: #555;
    color: #ccc;
  }

  .active {
    background-color: #555;
    color: #ccc;
  }
`;

export default EditorControlButton;
