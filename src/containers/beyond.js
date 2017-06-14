// @flow
import { connect } from 'react-redux';
import Agency from '../components/agency';
import { addTodo } from '../actions';

const mapDispatchToProps = (dispatch) => {
	return {
		onAddTodoClick: () => {
			dispatch(addTodo('nuovo to do text'));
		}
	};
};

const Beyond = connect(() =>({}), mapDispatchToProps)(Agency);

export default Beyond;
