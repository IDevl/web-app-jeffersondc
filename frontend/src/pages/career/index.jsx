import "./career.css";
import { useState } from "react";
import { Container, Grid, Title, Card, Group, Text, TextInput, Modal, Button, Textarea } from "@mantine/core";
import { DatePicker } from '@mantine/dates';
import { Plus } from 'tabler-icons-react';
import { useForm } from '@mantine/form';
import moment from 'moment';
import axios from 'axios';

const Career = props => {

	const [addModalOpen, setAddModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [targetDate, setTargetDate] = useState(new Date());
	const [completedDate, setCompletedDate] = useState(new Date());
	const [selectedCareerId, setSelectedCareerId] = useState('');

	const formAddCareer = useForm({
		initialValues: {
			name: '',
			description: '',
			targetDate: new Date(new Date().setHours(0, 0, 0, 0)),
			completedDate: new Date(new Date().setHours(0, 0, 0, 0))
		},
	});

	const formEditCareer = useForm({
		initialValues: {
			name: '',
			description: '',
			targetDate: new Date(new Date().setHours(0, 0, 0, 0)),
			completedDate: new Date(new Date().setHours(0, 0, 0, 0))
		},
	});

	
	const EditCareer = (e) => {
		console.log(e);
	}

	const SelectCareer = (e) => {
		setSelectedCareerId("1");
		setDeleteModalOpen(true);
	}

	const DeleteCareer = (e) => {
		console.log(selectedCareerId);
	}

	const handleAddCareer = (e) => {
		var formattedTargetDate = moment(e.targetDate).format("MMMM DD, YYYY");
		var formattedCompletedDate = moment(e.completedDate).format("MMMM DD, YYYY");

		axios.post(`${process.env.REACT_APP_API_URL}`, {
			request: "addcareer",
			id: e.id,
			name: e.name,
			descritipion: e.description,
			targetDate: formattedTargetDate,
			completedDate: formattedCompletedDate
		})
			.then((response) => {
				if (response.data === "Success") {
					
				}
				else {

				}
			});
	}

	const handleEditCareer = (e) => {
		var formattedTargetDate = moment(e.targetDate).format("MMMM DD, YYYY");
		var formattedCompletedDate = moment(e.completedDate).format("MMMM DD, YYYY");

		axios.post(`${process.env.REACT_APP_API_URL}`, {
			request: "editcareer",
			id: e.id,
			name: e.name,
			descritipion: e.description,
			targetDate: formattedTargetDate,
			completedDate: formattedCompletedDate
		})
			.then((response) => {
				if (response.data === "Success") {
					
				}
				else {

				}
			});
	}



	return (
		<>
			<Container className="main-career">
				<Container className="container">
					<Title className="heading2">Career Objective</Title>
				</Container>

				<Container className="container" my="xl">
					<Title className="heading3">Certifications</Title>
					<Grid mt="sm" grow>
						<Grid.Col>
							<Card withBorder shadow="sm" p="lg" radius="md">
								<Group spacing="xs">
									<Title order={5}>ID:</Title>
									<Text weight={400}>123</Text>
								</Group>
								<Group spacing="xs">
									<Title order={5}>Name:</Title>
									<Text weight={400}>aaaaaaaaaaa</Text>
								</Group>
								<Title order={5}>Description:</Title>
								<Text weight={400}>aaaaaaaaaawdawdawdawdaaadwad</Text>
								<Group spacing="xs">
									<Title order={5}>Target Date:</Title>
									<Text weight={400}>aaaaaaaaaaa</Text>
								</Group>
								<Group spacing="xs">
									<Title order={5}>Completed Date:</Title>
									<Text weight={400}>aaaaaaaaaaa</Text>
								</Group>
								<Group grow>
									<Button mt="xs" radius="xs" color="dark" onClick={()=>setEditModalOpen(true)}>Edit</Button>
									<Button mt="xs" radius="xs" color="red" onClick={(e)=>SelectCareer(e)}>Delete</Button>
								</Group>
							</Card>
						</Grid.Col>

						<Grid.Col>
							<Button variant="outline" radius="xs" color="dark" onClick={()=>setAddModalOpen(true)}><Plus size={24}/></Button>
						</Grid.Col>
					</Grid>
				</Container>

				<Modal centered withCloseButton size="md" radius="xs" opened={addModalOpen} onClose={() => setAddModalOpen(false)}>
					<form onSubmit={formAddCareer.onSubmit((values) => handleAddCareer(values))}>
						<Group>
							<Text size={14} weight={700}>ID: {"1"}</Text> 
							</Group>
						<TextInput
							mt="xs"
							radius="xs"
							label="Name"
							required
							{...formAddCareer.getInputProps('name')}
						/>
						<Textarea
							mt="xs"
							radius="xs"
							label="Description"
							required
							{...formAddCareer.getInputProps('description')}
						/>
						<DatePicker
							mt="xs"
							radius="xs"
							label="Target Date"
							inputFormat="MMMM DD, YYYY"
							clearable={false} 
							value={targetDate}
							onChange={setTargetDate}
							required
							{...formAddCareer.getInputProps('targetDate')}
						/>
						<DatePicker
							mt="xs"
							radius="xs"
							label="Completed Date"
							inputFormat="MMMM DD, YYYY"
							clearable={false} 
							value={completedDate}
							onChange={setCompletedDate}
							required
							{...formAddCareer.getInputProps('completedDate')}
						/>
						<Group grow mt="lg">
							<Button variant="outline" radius="xs" color="dark" onClick={()=>setAddModalOpen(false)}>Cancel</Button>
							<Button radius="xs" color="dark" type="submit">Add</Button>
						</Group>
					</form>
				</Modal>

				<Modal centered withCloseButton size="md" radius="xs" opened={editModalOpen} onClose={() => setEditModalOpen(false)}>
					<form onSubmit={formEditCareer.onSubmit((values) => handleEditCareer(values))}>
						<Group>
							<Text size={14} weight={700}>ID: {"1"}</Text> 
						</Group>
						<TextInput
							mt="xs"
							radius="xs"
							label="Name"
							required
							{...formEditCareer.getInputProps('name')}
						/>
						<Textarea
							mt="xs"
							radius="xs"
							label="Description"
							required
							{...formEditCareer.getInputProps('description')}
						/>
						<DatePicker
							mt="xs"
							radius="xs"
							label="Target Date"
							inputFormat="MMMM DD, YYYY"
							clearable={false} 
							value={targetDate}
							onChange={setTargetDate}
							required
							{...formEditCareer.getInputProps('targetDate')}
						/>
						<DatePicker
							mt="xs"
							radius="xs"
							label="Completed Date"
							inputFormat="MMMM DD, YYYY"
							clearable={false} 
							value={completedDate}
							onChange={setCompletedDate}
							required
							{...formEditCareer.getInputProps('completedDate')}
						/>
						<Group grow mt="lg">
							<Button variant="outline" radius="xs" color="dark" onClick={()=>setEditModalOpen(false)}>Cancel</Button>
							<Button radius="xs" color="dark" type="submit">Edit</Button>
						</Group>
					</form>
				</Modal>

				<Modal centered withCloseButton size="md" radius="xs" opened={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
					<Container grow>
						<Text size={20} weight={600}>Do you want to delete this career:</Text>
						<Text size={20} weight={800} color="red">ID: {"123"}</Text>
						<Text size={20} weight={800} color="red">Name: {"Name"}</Text>
					</Container> 
					<Group grow mt="lg">
						<Button variant="outline" radius="xs" color="dark" onClick={()=>setDeleteModalOpen(false)}>Cancel</Button>
						<Button radius="xs" color="red" onClick={(e)=>DeleteCareer(e)}>Delete</Button>
					</Group>
				</Modal>

			</Container>
		</>
	);
}

export default Career;
