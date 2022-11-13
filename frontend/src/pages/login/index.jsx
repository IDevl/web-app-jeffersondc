import "./login.css";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Container, PasswordInput, Card, TextInput, Space, Button, Center, Anchor, Group, Modal, Title } from '@mantine/core';
import { Avatar } from '@mantine/core';
import { useForm } from '@mantine/form';

const Login = props => {

	const [activeModal, setActiveModal] = useState('');
	const [successModal, setSuccessModal] = useState(false);
	const [successTitleLabel, setSuccessTitleLabel] = useState('');
	const [successButtonLabel, setSuccessButtonLabel] = useState('');

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
			email: (value) => (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? null : 'Invalid email'),
			password: (value) => (value.length < 6 ? 'Password must have at least 6 characters' : null),
			confirmPassword: (value, values) => value !== values.password ? 'Passwords did not match' : null,
		},
	});

	const formForgotPassword = useForm({
		initialValues: {
			email: '',
		},
		validate: {
			email: (value) => (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? null : 'Invalid email'),
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
		setSuccessModal(false);
	}
	
	const handleRegister = (e) => {
		axios.post(`${process.env.REACT_APP_API_URL}`, {
			request: "register",
			email: e.email,
			password: e.password
		})
			.then((response) => {
				if (response.data === "Email already taken!") {
					formRegister.setErrors({ email: response.data });
				}
				if (response.data === "Success") {
					setSuccessTitleLabel("Successfully registered!");
					setSuccessButtonLabel("Back to Login");
					setSuccessModal(true);
				}
			});
	}

	const handleLogin = (e) => {
		axios.post("https://web-app-jeffersondc.vercel.app/", {
			request: "login",
			email: e.email,
			password: e.password
		})
			.then((response) => {
				if (response.data === "Email does not exists!") {
					formLogin.setErrors({ email: response.data });
				}
				else if (response.data === "Wrong password!") {
					formLogin.setErrors({ password: response.data });
				}
				else {
					localStorage.setItem("user", JSON.stringify(response.data));
					window.location.reload(false);
				}
			});
	}

	const handleForgotPassword = (e) => {
		axios.post(`${process.env.REACT_APP_API_URL}`, {
			request: "forgotpassword",
			email: e.email,
		})
			.then((response) => {
				if (response.data === "Email does not exists!") {
					formForgotPassword.setErrors({ email: response.data });
				}
				else {
					setSuccessTitleLabel(response.data);
					setSuccessButtonLabel("Back to Login");
					setSuccessModal(true);
				}
			});
	}

	useEffect(() => {
		setActiveModal("login");
	}, []);

	return (
		<>
			<Container className="main-login">
				<Modal centered withCloseButton size="xs" radius="xs" opened={successModal} onClose={() => setSuccessModal(false)}>
					<Title align="center" order={4}>{successTitleLabel}</Title>
					<Group grow mt="sm">
						<Button radius="xs" className="button" onClick={()=>backToLogin()}>{successButtonLabel}</Button>
					</Group>
				</Modal>

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
