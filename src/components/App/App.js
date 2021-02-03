import React, { Component } from 'react';
import Statistics from '../Statistics/Statistics';
import FeedbackOptions from '../FeedbackOptions/FeedbackOptions';
import Section from '../Section/Section';
import Notification from '../Notification/Notification';

export default class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleAddFeadback = event => {
    const feedbackName = event.target.name;
    this.setState(prevState => ({
      [feedbackName]: prevState[feedbackName] + 1,
    }));
  };

  countTotalFeedback = () => {
    const values = Object.values(this.state);
    const totalValue = values.reduce((acc, item) => {
      acc += item;
      return acc;
    }, 0);
    return totalValue;
  };

  countPositiveFeedbackPercentage = total => {
    const goodVoices = this.state.good;
    const totalVoices = total;
    let percentageValue = 0;
    if (goodVoices || totalVoices !== 0) {
      percentageValue = Math.floor((goodVoices / totalVoices) * 100);
    }
    return percentageValue;
  };

  render() {
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback();
    const percentage = this.countPositiveFeedbackPercentage(total);
    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions onLeaveFeedback={this.handleAddFeadback} />
        </Section>
        <Section title="Statistics">
          {total === 0 ? (
            <Notification message="No feedback given" />
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={percentage}
            />
          )}
        </Section>
      </>
    );
  }
}
