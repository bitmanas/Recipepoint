import React, { Component } from "react";
import "./App.css";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import recipes from "./tempList";
import { tsObjectKeyword, throwStatement } from "@babel/types";

class App extends Component {
	state = {
		recipes: recipes,
		// url:
		// 	"https://www.food2fork.com/api/search?key=b6fb5d86fb9419eeec1129a9e77a1ada",
		// base_url:
		// 	"https://www.food2fork.com/api/search?key=b6fb5d86fb9419eeec1129a9e77a1ada",
		url:
			"https://www.food2fork.com/api/search?key=2f639420f4e0c5a350d650d682e4dba6",
		base_url:
			"https://www.food2fork.com/api/search?key=2f639420f4e0c5a350d650d682e4dba6",
		details_id: 0,
		pageIndex: 1,
		search: "",
		query: "&q=",
		error: "",
	};

	async getRecipes() {
		try {
			const data = await fetch(this.state.url);
			const jsonData = await data.json();
			if (jsonData.recipes.length === 0) {
				this.setState(() => {
					return {
						error:
							"sorry, but your search did not return any result",
					};
				});
			} else {
				this.setState(() => {
					return { recipes: jsonData.recipes };
				});
			}
			// this.setState({
			// 	recipes: jsonData.recipes,
			// });
		} catch (error) {
			console.log(error);
		}
	}

	componentDidMount() {
		this.getRecipes();
	}

	handleIndex = index => {
		this.setState({ pageIndex: index });
	};

	handleDetails = (index, id) => {
		this.setState({
			pageIndex: index,
			details_id: id,
		});
	};
	handleChange = e => {
		this.setState(
			{
				search: e.target.value,
			},
			() => {}
		);
	};
	handleSubmit = e => {
		e.preventDefault();
		const { base_url, query, search } = this.state;
		this.setState(
			() => {
				return { url: `${base_url}${query}${search}`, search: "" };
			},
			() => {
				this.getRecipes();
			}
		);
	};
	displayPage = index => {
		switch (index) {
			default:
			case 1:
				return (
					<RecipeList
						recipes={this.state.recipes}
						handleDetails={this.handleDetails}
						value={this.state.search}
						handleChange={this.handleChange}
						handleSubmit={this.handleSubmit}
						error={this.error}
					></RecipeList>
				);
				break;
			case 0:
				return (
					<RecipeDetails
						id={this.state.details_id}
						handleIndex={this.handleIndex}
					></RecipeDetails>
				);
				break;
		}
	};

	render() {
		return (
			<React.Fragment>
				{this.displayPage(this.state.pageIndex)}
			</React.Fragment>
		);
	}
}

export default App;
