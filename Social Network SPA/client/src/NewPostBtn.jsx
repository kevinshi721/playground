import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Col, Form, FormGroup, Input} from 'reactstrap';
import './NewPostBtn.css';

//props : onUpload, 
class NewPostBtn extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			record: {},
			preview: null,
			modal: false
		};

		this.toggle = this.toggle.bind(this);
		this.getInput = this.getInput.bind(this);
		this.getImage = this.getImage.bind(this);
		this.saveHandler = this.saveHandler.bind(this);
	}

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	async saveHandler() {
		await this.props.onUpload(this.state.record);
		this.toggle();
		this.props.onRedirectToMainPage();
	}

	getInput(event) {
	        let record = this.state.record;
	        record[event.target.name] = event.target.value;
		this.setState({
			record
		});
	}

	getImage(event) {
		console.log('dataURL')
		let record = this.state.record;
		let file = event.target.files[0];

		let type = file.type.split('/')[0];
		if (type !== 'image') {
			alert('Must be image.');
			return;
		}

		let reader = new FileReader();
		reader.onload = (event) => {
			let dataURL = event.target.result;
			record.image= file;
			this.setState({
				record,
				preview: dataURL
			});
		};
		reader.readAsDataURL(file); 
	}

	render() {

		let imgPreview = null;

		if (this.state.preview) {
			imgPreview = (
				<img className="img-preview" src={this.state.preview} alt="Album Preview" />
			);
		}

		return (
			<div>
				<Button color="info" className="new-post-btn" onClick={this.toggle}>New Post</Button>
				<Modal centered isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Create You New Post</ModalHeader>
					<ModalBody>
						<div className="img-field">
							<label htmlFor="img-upload" id="upload-icon"></label>
								{ imgPreview }
							<input type="file" id="img-upload" name="image" onChange={this.getImage} />
						</div>
						<div className="form-filed">
							<Form>
								<FormGroup row>
									<Col sm={12}>
										<Input placeholder="I want to say..." type="textarea" name="text" id="CommentText" onChange={this.getInput}/>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Col sm={12}>
										<Input placeholder="@ Location" name="location" onChange={this.getInput}/>
									</Col>
								</FormGroup>
							</Form>
						</div>

					</ModalBody>
					<ModalFooter>
						<Button color="secondary" onClick={this.saveHandler}>Post</Button>{'	 '}
						<Button color="secondary" outline onClick={this.toggle}>Cancel</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

export default NewPostBtn;