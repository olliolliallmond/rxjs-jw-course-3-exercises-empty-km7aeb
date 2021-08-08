import { Observable } from 'rxjs';

const observable$ = new Observable<string>(subscriber => {
  console.log('Observable executed');
  subscriber.next('Alice');
  subscriber.next('Ben');
  setTimeout(() => {
    subscriber.next('Charlie');
    subscriber.complete();
    // subscriber.complete();
  }, 4000);
  setTimeout(() => subscriber.error(new Error('Failure')), 2000);

  return () => {
    console.log('Teardown phase');
    // cancellation logic goes here
  };
});

console.log('Before subscribe');
observable$.subscribe({
  next: value => console.log(value),
  error: err => console.log(err.message),
  complete: () => console.log('Completed')
});
console.log('After subscribe');
