import '!style!css!./../../../../../node_modules/codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/xml/xml.js';
import '!style!css!./CodeEditorStyle.css';

import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import CodeMirror from 'codemirror';
import path from 'path';
import styles from './CodeEditor.css';

@Cerebral({
  recorder: ['course', 'recorder'],
  currentScene: 'currentScene',
  currentFile: 'currentFile'
})
class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.onEditorChange = this.onEditorChange.bind(this);
  }
  componentDidMount() {
    this.codemirror = CodeMirror(this.refs.code, {
      value: this.getCode(),
      mode: this.getMode(),
      theme: 'learncode',
      lineNumbers: true,
      tabSize: 2
    });
    this.codemirror.on('change', this.onEditorChange);
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.recorder.isPlaying ||
      this.props.recorder.started !== prevProps.recorder.started ||
      this.props.currentScene.currentFileIndex !== prevProps.currentScene.currentFileIndex
    ) {
      this.updateAllCode();
    }
  }
  getCode() {
    return this.props.currentFile.code || '';
  }
  updateAllCode() {
    const doc = this.codemirror.getDoc();
    const code = this.getCode();
    this.codemirror.setOption('mode', this.getMode());
    this.isMutatingCode = true;
    doc.setValue(code);
    this.isMutatingCode = false;

    if (!this.props.recorder.isPlaying) {
      this.codemirror.focus();
      this.codemirror.setCursor(this.codemirror.lineCount(), 0);
    }
  }
  getMode() {
    const modes = {
      '.html': 'xml',
      '.js': 'javascript',
      '.css': 'css'
    };
    const extension = path.extname(this.props.currentScene.currentFileName);

    return modes[extension] || 'xml';
  }
  onEditorChange(instance, event) {
    if (!this.isMutatingCode) {
      if (event.text.length === 2) {
        event.text = ['\n'];
      }

      this.props.signals.course.codeChanged({
        from: event.from,
        to: event.to,
        text: event.text
      });
    }
  }
  render() {
    return (
      <div ref="code" className={styles.editor}/>
    );
  }
}

export default CodeEditor;