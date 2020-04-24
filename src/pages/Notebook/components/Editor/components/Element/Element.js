import React from 'react';
import { Text } from "@chakra-ui/core";
import BlockWrapper from '../BlockWrapper';
import CodeBlock from '../CodeBlock';

const Element = ({ attributes, children, element }) => {
  console.log('=== ELEMENT ===');
  console.log(element.type)
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    case 'code-block':
      return <BlockWrapper><CodeBlock {...attributes}>{children}</CodeBlock></BlockWrapper>
    default:
      return <BlockWrapper><Text fontSize="md" lineHeight="2rem" {...attributes}>{children}</Text></BlockWrapper>
  }
}

export default Element;