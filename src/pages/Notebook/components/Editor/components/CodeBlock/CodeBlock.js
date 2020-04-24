import React from 'react';
import { Code } from "@chakra-ui/core";

const CodeBlock = props => <Code {...props.attributes}>{props.children}</Code>

export default CodeBlock;