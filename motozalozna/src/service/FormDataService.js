import { BehaviorSubject } from 'rxjs';

const subscriber = new BehaviorSubject(0);

const dataService = {
    send: (data) => {
        subscriber.next(data);
    }
}

export {
    dataService,
    subscriber
}