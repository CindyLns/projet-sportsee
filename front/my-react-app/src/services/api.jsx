import { User, Activity, AverageSessions, Performance} from "../models/class";
import data from '../datas/user.json';

const isMock = true;

export function getActivity(id) {
  if (isMock) {
    const userActivity = data.activity.find((item) => item.userId === Number(id));

    return new Promise((resolve) => {
      return resolve(
        userActivity.sessions.map((item, index) => ({
          name: `${index + 1}`,
          kilogram: item.kilogram,
          calories: item.calories,
        }))
      );
    });
  } else {
    return fetch(`http://localhost:3000/user/${id}/activity`)
      .then((response) => response.json())
      .then((data) => new Activity(data.data));
  }
}

export function getAverage(id) {
  if (isMock) {
    const userAverage = data.averageSessions.find((item) => item.userId === Number(id));

    return new Promise((resolve) => {
      return resolve(
        userAverage.sessions.map((item, index) => ({
          name: `${index + 1}`,
          sessionLength: item.sessionLength,
        }))
      );
    });
  } else {
    return fetch(`http://localhost:3000/user/${id}/average-sessions`)
      .then((response) => response.json())
      .then((data) => new AverageSessions(data.data));
  }
}

export function getPerformance(id) {
  if (isMock) {
    const userPerformance = data.performance.find((item) => item.userId === Number(id));

    return new Promise((resolve) => {
      return resolve(
        userPerformance.data.map((item) => ({
          subject: userPerformance.kind[item.kind],
          value: item.value,
        }))
      );
    });
  } else {
    return fetch(`http://localhost:3000/user/${id}/performance`)
      .then((response) => response.json())
      .then((data) => new Performance(data.data));
  }
}

export function getScore(id) {
  if (isMock) {
    const userScore = data.users.find((item) => item.id === Number(id));
    const scoreValue = (userScore.todayScore ?? userScore.score) * 100;
    return new Promise((resolve) => {
      return resolve([
        { name: "Score", value: scoreValue },
      ]);
    });
  } else {
    return fetch(`http://localhost:3000/user/${id}`)
      .then((response) => response.json())
      .then((data) => new User(data.data));
  }
}

export function getDatas(id) {
  if (isMock) {
    const userData = data.users.find((item) => item.id === Number(id));

    return new Promise((resolve) => {
      return resolve(userData);
    });
  } else {
    return fetch(`http://localhost:3000/user/${id}`)
      .then((response) => response.json())
      .then((data) => new User(data.data));
  }
}









