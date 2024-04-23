import React, { useState} from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import tower2 from "../assets/tower2.webp";
import china from "../assets/china.png";
import greek from "../assets/greek2.png";
import mexicanImage from "../assets/mexicanImage.webp";
import CustomStepper from "../components/stepper";
import RecipeCard from "../components/recipeCard";
import lasagna from "../assets/lasagna.jpeg";
import tiramisu from "../assets/tirmasiu.jpeg";
import carbonara from "../assets/carbonara.png";
import baoBuns from "../assets/baoBuns.png";
import pekingDuck from "../assets/pekingDuck.png";
import tsoChicken from "../assets/tsoChicken.png";
import {useNavigate, useParams} from "react-router-dom";

const Dash = () => {
	const app_name = "bitebybyte-9e423411050b";
	const { cuisine } = useParams();
	const [recipes, setRecipes] = useState([]);
	const [error, setError] = useState(null);
	const [showStepper, setShowStepper] = useState(false);
	const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
	const [buttonClicked, setButtonClicked] = useState(false);
	const [selectedRecipeName, setSelectedRecipeName] = useState(null); // Define setSelectedRecipeName state

	// Function to generate intro content based on cuisine and selected recipe
	const generateIntroContent = (cuisine, recipeName) => {
        switch (cuisine) {
            case "italian":
                switch (recipeName) {
                    case "Tiramisu":
                        return "Tiramisu, Italy's treasured dessert, means 'pick me up,' hinting at its uplifting flavors. In the 1960s, a Venetian chef blended coffee-dipped ladyfingers with mascarpone and cocoa, creating a creamy delight. Traditionally served in a round shape, it symbolizes a full moon's promise of new beginnings and shared joy.";
                    case "Carbonara":
                        return "Carbonara, a Roman culinary icon, marries eggs, Pecorino Romano, guanciale, and pepper with pasta for a dish of simple elegance. Folklore suggests it fueled coal workers, hence 'carbonara.' Others tie it to post-WWII when American soldiers mixed bacon and eggs with pasta. Today, it's a global comfort food.";
                    case "Lasagna":
                        return "Lasagna, tracing back to ancient Greece, was perfected in Italy’s Emilia-Romagna. Its layers of pasta, ragù, béchamel, and cheese embody tradition. Regional twists vary, but its essence—warmth and celebration—remains universal. Lasagna is more than a meal; it's a symbol of heritage and familial bonds.";
                    default:
                        return "Default intro content for Italian cuisine";
                }
				case "chinese":
					switch (recipeName) {
						case "Char Siu Bao Buns":
							return "Intro content for Char Siu Bao Buns";
						case "General Tso's Chicken":
							return "Intro content for General Tso's Chicken";
						case "Peking Duck":
							return "Intro content for Peking Duck";
						default:
							return "Default intro content for Italian cuisine";
					}
            default:
                return "Default intro content for unspecified cuisine";
        }
    };
	

	const steps1 = [
		{
			title: "Intro",
            content: generateIntroContent(cuisine, selectedRecipeName),
		},
				{
			title: "Ingredients",
		},
		{
			title: "Quiz 1",
			quizzes: [
				{
					question: "Question 3",
					options: ["Option 1", "Option 2", "Option 3"],
					answer: 2,
				},
			],
		},
		{
			title: "Instructions",
		},
		{
			title: "Quiz 2",
			quizzes: [
				{
					question: "Question 3",
					options: ["Option 1", "Option 2", "Option 3"],
					answer: 2,
				},
			],
		},
		{
			title: "Finish",
			quizzes: [
				{
					question: "Question 4",
					options: ["Option 1", "Option 2", "Option 3"],
					answer: 1,
				},
			],
		},
	];

	const handleButtonClick1 = (recipeName) => { // Modify to accept recipeName parameter
		const fetchRecipesAndShowStepper = async () => {
			const obj = { recipe: recipeName }; // Pass the recipe name to fetch
			const js = JSON.stringify(obj);
			try {
				const response = await fetch(buildPath("api/recipe"), {
					method: "POST",
					body: js,
					headers: {
						"Content-Type": "application/json",
					},
				});
				const data = await response.json();
				if (data.error) {
					console.log(data.error);
					return;
				}
	
				// Extract ingredients and instructions from response data
				const { ingredients, instructions } = data;

				// Update state with fetched ingredients and instructions
				setIngredients(ingredients);
				setInstructions(instructions);


                // Update state with the selected recipe name
                setSelectedRecipeName(recipeName);

				// Set the stepper to be shown
				setShowStepper(true);
				setButtonClicked(true);
	
			} catch (error) {
				console.error("Error fetching recipe data:", error);
			}
		};
	
		// Call the inner async function
		fetchRecipesAndShowStepper();
	};

	function buildPath(route) {
		if (process.env.NODE_ENV === "production") {
			return "https://" + app_name + ".herokuapp.com/" + route;
		} else {
			return "http://localhost:5001/" + route;
		}
	}


	// Define image based on cuisine
	let imageSrc;
	let recipeInfo;
	let recipeImage;
	switch (cuisine) {
		case "italian":
			imageSrc = tower2;
			recipeInfo = {
				recipe1: "Tiramisu",
				recipe2: "Carbonara",
				recipe3: "Lasagna"
			};
			recipeImage = {
				recipe1: tiramisu,
				recipe2: carbonara,
				recipe3: lasagna
			};
			break;
		case "mexican":
			imageSrc = mexicanImage;
			recipeInfo = {
				recipe1: "Mexican Recipe 1",
				recipe2: "Mexican Recipe 2",
				recipe3: "Mexican Recipe 3"
			};
			recipeImage = {
				recipe1: tiramisu,
				recipe2: carbonara,
				recipe3: lasagna
			};
			break;
		case "chinese":
			imageSrc = china;
			recipeInfo = {
				recipe1: "Char Siu Bao Buns",
				recipe2: "General Tso's Chicken",
				recipe3: "Peking Duck"
			};
			recipeImage = {
				recipe1: baoBuns,
				recipe2: tsoChicken,
				recipe3: pekingDuck
			};
			break;
		case "greek":
			imageSrc = greek;
			recipeInfo = {
				recipe1: "Greek Recipe 1",
				recipe2: "Greek Recipe 2",
				recipe3: "Greek Recipe 3"
			};
			recipeImage = {
				recipe1: tiramisu,
				recipe2: carbonara,
				recipe3: lasagna
			};
			break;
	}

	return (
		<div className="relative">
			<Navbar />
			<img className="w-full  z-0 " src={imageSrc}></img>
			{(showStepper) && (
				<div className="absolute z-10 top-40 left-0 w-full">
            {showStepper && 
			(<CustomStepper steps={steps1} ingredients={ingredients} instructions={instructions} />)}					
			{/* <div className="absolute top-80 left-0 right-0 text-center"> */}
						{/* <button
							className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
							onClick={handleBackButtonClick}
						>
							Back
						</button> */}
					</div>
				// </div>
			)}
			{!buttonClicked && (
				<div className="absolute top-40 left-0 right-0 flex justify-center items-center">
					<RecipeCard
						imageUrl={recipeImage.recipe1}
						recipe="Recipe 1"
						buttonText={recipeInfo.recipe1}
						onClick={() => handleButtonClick1(recipeInfo.recipe1)} // Pass recipe name as parameter
					/>
					<RecipeCard
						imageUrl={recipeImage.recipe2}
						recipe="Recipe 2"
						buttonText={recipeInfo.recipe2}
						onClick={() => handleButtonClick1(recipeInfo.recipe2)} // Pass recipe name as parameter
					/>
					<RecipeCard
						imageUrl={recipeImage.recipe3}
						recipe="Recipe 3"
						buttonText={recipeInfo.recipe3}
						onClick={() => handleButtonClick1(recipeInfo.recipe3)} // Pass recipe name as parameter
					/>
				</div>
			)}
			<Footer />
		</div>
	);
};

export default Dash;
