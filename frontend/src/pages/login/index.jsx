import "./login.css";
import { useEffect, useState } from "react";
import { Container, PasswordInput, Card, TextInput, Space, Button, Center, Anchor, Group } from '@mantine/core';
import { Avatar } from '@mantine/core';
import { useForm } from '@mantine/form';

const Login = props => {

	const [activeModal, setActiveModal] = useState('');

	const formLogin = useForm({
		initialValues: {
			email: '',
			password: '',
		},
		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
		},
	});

	const formRegister = useForm({
		initialValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
			confirmPassword: (value, values) => value !== values.password ? 'Passwords did not match' : null,
		},
	});

	const formForgotPassword = useForm({
		initialValues: {
			email: '',
		},
		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
		},
	});

	const goToRegister = () => {
		formLogin.reset();
		setActiveModal("register");
	}

	const goToForgotPassword = () => {
		formLogin.reset();
		formRegister.reset();
		setActiveModal("forgotpassword");
	}

	const backToLogin = () => {
		formRegister.reset();
		formForgotPassword.reset();
		setActiveModal("login");
	}

	const handleLogin = (e) => {
		console.log(e.email);
	}

	const handleRegister = (e) => {
		console.log(e.email);
	}

	const handleForgotPassword = (e) => {
		console.log(e.email);
	}

	useEffect(() => {
		setActiveModal("login");
	}, []);

	return (
		<>
			<Container className="main-login">
				{activeModal === "login" &&
					<Container className="container">
						<Card shadow="xl" p="lg" radius="xs" withBorder className="card">
							<Card.Section className="card-section">
								<Avatar size="xl" radius="xs" variant="filled" className="avatar" />
							</Card.Section>

							<Space h="xs" />

							<form onSubmit={formLogin.onSubmit((values) => handleLogin(values))}>
								<TextInput
									radius="xs"
									label="Email:"
									value=""
									{...formLogin.getInputProps('email')}
								/>

								<Space h="xs" />

								<PasswordInput
									radius="xs"
									label="Password:"
									{...formLogin.getInputProps('password')}
								/>

								<Space h="md" />

								<Group grow>
									<Button radius="xs" className="button" onClick={() => goToRegister()}>Register</Button>
									<Button radius="xs" className="button" type="submit">Login</Button>
								</Group>
							</form>

							<Space h="xs" />

							<Center>
								<Anchor color="black" size="sm" weight={500} onClick={() => goToForgotPassword()}>Forgot Password?</Anchor>
							</Center>
						</Card>
					</Container>
				}

				{activeModal === "register" &&
					<Container className="container">
						<Card shadow="xl" p="lg" radius="xs" withBorder className="card">
							<Card.Section className="card-section">
								<Avatar size="xl" radius="xs" variant="filled" className="avatar" />
							</Card.Section>
							<Space h="xs" />

							<form onSubmit={formRegister.onSubmit((values) => handleRegister(values))}>
								<TextInput
									radius="xs"
									label="Email:"
									{...formRegister.getInputProps('email')}
								/>
								<Space h="xs" />

								<TextInput
									radius="xs"
									label="Password:"
									{...formRegister.getInputProps('password')}
								/>
								<Space h="xs" />

								<TextInput
									radius="xs"
									label="Confirm Password:"
									{...formRegister.getInputProps('confirmPassword')}
								/>
								<Space h="md" />

								<Group grow>
									<Button radius="xs" className="button" onClick={() => backToLogin()}>Back</Button>
									<Button radius="xs" className="button" type="submit">Register</Button>
								</Group>
							</form>
						</Card>
					</Container>
				}

				{activeModal === "forgotpassword" &&
					<Container className="container">
						<Card shadow="xl" p="lg" radius="xs" withBorder className="card">
							<Card.Section className="card-section">
								<Avatar size="xl" radius="xs" variant="filled" className="avatar" />
							</Card.Section>
							<Space h="xs" />

							<form onSubmit={formForgotPassword.onSubmit((values) => handleForgotPassword(values))}>
								<TextInput
									radius="xs"
									label="Email:"
									{...formForgotPassword.getInputProps('email')}
								/>

								<Space h="md" />

								<Group grow>
									<Button radius="xs" className="button" onClick={() => backToLogin()}>Back</Button>
									<Button radius="xs" className="button" type="submit">Submit</Button>
								</Group>
							</form>
						</Card>
					</Container>
				}
			</Container>
		</>
	);
}
export default Login;
