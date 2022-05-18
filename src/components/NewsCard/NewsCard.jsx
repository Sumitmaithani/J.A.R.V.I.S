import React, { useState, useEffect, createRef } from "react";
import {
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import "./styles.css";
import classNames from "classnames";

const NewsCard = ({ article: { description, publishedAt, source, title, url, urlToImage },activeArticle,i,}) => {
  const [elRefs, setElRefs] = useState([]);
  const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

  useEffect(() => {
    window.scroll(0, 0);

    setElRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()));
  }, []);

  useEffect(() => {
    if (i === activeArticle && elRefs[activeArticle]) {
      scrollToRef(elRefs[activeArticle]);
    }
  }, [i, activeArticle, elRefs]);


  return (
    <Card ref={elRefs[i]} className={ classNames("card", activeArticle === i ? "activeCard" : null)}>
      <CardActionArea href={url} target="_blank">
        <CardMedia
          className="media"
          image={
            urlToImage ||
            "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.nbcnews.com%2F&psig=AOvVaw1I9QIxiXkpdD4HS6Gv71C6&ust=1652807459772000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCIDUleHB5PcCFQAAAAAdAAAAABAD"
          }
          title={title}
        />
        <div className="details">
          <Typography varient="body2" color="textSecondary" component="h2">
            {new Date(publishedAt).toDateString()}
          </Typography>
          <Typography varient="body2" color="textSecondary" component="h2">
            {source.name}
          </Typography>
        </div>
        <Typography className="title" gutterBottom varient="h5" component="h2">
          <b>{title}</b>
        </Typography>
        <CardContent>
          <Typography varient="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="cardActions">
        <Button size="small" color="primary" href={url}>
          Learn More
        </Button>
        <Typography varient="h5" color="textSecondary" component="h2">
          {i + 1}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default NewsCard;
