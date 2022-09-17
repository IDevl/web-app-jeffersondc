import "./home.css";
import { Container, Card, Text, Stack, Anchor, Group, Grid, Title, Image, Badge, Modal, Button, Progress, Divider, Center } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useState } from "react";
import Certificates from './certificates.json';
import Skills from './skills.json';
import { MapPin, Phone, Mail, BrandLinkedin, BrandWebflow } from 'tabler-icons-react';

const Home = props => {

	const [modalOpen, setModalOpen] = useState(false);
	const [certificateImage, setCertificateImage] = useState('');

	const ViewCertificate = (e) => {
		setCertificateImage(e);
		setModalOpen(true);
	}

	return (
		<>
		<Container className="main-home">
			{/* Landing */}
			<Container className="container" py="xl">
				<Grid className="grid" grow>
					<Grid.Col md={1}>
						<Title order={1} className="heading1">Jefferson</Title>
						<Title order={1} className="heading1">Dela Cruz</Title>
					</Grid.Col>
					<Grid.Col md={1}>
						<Text className="paragraph">
							I am a BS Information Technology graduate from the Polytechnic University of the Philippines and a part-time Front-End Web Developer at Exceed Digital Solutions.
						</Text>
						<Group mt="md">
							<Button radius="xs" color="dark" href="https://www.linkedin.com/in/jefferson-dc/" component="a" target="_blank" className="button-link">LinkedIn</Button>
							<Button radius="xs" color="dark" href="https://jeffersondc.netlify.app" component="a" target="_blank" className="button-link">Portfolio</Button>
						</Group>
					</Grid.Col>
				</Grid>
			</Container>

			{/* Profile */}
			<Container className="container">
				<Divider color="dark" my="xl" style={{ width: "100%" }} />
				<Grid className="grid" py="xl" grow>
					<Grid.Col>
						<Title order={2} className="heading2">Profile</Title>
					</Grid.Col>
					<Grid.Col>
						<Text className="paragraph">
							Jefferson is a developer who has the perseverance to expand his knowledge and skills in programming through developing real-world projects and has an aspiration to have more comprehensive experiences in the field of Information Technology.
						</Text>
					</Grid.Col>
				</Grid>

				<Grid className="grid" py="xs" grow>
					<Grid.Col md={1}>
						<Title order={2} className="heading3">Exceed Digital Solutions</Title>
						<Title order={3} className="heading4">Web Developer</Title>
					</Grid.Col>
					<Grid.Col md={1}>
						<Text className="paragraph">
							Develop and maintain responsive e-commerce and company websites with Wordpress, Shopify, Storehippo, Figma, Adobe XD, InMotion Hosting and Google Analytics.
						</Text>
						<Group pt="md" spacing="xs">
							<Badge color="dark" variant="gradient" py="sm" gradient={{ from: '#5236ab', to: '#e41937', deg: 35 }}>WordPress</Badge>
							<Badge color="dark" variant="gradient" py="sm" gradient={{ from: '#5236ab', to: '#e41937', deg: 35 }}>Shopify</Badge>
							<Badge color="dark" variant="gradient" py="sm" gradient={{ from: '#5236ab', to: '#e41937', deg: 35 }}>HTML/CSS</Badge>
							<Badge color="dark" variant="gradient" py="sm" gradient={{ from: '#5236ab', to: '#e41937', deg: 35 }}>Javascript</Badge>
							<Badge color="dark" variant="gradient" py="sm" gradient={{ from: '#5236ab', to: '#e41937', deg: 35 }}>cPanel</Badge>
							<Badge color="dark" variant="gradient" py="sm" gradient={{ from: '#5236ab', to: '#e41937', deg: 35 }}>Search Engine Optimization</Badge>
							<Badge color="dark" variant="gradient" py="sm" gradient={{ from: '#5236ab', to: '#e41937', deg: 35 }}>Google Admin Console</Badge>
						</Group>
					</Grid.Col>
				</Grid>

				<Grid className="grid" pt="xl" pb="xs" grow>
					<Grid.Col md={1}>
						<Title order={2} className="heading3">Polytechnic University of the Philippines</Title>
						<Title order={3} className="heading4">Information Technology</Title>
					</Grid.Col>
					<Grid.Col md={1}>
						<Text className="paragraph">
							Developed an android game application for the learning of Grade Three students and completed a four-year course for a Bachelor`s Degree in Information Technology.
						</Text>
						<Group pt="md" spacing="xs">
							<Badge color="dark" variant="gradient" py="sm" gradient={{ from: '#5236ab', to: '#e41937', deg: 35 }}>Unity &amp; C#</Badge>
							<Badge color="dark" variant="gradient" py="sm" gradient={{ from: '#5236ab', to: '#e41937', deg: 35 }}>M.E.R.N.</Badge>
							<Badge color="dark" variant="gradient" py="sm" gradient={{ from: '#5236ab', to: '#e41937', deg: 35 }}>C/C++</Badge>
							<Badge color="dark" variant="gradient" py="sm" gradient={{ from: '#5236ab', to: '#e41937', deg: 35 }}>Java</Badge>
							<Badge color="dark" variant="gradient" py="sm" gradient={{ from: '#5236ab', to: '#e41937', deg: 35 }}>Python</Badge>
							<Badge color="dark" variant="gradient" py="sm" gradient={{ from: '#5236ab', to: '#e41937', deg: 35 }}>mySQL</Badge>
							<Badge color="dark" variant="gradient" py="sm" gradient={{ from: '#5236ab', to: '#e41937', deg: 35 }}>PHP</Badge>
							<Badge color="dark" variant="gradient" py="sm" gradient={{ from: '#5236ab', to: '#e41937', deg: 35 }}>Iterative Model</Badge>
						</Group>
					</Grid.Col>
				</Grid>

				<Grid className="grid" pt="xl" grow>
					<Grid.Col md={1}>
						<Title order={2} className="heading3">Systems Technology Institute</Title>
						<Title order={3} className="heading4">Science, Technology, Engineering and Mathematics</Title>
					</Grid.Col>
					<Grid.Col md={1}>
						<Text className="paragraph">
							Completed a two-year course in STEM Academic Track and gained comprehensive knowledge in the field of engineering and mathematics, empowerment technologies, and media information literacy.
						</Text>
						<Group pt="md" spacing="xs">
							<Badge color="dark" variant="gradient" py="sm" gradient={{ from: '#5236ab', to: '#e41937', deg: 35 }}>Engineering</Badge>
							<Badge color="dark" variant="gradient" py="sm" gradient={{ from: '#5236ab', to: '#e41937', deg: 35 }}>Calculus</Badge>
							<Badge color="dark" variant="gradient" py="sm" gradient={{ from: '#5236ab', to: '#e41937', deg: 35 }}>Earth Science</Badge>
							<Badge color="dark" variant="gradient" py="sm" gradient={{ from: '#5236ab', to: '#e41937', deg: 35 }}>Research</Badge>
							<Badge color="dark" variant="gradient" py="sm" gradient={{ from: '#5236ab', to: '#e41937', deg: 35 }}>Empowerment Technologies</Badge>
							<Badge color="dark" variant="gradient" py="sm" gradient={{ from: '#5236ab', to: '#e41937', deg: 35 }}>Entrepreneurship</Badge>
						</Group>
					</Grid.Col>
				</Grid>
			</Container>

			{/* Skills */}
			<Container className="container" pt="xl">
				<Divider color="dark" my="xl" style={{ width: "100%" }} />
				<Title order={1} mt="xl" className="heading2">Skills</Title>
				<Center className="center" my="xl">
					{Skills.map(skills => {
						return (
							<>
								<div style={{ width: "100%" }}>
									<Title order={4}>{skills.name}</Title>
									<Progress
										size={20}
										radius="xs"
										p={5}
										className="progress-bar"
										value={skills.rate}
										color="dark"
										label={skills.rate + "%"} />
								</div>
							</>
						)
					})}
				</Center>
			</Container>

			{/* Certificates */}
			<Container className="container" py="xl">
				<Divider color="dark" my="xl" style={{ width: "100%" }} />
				<Title order={1} className="heading2" pt="xl">Certificates</Title>
				<Carousel
					height={400}
					align="start"
					slideGap="xs"
					pt="xl"
					className="carousel"
					slideSize="33.333333%"
					loop
					breakpoints={[
						{ maxWidth: 'md', slideSize: '50%' },
						{ maxWidth: 'sm', slideSize: '100%', slideGap: 0 },]} >

					{Certificates.map(certificate => {
						return (
							<Carousel.Slide>
								<Card shadow="sm" p="lg" radius="xs" withBorder className="card">
									<Card.Section className="card-section">
										<Image src={certificate.image} />
									</Card.Section>
									<Title order={5} my="md">{certificate.title}</Title>
									<Group spacing="xs">
										{certificate.badges.map(badges => {
											return (
												<Badge color="dark" variant="gradient" py="sm" gradient={{ from: '#5236ab', to: '#e41937', deg: 35 }}>{badges}</Badge>
											)
										})
										}
									</Group>
									<Card.Section py="xl" className="card-section">
										<Button
											size="xs"
											radius="xs"
											className="button-link"
											onClick={() => ViewCertificate(certificate.image)}> View Certificate
										</Button>
									</Card.Section>
								</Card>
							</Carousel.Slide>
						)
					})
					}
				</Carousel>
				<Modal centered withCloseButton size="xl" radius="xs" p="xs" opened={modalOpen} onClose={() => setModalOpen(false)}>
					<Image src={certificateImage} />
				</Modal>
			</Container>

			{/* Contact */}
			<Container className="container" py="xl">
				<Divider color="dark" my="xl" style={{ width: "100%" }} />
				<Title order={1} className="heading2" pt="xl">Contact Me</Title>
				<Stack mt="xl">
					<Group spacing="xs">
						<Phone size={24} strokeWidth={2} color={'#3d194d'} />
						<Anchor className="anchor-contact" href="tel:+639384571460">+639384571460</Anchor>
					</Group>
					<Group spacing="xs">
						<Mail size={24} strokeWidth={2} color={'#3d194d'} />
						<Anchor className="anchor-contact" href="mailto:jbdelacruz411@gmail.com">jbdelacruz411@gmail.com</Anchor>
					</Group>
					<Group spacing="xs">
						<MapPin size={24} strokeWidth={2} color={'#3d194d'} />
						<Anchor className="anchor-contact" href="https://goo.gl/maps/aLhrYyQUYiLhDG4MA" target="_blank">223 Sinalhan, Santa Rosa City, Laguna, 4026</Anchor>
					</Group>
					<Group spacing="xs">
						<BrandLinkedin size={24} strokeWidth={2} color={'#3d194d'} />
						<Anchor className="anchor-contact" href="https://www.linkedin.com/in/jefferson-dc" target="_blank">jefferson-dc</Anchor>
					</Group>
					<Group spacing="xs">
						<BrandWebflow size={24} strokeWidth={2} color={'#3d194d'} />
						<Anchor className="anchor-contact" href="https://jeffersondc.netlify.app" target="_blank">Portfolio Website</Anchor>
					</Group>
				</Stack>
			</Container>

			{/* Footer */}
			<Container className="container" pt="xl" py="sm">
				<Divider color="dark" my="xl" style={{ width: "100%" }} />
				<Center style={{ width: "100%" }}>
					<Text size={14} color="grey" weight={600}>Jefferson Dela Cruz • 2022</Text>
				</Center>
			</Container>
		</Container>
		</>
	);
}
export default Home;
