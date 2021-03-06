import React from 'react';
import './styles/itemcard.css'
import { addToCart } from '../../redux/CartReducer/actions';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {CardMedia } from "@material-ui/core";
import CardActionArea from '@material-ui/core/CardActionArea';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";


const useStyles = makeStyles((theme) =>({
    root: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
      maxWidth: 345,
      width: 245,
      textAlign: "center",
    },
    media: {
      color: theme.palette.primary.main,
      height: 150,
    },
    price: {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main,
      borderColor: theme.palette.primary.main,
      justifyContent: "center",
    },
    button: {
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      justifyContent: "center",
    },
    cart: {
      borderRadius: theme.shape.borderRadius,
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.dark,
      '&:hover':{
        backgroundColor: "#A29605",
        outline: "none",
      },
      '&:active':{
        outline: "none",
      }
    }
  }));

  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme);

export default function ItemCard ({product}) {

    const dispatch = useDispatch();
    const classes = useStyles();

    const handleAddToCart = e => {
        e.preventDefault();
        dispatch(addToCart(product))
    }
    if ( product.images[0]){
        var img = product.images[0].src
    }
    else{
        img = "https://geodis.com/mx/sites/default/files/styles/max_800x800/public/2018-06/404.png?itok=-0gM8yNq"
    }
    if (product.sale_price){
      var precio = ""
      precio = (<Grid container alignItems="center" className={classes.price} spacing={2}>
                  <Grid item>
                    <ThemeProvider theme={theme}>
                      <Typography style={{ textDecorationLine: 'line-through' }} variant="h6" color="textSecondary" component="h2"> {`$${product.regular_price}`} </Typography>
                    </ThemeProvider>
                  </Grid>
                  <Grid item>
                    <ArrowRightAltIcon/>
                  </Grid>
                  <Grid item>
                    <ThemeProvider theme={theme}>
                      <Typography variant="h6" color="primary" component="h2">{`$${product.sale_price}`}</Typography>
                    </ThemeProvider>
                  </Grid>
                </Grid>)}
    else{
      precio = (<Typography className={classes.price} variant="h6" color="textSecondary" component="h2">
      {`$${product.price}`}
    </Typography>)
    }

    var ItemName = product.name.split(" ").slice(0,2).join(' ');
    return(
      <Grid item> 
        <Card className={classes.root}>
            <CardHeader title={ItemName}/>
          <CardActionArea>
            <CardMedia className={classes.media} image={img} />
          </CardActionArea>
          <CardContent>
            {precio}
          </CardContent>
          <CardActions className={classes.button} >
            <Button className={classes.cart} elevation="24" size="small" variant="outlined" onClick={e => handleAddToCart(e)} startIcon={<AddShoppingCartIcon />}> Cart </Button>
          </CardActions>
      </Card>  
      </Grid>
    )
}

