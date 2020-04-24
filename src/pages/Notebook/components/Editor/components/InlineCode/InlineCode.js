import React from 'react';
import { Code } from "@chakra-ui/core";

const InlineCode = props => <Code {...props.attributes}>{props.children}</Code>

export default InlineCode;