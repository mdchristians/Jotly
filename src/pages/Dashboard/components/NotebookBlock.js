import React from 'react';
import { Box, Stack, Text, IconButton} from "@chakra-ui/core";
import { motion } from "framer-motion";
import { GiTrashCan } from 'react-icons/gi';

const NotebookBlockWrapper = motion.custom(Box)

const NotebookBlock = ({
  title,
  description,
  onBlockClick
}) => {
  return (
    <NotebookBlockWrapper
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      bg="white"
      onClick={onBlockClick}
      rounded="lg"
      p="20px 30px"
      shadow="card"
		>
      <Stack isInline justifyContent="space-between" alignItems="center">
        <Text fontSize="lg" color="textDark" fontWeight="medium">{title}</Text>
        <IconButton
          variant="ghost"
          variantColor="red"
          aria-label="Delete Notebook"
          fontSize="24px"
          icon={GiTrashCan}
        />
      </Stack>
      <Text fontSize="md" color="gray.600" fontWeight="light">{description}</Text>
		</NotebookBlockWrapper>
  )
}

export default NotebookBlock;