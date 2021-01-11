import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect } from 'react';

export default function TextEditor({ height, onChange }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    onChange(value);
  }, [value])

  return (
    <ReactQuill theme="snow" value={value} onChange={setValue} style={{ height }} />
  )
}
