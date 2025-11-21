import { User, Activity, AverageSessions, Performance} from "../models/class";
import data from '../datas/user.json';

/*Active ou désactive l'utilisation des données mockées*/
const isMock = true;

export function getActivity(id) {
  if (isMock) {
    /* Récupération des sessions d'activité pour l'utilisateur */
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
    /*  Appel API réelle */
    return fetch(`http://localhost:3000/user/${id}/activity`)
      .then((response) => response.json())
      .then((data) => new Activity(data.data)); /*  modèle Activity */
  }
}

export function getAverage(id) {
  if (isMock) {
    /* Récupération de la durée moyenne des sessions par jour */
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
    /*  Appel API réelle */
    return fetch(`http://localhost:3000/user/${id}/average-sessions`)
      .then((response) => response.json())
      .then((data) => new AverageSessions(data.data)); /*modèle AverageSessions*/
  }
}

export function getPerformance(id) {
  if (isMock) {
    /* Récupération des performances de l'utilisateur */
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
    /*  Appel API réelle */
    return fetch(`http://localhost:3000/user/${id}/performance`)
      .then((response) => response.json())
      .then((data) => new Performance(data.data)); /*modèle Performance*/
  }
}

export function getScore(id) {
  if (isMock) {
     /* Récupération du score d’un utilisateur */
    const userScore = data.users.find((item) => item.id === Number(id));
    const scoreValue = (userScore.todayScore ?? userScore.score) * 100;
    return new Promise((resolve) => {
      return resolve([
        { name: "Score", value: scoreValue },
      ]);
    });
  } else {
    /*  Appel API réelle */
    return fetch(`http://localhost:3000/user/${id}`)
      .then((response) => response.json())
      .then((data) => new User(data.data)); /*modèle User*/
  }
}

export function getDatas(id) {
  if (isMock) {
    /* Récupération des informations globales d’un utilisateur */
    const userData = data.users.find((item) => item.id === Number(id));

    return new Promise((resolve) => {
      return resolve(userData);
    });
  } else {
    /*  Appel API réelle */
    return fetch(`http://localhost:3000/user/${id}`)
      .then((response) => response.json())
      .then((data) => new User(data.data)); /*modèle User*/
  }
}









