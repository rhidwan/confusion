import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import {connect} from'react-redux';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect , withRouter} from 'react-router-dom';
import Contact from './ContactComponent';
import  { postFeedback, postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders}  from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
const mapDispatchToProps = (dispatch) => ({
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (firstname, lastname, email, telnum, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, email, telnum, agree, contactType, message))
});

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders 
  }
}

class Main extends Component {
  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }


  render() {
    const HomePage = () => {
      return (
        <Home 
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading = {this.props.dishes.isLoading}
          dishesErrMess = {this.props.dishes.errMess}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promoLoading = {this.props.promotions.isLoading}
          promoErrMess = {this.props.promotions.errMess}
          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          leadersErrMess = {this.props.leaders.errMess}
          leadersLoading = {this.props.leaders.isLoading}
        />
      );
    }

    const DishWithId = ({match}) => {
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => 
          dish.id === parseInt(match.params.dishId,10))[0]}
          isLoading = {this.props.dishes.isLoading}
          errMess = {this.props.dishes.errMess}
          comments = {this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          addComment = {this.props.addComment}
          postComment= {this.props.postComment}
          commentsErrMess = {this.props.comments.errMess}
          />
      );
    }
    const AboutwithComments = () => {
      return (
        <About leaders={this.props.leaders.leaders} 
          leadersLoading = {this.props.leaders.isLoading}
          leadersErrMess = {this.props.leaders.errMess}
        />
      )
    }
    return (
      <div>
        <Header />
        <TransitionGroup >
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300} >
            <Switch location={this.props.location}>
              <Route path="/home" component={HomePage} />
              <Route exact path="/menu" component={()=> <Menu dishes={this.props.dishes} /> } />
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route path="/aboutus" component={AboutwithComments} />
        <Route exact path="/contactus" component={() =>
         <Contact
            resetFeedbackForm={this.props.resetFeedbackForm}
            postFeedback ={this.props.postFeedback}
        /> } />
              <Redirect to='/home' />
            </Switch>   
          </CSSTransition> 
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));