import React, { useEffect, useMemo, useState } from "react";
import { Grid, Flex, Box } from "@chakra-ui/core";
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react'
import { useNotebook } from '../../hooks/useNotebook';
import Explorer from '../../components/Explorer';
import Editor from './components/Editor';
import PageTitle from './components/PageTitle';
import PageDescription from './components/PageDescription';

const Notebook = ({ notebookId }) => {
  const { getNotebook, createChapter, loading } = useNotebook();
  const editor = useMemo(() => withReact(createEditor()), [])
  const [selectedNotebook, setSelectedNotebook] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const [editorValue, setEditorValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ])

  useEffect(() => {
    const unsubscribe = async () => {
      try {
        const { notebook, coverPage } = await getNotebook(notebookId);
        setSelectedNotebook(notebook);
        setSelectedPage(coverPage);
        setEditorValue(coverPage.content)
      } catch (err) {
        console.log(err)
      }
    }

    unsubscribe();
  }, [])

  const handlePageChange = (key, val) => {
    setSelectedPage({
      ...selectedPage,
      [key]: val
    })
  }

  return (
    <Grid
      templateColumns="200px 1fr"
      templateRows="1fr"
    >
      <Flex>
        <Explorer />
      </Flex>
      <Box
        bg="white"
        px={12}
        py={6}
        shadow="lg"
        rounded="lg"
      >
        <PageTitle handleTextChange={handlePageChange} />
        <PageDescription handleTextChange={handlePageChange} />
        <Editor editorValue={editorValue} setEditorValue={setEditorValue} />
      </Box>
    </Grid>
  )
}

export default Notebook;
