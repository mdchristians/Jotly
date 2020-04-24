import React from 'react';
import { Box, Stack, Avatar, Link } from "@chakra-ui/core";
import { navigate } from '@reach/router';

const Header = () => (
  <Box
    display="flex"
    flexDirection="row"
    alignItems="center"
    h="100%"
    justifyContent="space-between"
    px="5"
  >
    <Stack isInline shouldWrapChildren alignItems="center" spacing={3} onClick={() => navigate('/')}>
      <Avatar
        size="md"
        name="J"
        fontSize="3xl"
        backgroundColor="blue.500"
      />
      <Link color="gray.500">Jotly</Link>
    </Stack>
    <Stack>
      <Avatar
        size="md"
        src="https://pbs.twimg.com/profile_images/680946062509654016/qtw018Pt_reasonably_small.jpg"
      >
      </Avatar>
    </Stack>
  </Box>
)

export default Header;