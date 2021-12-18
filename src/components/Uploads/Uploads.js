import React, {useState, useEffect} from 'react'
import {Button} from '@material-ui/core'
import BaseApi from '../../store/BaseApi'
import Store from '../../store/Store'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

// Tab Bar imports
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// filpond imports
import {FilePond,  registerPlugin} from 'react-filepond'
// import {FilePond, File, registerPlugin} from 'react-filepond'
import 'filepond/dist/filepond.min.css'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

function TabPanel(props) {
    const {
        children,
        value,
        index,
        ...other
    } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}>
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {id: `full-width-tab-${index}`, 'aria-controls': `full-width-tabpanel-${index}`};
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        marginTop: '70px'
    }
}));

function Uploads() {

    const classes = useStyles();
    const theme = useTheme();
    const [value,
        setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const {User} = Store()

    // const [Form,
    //     setForm] = useState(false);
    const [GetCat,
        setGetCat] = useState([]);

    // Category Form State
    const [CatImage,
        setCatImage] = useState('');
    const [CatName,
        setCatName] = useState('');

    const newcatImge = CatImage[0]
        ?.file;

    // Product form STate

    const [ProdImage,
        setProdImage] = useState('');
    const [ProdName,
        setProdName] = useState('');
    const [ProdPrice,
        setProdPrice] = useState("");
    const [ProdQty,
        setProdQty] = useState("");
    const [ProdCat,
        setProdCat] = useState('');
    const [ProdDescription,
        setProdDescription] = useState("");

    const newProdImge = ProdImage[0]
        ?.file;

    useEffect(() => {
        async function getCat() {
            axios
                .get(`${BaseApi}/Categories`)
                .then(res => {
                    setGetCat(res.data)
                })
                .catch(err => {
                    console.log(err);
                })
        }

        getCat()
    }, [])

    function ClearProductForm() {
        setProdImage('');
        setProdName('');
        setProdPrice("");
        setProdQty("");
        setProdCat('');
        setProdDescription("");
    }

    function ClearCategoryForm() {
        setCatImage('');
        setCatName('');
    }

    async function UploadImage(file, ref, refId, field) {

        const ImgData = new FormData();
        await ImgData.append('files', file)
        await ImgData.append('ref', ref)
        await ImgData.append('refId', refId)
        await ImgData.append('field', field)

        axios
            .post(`${BaseApi}/upload`, ImgData)
            .then(res => {
                console.log(res.statusText);
                if (res.status === 200) {
                    ClearProductForm()
                    ClearCategoryForm()
                }

            })
            .catch((err) => console.log(err))

    }

    function submitCategory(e) {
        e.preventDefault();

        const newCategory = {
            catName: CatName,
            catImg: ''
        }

        axios
            .post(`${BaseApi}/categories`, newCategory)
            .then(res => {
                if (res.status === 200) {

                    UploadImage(newcatImge, 'category', res.data.id, 'catImg')

                };
            })
            .catch(err => {
                console.log(err);
            })
    }

    async function submitProduct(e) {
        e.preventDefault();

        const newProd = {
            prodName: ProdName,
            prodPrice: + ProdPrice,
            prodQty: + ProdQty,
            prodImg: '',
            prodDesc: ProdDescription,
            category: [ProdCat]
        }

        console.log(newProd);
        axios
            .post(`${BaseApi}/products`, newProd)
            .then(res => {
                if (res.status === 200) {
                    UploadImage(newProdImge, 'product', res.data.id, 'prodImg')

                }
            })
            .catch(err => {
                console.log(err);
            })

    }

    if (User
        ?.user
            ?.role.name !== 'Admin') {
        return <Redirect to='/'/>
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example">
                    <Tab label="Upload Product" {...a11yProps(0)}/>
                    <Tab label="Create Categories" {...a11yProps(1)}/> 
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl'
                ? 'x-reverse'
                : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}>
             
          
                <TabPanel value={value} index={0} dir={theme.direction}>
                   
                   <div className="upload__form">
                    <form onSubmit={submitProduct} >
                        <h4>Upoad Product</h4>
                        <label htmlFor="">Name:</label>
                        <input
                            type="text"
                            value={ProdName}
                            onChange={e => {
                            setProdName(e.target.value)
                        }}/>

                        <label htmlFor="">Price:</label>
                        <input
                            type="number"
                            min='0'
                            value={ProdPrice}
                            onChange={e => {
                            setProdPrice(e.target.value)
                        }}/>

                        <label htmlFor="">Quantity:</label>
                        <input
                            type="number"
                            min='0'
                            value={ProdQty}
                            onChange={e => {
                            setProdQty(e.target.value)
                        }}/>

                        <label htmlFor="">Category:</label>

                        <select
                            onChange={(e) => {
                            setProdCat(e.target.value)
                        }}>
                            <option >Select Category</option>

                            {GetCat
                                ?.map(Cat => {
                                    return <option key={Cat.id} value={Cat.id}>{Cat
                                            ?.catName}</option>
                                })}
                        </select>

                        <label htmlFor="">Description:</label>
                        <textarea
                            value={ProdDescription}
                            onChange={e => {
                            setProdDescription(e.target.value)
                        }}></textarea>

                        <label htmlFor="">Image:</label>

                        <FilePond
                            files={ProdImage}
                            onupdatefiles={setProdImage}
                            allowMultiple={false}
                            maxFiles={1}
                            name="files"
                            labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'/>

                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                            disabled={!ProdName && !ProdPrice && !ProdQty && !ProdCat}>
                            Add Product</Button>

                    </form>
                   </div>
                   
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <div className="upload__form">

                    <form onSubmit={submitCategory} className="category__form">
                        <h4>Upload Category</h4>

                        <label htmlFor="">Category:</label>
                        <input
                            type="text"
                            value={CatName}
                            onChange={(e) => setCatName(e.target.value)}/>

                        <label htmlFor="">Image:</label>

                        <FilePond
                            files={CatImage}
                            onupdatefiles={setCatImage}
                            allowMultiple={false}
                            maxFiles={1}
                            name="files"
                            labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'/>
                        <Button disabled={!CatName} variant='contained' color='primary' type='submit'>
                            Add Category</Button>
                    </form>
                    </div>
                </TabPanel>
            </SwipeableViews>
        </div>

    )
}

export default Uploads
