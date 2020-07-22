import { BehaviorSubject } from 'rxjs';

const subscriber = new BehaviorSubject('normal');

const dataService = {
    send: (data) => {
        subscriber.next(data);
    }
}

export {
    dataService,
    subscriber
}