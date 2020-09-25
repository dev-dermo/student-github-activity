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
					return record.type === 'PushEvent'
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
							{this.state.onlyPushes.map(record => {
								console.log(record);
								return (
									<div>
										<h2>{record[0].actor.login} pushed {record.length} times with the following commits:</h2>

										{record.map(push => {
											console.log(push.payload.size);

											return (
												<p>{push.payload.size}</p>
											);
										})}
									</div>
								);
							})}
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