import React, { useEffect, useState } from "react";
import ShopItem from "./ShopItem";
import BaseApi from "../../store/BaseApi";
import axios from "axios";
import Categorie from "../Categorie";
import Banner from "../Adverts/Banner";
import Store from "../../store/Store";
import LoaderBar from "../Utils/LoaderBar";

function Shop() {
	const [Category, setCategory] = useState([]);
	const [Products, setProducts] = useState([]);

	const [filter, setfilter] = useState("");

	const [LoaDer, setLoaDer] = useState(true);

	const { CheckUser } = Store();



	useEffect(() => {
		CheckUser();
	}, []);




	useEffect(() => {
		async function getCategory() {
			axios
				.get(`${BaseApi}/categories`)
				.then((res) => {
					setCategory(res.data);
					setLoaDer(false);
				})
				.catch((err) => {
					console.log(err);
					setLoaDer(false);
				});
		}

		getCategory();
	}, []);


    async function getProducts() {
        axios
            .get(`${BaseApi}/products`)
            .then((res) => {
				console.log(res.data);
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

	useEffect(() => {
		

		getProducts();
	}, []);

	useEffect(() => {

        if (filter !== 'All') {
            
            const filterbyCategory = Products.filter((prod) => {
             
                return prod?.category?.catName === filter;
            });
    
            setProducts(filterbyCategory);
           
        }else if(filter==='All'){
            getProducts()
        }

      
	}, [filter]);

  
console.log(Products);
  

	return (
		<>
			{LoaDer ? (
				<LoaderBar />
			) : (
				<div className='shop-container'>
					<Banner Products={Products} />

					<div className='row-container'>
						<div>
							<h3 className='row-title'>Categories:</h3>
							<div>
								<div className='category-row-container'>
                                <Categorie
												key={0}
												
												setfilter={setfilter}
                                                catName='All' catImg='....'
											/>
                                   
									{Category.map((category) => {
										return (
											<Categorie
												key={category.id}
												{...category}
												setfilter={setfilter}
											/>
										);
									})}
								</div>
							</div>

							<h3 className='row-title'>All Items:</h3>

							<div>
								<div className='product-row-container'>


								{     
									Products.map((item) => {
										return <ShopItem key={item.id} {...item} />;
									})
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}






export default Shop;
