import React from 'react';
import { Flex, Editable, EditableInput, EditablePreview } from "@chakra-ui/core";
import PropTypes from 'prop-types';

const PageTitle = ({ title = 'Page Title', handleTextChange }) => {
  return (
    <Flex>
      <Editable 
        fontSize="3xl"
        defaultValue={title}
        onChange={text => handleTextChange('title', text)}
      >
        <EditablePreview />
        <EditableInput />
      </Editable>
    </Flex>
  )
}

PageTitle.propTypes = {
  title: PropTypes.string,
  handleTextChange: PropTypes.func
}

export default PageTitle;