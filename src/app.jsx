import './app.css';
import Habit from './components/habit';
import React, { Component } from 'react';
import Habits from './components/habits';
import Navbar from './components/navbar';
import HabitAddForm from './components/habitAddForm';

class App extends Component {
  state = {
    nextId: 4,
    habits: [
      { id: 1, name: 'Reading', count: 0 },
      { id: 2, name: 'Running', count: 0 },
      { id: 3, name: 'Coding', count: 0 }
    ]
  };

  handleIncrement = (habit) => {
    const id = habit.id;
    const habits = this.state.habits.map(habit => {
      if(habit.id === id) {
        return { ...habit, count: habit.count + 1 }
      }
      return habit;
    });
    this.setState({ habits });
  }

  handleDecrement = (habit) => {
    const id = habit.id;
    const habits = this.state.habits.map(habit => {
      if(habit.id === id) {
        return { ...habit, count: habit.count === 0 ? 0 : habit.count - 1 }
      }
      return habit;
    });
    this.setState({ habits });
  }

  handleDelete = (habit) => {
    const habits = this.state.habits.filter(item => item.id !== habit.id);
    
    this.setState({ habits });
  }

  calculateTotalCount = () => {
    const totalCount = this.state.habits.filter(item => item.count > 0).length;

    return totalCount;
  }

  handleAdd = (habitName) => {
    const habit = {
      id: this.state.nextId,
      name: habitName,
      count: 0
    }
    const habits = [...this.state.habits, habit];
    this.setState({ nextId: this.state.nextId + 1, habits });
  }

  handleReset = () => {
    const habits = this.state.habits.map(habit => {
      if(habit.count > 0) {
        return { ...habit, count: 0 }
      }
      return habit;
    });
    this.setState({ habits });
  }

  render() {
    return (
      <>
        <Navbar
          totalCount={this.calculateTotalCount()}
        />
        <Habits 
          habits={this.state.habits}
          onIncrement={this.handleIncrement}
          onDecrement={this.handleDecrement}
          onDelete={this.handleDelete}
          onAdd={this.handleAdd}
          onReset={this.handleReset}
        />
      </>
    );
  }
}

export default App;
