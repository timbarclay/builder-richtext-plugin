import { Builder } from '@builder.io/react';
import ReactQuill from 'react-quill';
import React from 'react';
import { useObserver } from 'mobx-react'
const context = require('@builder.io/app-context').default;

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

function TestComponent() {
  return <div>Hello! I'm a test!</div>
}

Builder.register('appTab', {
  name: 'Test',
  path: 'test',
  component: TestComponent
})

function NotesTab(props) {
  const { data } = context.designerState.editingContentModel;
  return useObserver(() =>
    <textarea 
      value={data.get('notes')} 
      onChange={e => data.set('notes', e.target.value)} /> 
  );
}

Builder.register('editor.mainTab', {
  name: 'Notes',
  component: NotesTab,
})

function TailwindTab(props) {
  const { selection } = context.designerState;
  return useObserver(() => 
    <input title="color" type="number" onChange={e => {
      selection.forEach(el => {
        let value = e.target.value;
        el.properties.set('class', `text-gray-${value}`)
      })
     }} />
  );
}

Builder.register('editor.editTab', {
  name: 'Tailwind',
  component: TailwindTab,
})

function InsertTab(props) {
  return <>
    <div 
      onClick={() => 
        designerState.draggingInItem = 'Custom component 1' 
      } />
    <div 
      onClick={() => 
        designerState.draggingInItem = 'Custom component 2' 
      } />
  </>
}

Builder.register('editor.insertMenu', {
  component: InsertTab,
})

function WorkflowButton(props) {
  return <div onClick={launchApprovalModal}>
     Pending approval
  </div>
}

Builder.register('editor.toolbarButton', {
  component: WorkflowButton,
})