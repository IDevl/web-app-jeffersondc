import "./career.css";
import { useState, useEffect } from "react";
import { Container, Grid, Title, Card, Group, Text, TextInput, Modal, Button, Textarea } from "@mantine/core";
import { DatePicker } from '@mantine/dates';
import { Plus } from 'tabler-icons-react';
import { useForm } from '@mantine/form';
import moment from 'moment';
import axios from 'axios';

const Career = props => {

	const user = props.user;

	const [careers, setCareers] = useState([]);

	const [addModalOpen, setAddModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	const [targetDate, setTargetDate] = useState(new Date());
	const [completedDate, setCompletedDate] = useState(new Date());

	const [selectedCareerId, setSelectedCareerId] = useState('');
	const [selectedCareerName, setSelectedCareerName] = useState('');
	const [selectedCareerDescription, setSelectedCareerDescription] = useState('');
	const [selectedCareerTargetDate, setSelectedCareerTargetDate] = useState('');
	const [selectedCareerCompletedDate, setSelectedCareerCompletedDate] = useState('');

	const [errorModal, setErrorModal] = useState(false);
	const [error, setError] = useState('');

	const formAddCareer = useForm({
		initialValues: {
			career_name: '',
			career_description: '',
			career_targetDate: '',
			career_completedDate: ''
		},
		validate: {
			career_targetDate: (value, values) => value === '' ? 'Please set a Target Date' : null,
			career_completedDate: (value, values) => value === '' || value > values.career_targetDate ? 'Must be on or before the Target Date' : null,
		},
	});

	const formEditCareer = useForm({
		initialValues: {
			career_name: '',
			career_description: '',
			career_targetDate: '',
			career_completedDate: ''
		},
		validate: {
			career_completedDate: (value, values) => value > values.career_targetDate ? 'Must be less than or equal to Target Date' : null,
		},
	});


	const SelectCareerEdit = (e) => {
		axios.post(`${process.env.REACT_APP_API_URL}`, {
			request: "getcareerdata",
			email: user.email,
			career_id: e
		})
			.then((response) => {
				setSelectedCareerId(response.data.career_id);
				setSelectedCareerName(response.data.career_name);
				setSelectedCareerDescription(response.data.career_description);
				setSelectedCareerTargetDate(response.data.career_targetDate);
				setSelectedCareerCompletedDate(response.data.career_completedDate);
				formEditCareer.setValues({
					career_name: selectedCareerName,
					career_description: selectedCareerDescription,
					career_targetDate: new Date(response.data.career_targetDate),
					career_completedDate: new Date(response.data.career_targetDate)
				})
				setEditModalOpen(true);
			});
	}

	const SelectCareerDelete = (e) => {
		axios.post(`${process.env.REACT_APP_API_URL}`, {
			request: "getcareerdata",
			email: user.email,
			career_id: e
		})
			.then((response) => {
				setSelectedCareerId(response.data.career_id);
				setSelectedCareerName(response.data.career_name);
				setDeleteModalOpen(true);
			});
	}

	const DeleteCareer = (e) => {
		axios.post(`${process.env.REACT_APP_API_URL}`, {
			request: "deletecareer",
			email: user.email,
			career_id: e
		})
			.then((response) => {
				if (response.data === "Career Deleted.") {
					setDeleteModalOpen(false);
					setError(response.data);
					setErrorModal(true);
				}
				else {
					setError(response.data);
					setErrorModal(true);
				}
			});
	}

	const handleAddCareer = (e) => {
		var formattedTargetDate = moment(e.career_targetDate).format("MMMM DD, YYYY");
		var formattedCompletedDate = moment(e.career_completedDate).format("MMMM DD, YYYY");

		axios.post(`${process.env.REACT_APP_API_URL}`, {
			request: "addcareer",
			email: user.email,
			career_name: e.career_name,
			career_description: e.career_description,
			career_targetDate: formattedTargetDate,
			career_completedDate: formattedCompletedDate
		})
			.then((response) => {
				if (response.data === "Career added successfully!") {
					setAddModalOpen(false);
					setError(response.data);
					setErrorModal(true);
				}
				else {
					setError(response.data);
					setErrorModal(true);
				}
			});
	}

	const handleEditCareer = (e) => {
		var formattedTargetDate = moment(e.career_targetDate).format("MMMM DD, YYYY");
		var formattedCompletedDate = moment(e.career_completedDate).format("MMMM DD, YYYY");

		axios.post(`${process.env.REACT_APP_API_URL}`, {
			request: "editcareer",
			email: user.email,
			career_id: selectedCareerId,
			career_name: e.career_name,
			career_description: e.career_description,
			career_targetDate: formattedTargetDate,
			career_completedDate: formattedCompletedDate
		})
			.then((response) => {
				if (response.data === "Career edited successfully!") {
					setEditModalOpen(false);
					setError(response.data);
					setErrorModal(true);
				}
				else {
					setError(response.data);
					setErrorModal(true);
				}
			});
	}

	const reloadPage = () => {
		setErrorModal(false);
		setAddModalOpen(false);
		setEditModalOpen(false);
		setDeleteModalOpen(false);
		showAllCareers();
		formAddCareer.reset();
		formEditCareer.reset();
		setSelectedCareerId('');
		setSelectedCareerName('');
		setSelectedCareerDescription('');
		setSelectedCareerTargetDate('');
		setSelectedCareerCompletedDate('');
	}

	const showAllCareers = () => {
		axios.post(`${process.env.REACT_APP_API_URL}`,
			{ email: user.email, request: "showcareers" }).then((response) => {
				setCareers(response.data);
			});
	}

	useEffect(() => {
		showAllCareers();
	}, []);



	return (
		<>
			<Container className="main-career">
				<Container className="container">
					<Title className="heading2">Career Objective</Title>
				</Container>

				<Container className="container" my="xl">
					<Grid mt="sm" columns={3} justify="start">
						{careers.map(careers => {
							return (
								<Grid.Col span={1} style={{ minWidth: "320px" }}>
									<Card withBorder shadow="sm" p="lg" radius="md">
										<Group spacing="xs">
											<Title order={5}>ID:</Title>
											<Text weight={400}>{careers.career_id}</Text>
										</Group>
										<Group spacing="xs">
											<Title order={5}>Name:</Title>
											<Text weight={400}>{careers.career_name}</Text>
										</Group>
										<Group spacing="xs">
											<Title order={5}>Description:</Title>
											<Text weight={400}>{careers.career_description}</Text>
										</Group>
										<Group spacing="xs">
											<Title order={5}>Target:</Title>
											<Text weight={400}>{careers.career_targetDate}</Text>
										</Group>
										<Group spacing="xs">
											<Title order={5}>Completion:</Title>
											<Text weight={400}>{careers.career_completedDate}</Text>
										</Group>
										<Group grow>
											<Button mt="xs" radius="xs" color="red" onClick={(e) => SelectCareerDelete(careers.career_id)}>Delete</Button>
											<Button mt="xs" radius="xs" color="dark" onClick={(e) => SelectCareerEdit(careers.career_id)}>Edit</Button>
										</Group>
									</Card>
								</Grid.Col>
							)
						})
						}

						<Grid.Col>
							<Button variant="outline" radius="xs" color="dark" onClick={() => setAddModalOpen(true)}><Plus size={24} /></Button>
						</Grid.Col>
					</Grid>
				</Container>

				<Modal centered withCloseButton size="md" radius="xs" opened={addModalOpen} onClose={() => reloadPage()}>
					<form onSubmit={formAddCareer.onSubmit((values) => handleAddCareer(values))}>
						<TextInput
							mt="xs"
							radius="xs"
							label="Name"
							required
							{...formAddCareer.getInputProps('career_name')}
						/>
						<Textarea
							mt="xs"
							radius="xs"
							label="Description"
							required
							{...formAddCareer.getInputProps('career_description')}
						/>
						<DatePicker
							mt="xs"
							radius="xs"
							label="Target Date"
							inputFormat="MMMM DD, YYYY"
							clearable={false}
							value={targetDate}
							onChange={setTargetDate}
							placeholder="Pick a date"
							required
							{...formAddCareer.getInputProps('career_targetDate')}
						/>
						<DatePicker
							mt="xs"
							radius="xs"
							label="Completed Date"
							inputFormat="MMMM DD, YYYY"
							clearable={false}
							value={completedDate}
							onChange={setCompletedDate}
							placeholder="Pick a date"
							required
							{...formAddCareer.getInputProps('career_completedDate')}
						/>
						<Group grow mt="lg">
							<Button variant="outline" radius="xs" color="dark" onClick={() => reloadPage()}>Cancel</Button>
							<Button radius="xs" color="dark" type="submit">Add</Button>
						</Group>
					</form>
				</Modal>

				<Modal centered withCloseButton size="md" radius="xs" opened={editModalOpen} onClose={() => reloadPage()}>
					<form onSubmit={formEditCareer.onSubmit((values) => handleEditCareer(values))}>
						<Group>
							<Text size={14} weight={700}>ID: {selectedCareerId}</Text>
						</Group>
						<TextInput
							mt="xs"
							radius="xs"
							label="Name"
							required
							placeholder={selectedCareerName}
							{...formEditCareer.getInputProps('career_name')}
						/>
						<Textarea
							mt="xs"
							radius="xs"
							label="Description"
							required
							placeholder={selectedCareerDescription}
							{...formEditCareer.getInputProps('career_description')}
						/>
						<DatePicker
							mt="xs"
							radius="xs"
							label="Target Date"
							inputFormat="MMMM DD, YYYY"
							clearable={false}
							value={targetDate}
							onChange={setTargetDate}
							placeholder={selectedCareerTargetDate}
							required
							{...formEditCareer.getInputProps('career_targetDate')}
						/>
						<DatePicker
							mt="xs"
							radius="xs"
							label="Completed Date"
							inputFormat="MMMM DD, YYYY"
							clearable={false}
							value={completedDate}
							onChange={setCompletedDate}
							placeholder={selectedCareerCompletedDate}
							required
							{...formEditCareer.getInputProps('career_completedDate')}
						/>
						<Group grow mt="lg">
							<Button variant="outline" radius="xs" color="dark" onClick={() => reloadPage()}>Cancel</Button>
							<Button radius="xs" color="dark" type="submit">Edit</Button>
						</Group>
					</form>
				</Modal>

				<Modal centered withCloseButton size="md" radius="xs" opened={deleteModalOpen} onClose={() => reloadPage()}>
					<Container grow>
						<Text size={18} weight={400}>Are you sure you want to delete <strong>{selectedCareerName}</strong> with <br></br><strong>ID: {selectedCareerId}</strong>?</Text>

					</Container>
					<Group grow mt="lg">
						<Button variant="outline" radius="xs" color="dark" onClick={() => reloadPage()}>Cancel</Button>
						<Button radius="xs" color="red" onClick={(e) => DeleteCareer(selectedCareerId)}>Delete</Button>
					</Group>
				</Modal>

				<Modal centered withCloseButton size="xs" radius="xs" opened={errorModal} onClose={() => reloadPage()}>
					<Title align="center" order={4}>{error}</Title>
					<Group grow mt="sm">
						<Button radius="xs" className="button" onClick={() => reloadPage()}>OK</Button>
					</Group>
				</Modal>

			</Container>
		</>
	);
}

export default Career;
