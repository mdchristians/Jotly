import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Text, Box, Button, useToast } from "@chakra-ui/core";
import { AnimatePresence, motion } from "framer-motion";
import { navigate } from "@reach/router";
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
	const [credentials, setCredentials] = useState({ email: '', password: '' });
	const toast = useToast();
	const { login } = useAuth();

  const onLoginClick = async () => {
    try {
      await login(credentials);
      navigate('/');
    } catch(err) {
      toast({
				position: "top-right",
				title: err.code,
				description: err.message,
				status: "error",
				duration: 9000,
				isClosable: true,
			})
    }
  };

  const inputHandler = e => {
    setCredentials({
      ...credentials,
      [e.target.name.toLowerCase()]: e.target.value
    })
  }
  
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <MotionCard>
				<form autoComplete="off" onSubmit={e => e.preventDefault()}>
					<FormInput
            name="Email"
						value={credentials.email}
						onChange={e => inputHandler(e)}
					/>
					<FormInput
						name="Password"
						type="password"
						value={credentials.password}
						onChange={e => inputHandler(e)}
					/>
					<FormButton onClick={() => onLoginClick()}>Submit</FormButton>
				</form>
			</MotionCard>
    </AnimatePresence>
  )
}

function MotionCard({ children }) {
	return (
		<motion.div
			key="error"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<Box w="450px" px="60px">{children}</Box>
		</motion.div>
	)
}

function FormInput({ name, value, type, onChange, errorMessage }) {
	return (
		<FormControl my={3}>
			<FormLabel htmlFor={name}>{name}</FormLabel>
			<Input
				name={name}
				type={type}
				autoComplete="off"
				value={value}
				onChange={onChange}
			/>
			<Text variant="warning">{errorMessage || "\xa0"}</Text>
		</FormControl>
	)
}

function FormButton({ onClick, children, disabled }) {
	return (
		<Button w="100%" mt={1} disabled={disabled} onClick={onClick} variant="gradient">
			{children}
		</Button>
	)
}

export default Login;
