import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
// import Uploads from '../Uploads/Uploads'
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import BaseApi from "../../store/BaseApi";
import Store from "../../store/Store";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import CategoryChart from "./Charts/CategoryChart";
import ProductsCharts from "./Charts/ProductsCharts";

function Admin() {
	const [Category, setCategory] = useState([]);

	const { User } = Store();

	useEffect(() => {
		async function getCategory() {
			axios
				.get(`${BaseApi}/categories`)
				.then((res) => {
					setCategory(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}

		getCategory();
	}, []);

	if (User?.user?.role.name !== "Admin") {
		return <Redirect to='/' />;
	}

	const data = {
		labels: Category.map((cat) => cat.catName),
		datasets: [
			{
				label: "Categories",
				data: Category.map((cat) =>
					cat.products.length < 1 ? 0 : cat.products.length
				),
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 206, 86, 0.2)",
					"rgba(75, 192, 192, 0.2)",
					// 'rgba(153, 102, 255, 0.2)',
					// 'rgba(255, 159, 64, 0.2)',
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					// 'rgba(153, 102, 255, 1)',
					// 'rgba(255, 159, 64, 1)',
				],
				borderWidth: 1,
			},
		],
	};


 const data1 = {
        labels:Category.map((cat) => cat.catName),
        datasets: [
          {
            label: 'Dataset 1',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Dataset 2',
            data: [],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

	console.log(Category);

	return (
		<div className='Admin'>
			<h3 className='title'>Admin Dashboard</h3>

			<div className='dashboard'>
				{/* {Category
                    ?.map(cat => {
                        return <Dashboard key={cat.id} {...cat}/>
                    })} */}

				<Grid
					item
					md={6}
					xs={12}
					style={{
						maxWidth: "300px",
						margin: "10px",
					}}
				>
					<CategoryChart data={data} />
				</Grid>
				<Grid
					item
					md={6}
					xs={12}
					style={{
						maxWidth: "300px",
						margin: "10px",
					}}
				>
					<ProductsCharts data={data1}/>
				</Grid>
			</div>

			<hr />

			<div className='buttons__container'>
				<Button
					variant='contained'
					component={Link}
					to='/admin/uploads'
					color='primary'
				>
					Uploads
				</Button>

				<Button
					component={Link}
					to='/admin/delete'
					variant='contained'
					color='secondary'
				>
					Delete
				</Button>

				<Button variant='contained'>Reports</Button>
			</div>
		</div>
	);
}

export default Admin;
