import React, { useEffect, useMemo, useState } from "react";
import { Grid, Flex, Box } from "@chakra-ui/core";
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react'

const Notebook = ({ notebookId }) => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ])

  return (
    <Grid
      templateColumns="250px 1fr"
      templateRows="1fr"
    >
      <Flex bg="blue.400">
        <div>Sidebar</div>
      </Flex>
      <Box
        bg="white"
        px={[2,4,8,16]}
        py={[2,4,6,10]}
        shadow="lg"
      >
        <Slate editor={editor} value={value} onChange={value => setValue(value)}>
          <Editable />
        </Slate>
      </Box>
    </Grid>
  )
}

export default Notebook;
