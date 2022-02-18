import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './style.scss';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

type InfoProps = {
  info: {
    id: number;
    product_name: string;
    brand: string;
    grade: number;
    repurchase_rate: number;
    related: string[];
  };
};

export default function ProductCard({ info }: InfoProps) {
  const [expanded, setExpanded] = React.useState(false);
  const { id, product_name, brand, grade, repurchase_rate, related } = info;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={product_name}
        subheader={brand}
      />
      <CardMedia component='img' height='194' image='/images/temp-image.jpg' alt='Paella dish' />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          상품명: {product_name}
          <br />
          브랜드 : {brand}
          <br />
          평점 : {grade}
          <br />
          재구매율 : {repurchase_rate * 100 + '%'}
          <br />
          <br />
          다른 소비자들이 같이 구매한 상품 :
          <br />
          <a href={`/search?=${related[0]}`}>{related[0]}</a>, <a href={`/search?=${related[1]}`}>{related[1]}</a>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label='show more'>
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>더 많은 정보 보러가기</CardContent>
      </Collapse>
    </Card>
  );
}
