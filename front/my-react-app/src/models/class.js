class User {
  constructor({id, userInfos, todayScore, score, keyData}) {
    this.id = id;
    this.userInfos = userInfos;
    this.todayScore = todayScore || score;
    this.keyData = keyData;
    this.scoreData = [
      { name: "Score", value: this.todayScore * 100 },
    ];
  }
}

class Activity {
  constructor({userId, sessions}) {
    this.userId = userId;
    this.sessions = sessions.map((item, index) => ({
      name: `${index + 1}`,
      kilogram: item.kilogram,
      calories: item.calories,
    }));
}
}

class AverageSessions {
  constructor({userId, sessions}) {
    this.userId = userId;
    this.sessions = sessions.map((item, index) => ({
      name: `${index + 1}`,
      sessionLength: item.sessionLength,
    }));
}
}

class Performance {
  constructor({userId, kind, data}) {
    this.userId = userId;
    this.kind = kind;
    this.data = data.map((item) => ({
      subject: kind[item.kind],
      value: item.value,
    }));
  }
}

export {User, Activity, AverageSessions, Performance};

