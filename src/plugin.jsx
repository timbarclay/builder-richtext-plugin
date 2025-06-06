import { Builder } from '@builder.io/react';
import ReactQuill from 'react-quill';
import React from 'react';

function RichTextEditor(props) {
  return (
    <ReactQuill
      value={props.value}
      onChange={props.onChange}
    />
  );
}

Builder.registerEditor({
    name: 'MyText',
    component: RichTextEditor
});