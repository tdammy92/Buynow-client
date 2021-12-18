import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import BaseApi from '../store/BaseApi'



const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      width:180,
      minWidth:160,
      marginRight:20
    },
    media: {
      height: 140,
      
    },
  });

function Categorie({catName,catImg,setfilter}) {

    const classes = useStyles();

function showCategory(catName){


  // console.log(catName);

  setfilter(catName)

}

    return (
    <Card className={classes.root}  onClick={()=>showCategory(catName)}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={BaseApi + catImg?.url}
                    
                    title={catName}
                    />
                    <CardContent>
                            <Typography variant="h6" component="h6">
                            {catName}
                            </Typography>
                    
                    </CardContent>
                </CardActionArea>
               
                {/* <CardActions>
                    <Button size="small" color="primary">
                    view 
                    </Button>
                
                </CardActions> */}
    </Card>
    )
}

export default Categorie
