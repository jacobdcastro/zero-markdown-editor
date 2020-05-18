import React, {
  createContext,
  useState,
  SetStateAction,
  Dispatch
} from 'react';
import { useSelector } from 'react-redux';

interface Value {
  md: string;
  setMd: Dispatch<SetStateAction<string>>;
}

export const MarkdownContext = createContext<Value>({
  md: '',
  setMd: () => {}
});

export const MarkdownContextProvider = (props: any) => {
  const currentMd: string = useSelector(state => state.activeFile.content);
  const [md, setMd] = useState<string>(currentMd);

  return (
    <MarkdownContext.Provider value={{ md, setMd }}>
      {props.children}
    </MarkdownContext.Provider>
  );
};
