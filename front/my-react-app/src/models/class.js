class User {
  constructor({id, userInfos, todayScore, score, keyData}) {
    this.id = id;
    this.userInfos = userInfos;
    this.todayScore = todayScore || score;
    this.keyData = keyData;
  }
}

class Activity {
  constructor({userId, sessions}) {
    this.userId = userId;
    this.sessions = sessions;
  }
}

class AverageSessions {
  constructor({userId, sessions}) {
    this.userId = userId;
    this.sessions = sessions;
  }
}

class Performance {
  constructor({userId, kind, data}) {
    this.userId = userId;
    this.kind = kind;
    this.data = data;
  }
}

export {User, Activity, AverageSessions, Performance};

