import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			students: [
				'logandpage', 'jacobwilde378', 'gardukman', 'akaser23', 'jacquelime', 'gabrieljgill', 'jdrobs19', 'ThomasNguyen546', 'sfoutz0205', 'alexandraws29', 'maddiemoffat95', 'sithSlave', 'Jaydon-Goodrich', 'bdrawe', 'salgorog', '1jorcarver'
			],
			studentInfo: [],
			onlyPushes: []
		};
	}

	getGitHubData = (student) => {
		fetch(`https://api.github.com/users/${student}/events?per_page=100`)
			.then(res => res.json())
			.then(data => {
				let onlyPushes = data.filter(record => {
					let today = new Date();
					let sevenDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
					
					return record.type === 'PushEvent' && new Date(record.created_at).getTime() > sevenDaysAgo.getTime();
				});

				this.setState({
					studentInfo: [...this.state.studentInfo, data],
					onlyPushes: [...this.state.onlyPushes, onlyPushes]
				});
			});
	}

	componentDidMount() {
		let counter = 0;

		while (counter < this.state.students.length) {
			this.getGitHubData(this.state.students[counter]);
			counter++;
		}
	}

	render() {
		return (
			<Container>
				<Row>
					<Col>
						<h1>This is the homepage.</h1>
					</Col>
				</Row>

				<Row>
					{
						this.state.studentInfo.length === this.state.students.length ?
						<Col>
							<ul>
								{this.state.onlyPushes.map(record => {
									{/* console.log(record); */}
									return (
											<li>{record[0].actor.login} pushed {record.length} times with {record.reduce((acc, curr) => acc + curr.payload.size, 0)} commits.</li>
									);
								})}
							</ul>
						</Col> :
						<Col>
							<h1>Loading...</h1>
						</Col>
					}
				</Row>
			</Container>
		);
	};
}

export default Home;