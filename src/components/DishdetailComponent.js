import React, {Component} from 'react';
import {ListGroup, ListGroupItem, Card, CardImg , CardTitle, CardText, CardBody} from 'reactstrap';

class DishDetail extends Component {
    render(){
    if (this.props.dish != null){
        const comment = this.props.dish.comments.map((comment)=>{
            return (
                <ListGroupItem>
                    <p> rating:  <bold> {comment.rating} </bold> </p>
                    <p> <strong> {comment.author} </strong> {comment.date} </p> 
                    <p>{comment.comment}</p>
                </ListGroupItem>
            );
        });
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-5 m-1">
                        <Card key={this.props.dish.id}>
                            <CardImg width="100%" src={this.props.dish.image} alt={this.props.dish.name} />
                            <CardBody>
                                <CardTitle>{this.props.dish.name}</CardTitle>
                                <CardText> {this.props.dish.description} </CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-sm-12 col-md-5 m-1">
                        <ListGroup>
                            {comment}
                        </ListGroup>
                    </div>
                </div>
            </div>
        );
    }
    else 
        return (
            <div></div>
        );
    
    }
} 

export default DishDetail;