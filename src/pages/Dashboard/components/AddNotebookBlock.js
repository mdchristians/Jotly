import React from 'react';
import { Box, Stack, Text } from "@chakra-ui/core";
import { motion } from "framer-motion";
import { AiOutlineFileAdd } from 'react-icons/ai';

const AddNotebookBlockWrapper = motion.custom(Box)

const AddNotebookBlock = ({
  onBlockClick
}) => {
  return (
    <AddNotebookBlockWrapper
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onBlockClick}
      rounded="lg"
      p="20px 30px"
      cursor="pointer"
      border="2px"
      borderColor="gray.300"
		>
      <Stack justifyContent="center" alignItems="center">
        <Box mb={4} as={AiOutlineFileAdd} size="32px" color="textMuted" />
        <Text fontSize="lg" color="textMuted" fontWeight="medium">Add a new notebook!</Text>
      </Stack>
		</AddNotebookBlockWrapper>
  )
}

export default AddNotebookBlock;