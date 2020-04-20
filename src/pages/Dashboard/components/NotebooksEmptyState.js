import React from 'react';
import { GiSpellBook } from 'react-icons/gi';
import { motion } from "framer-motion";
import { Box, Stack, Text } from '@chakra-ui/core';

const NotebookEmptyStateWrapper = motion.custom(Box)

const NotesbooksEmptyState = ({ onBlockClick }) => {
  return (
    <NotebookEmptyStateWrapper
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => onBlockClick()}
      rounded="lg"
      p="40px 60px"
      border="4px"
      borderColor="gray.600"
      w="100%"
		>
      <Stack w="100%" justifyContent="center" alignItems="center">
        <Box as={GiSpellBook} size="32px" color="gray.600" />
        <Text fontSize="xl" color="textDark" fontWeight="medium">Click here to add a notebook!</Text>
      </Stack>
		</NotebookEmptyStateWrapper>
  )
}

export default NotesbooksEmptyState;
