import React, { Component } from "react";

export default class Recipe extends Component {
	render() {
		const {
			image_url,
			title,
			publisher,
			source_url,
			recipe_id,
		} = this.props.recipe;

		const { handleDetails } = this.props;

		return (
			<React.Fragment>
				<div className="col-10 mx-auto col-md-6 col-lg-4 my-3">
					<div className="card">
						<img
							src={image_url}
							alt="recipe"
							style={{ height: "14rem" }}
							className="img-card-top"
						/>
						<div className="card-body text-capitalize">
							<h6>{title}</h6>
							<h6 className="text-warning text-slanted">
								provided by {publisher}
							</h6>
						</div>
						<div className="card-footer">
							<button
								type="button"
								className="btn btn-primary text-capitalize"
								onClick={handleDetails}
							>
								Details
							</button>
							<a
								href={source_url}
								className="btn btn-success mx-2 text-capitalize"
								target="_blank"
								rel="noopener noreferrer"
							>
								Recipe Url
							</a>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
