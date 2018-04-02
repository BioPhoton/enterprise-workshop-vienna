import { Component, OnInit } from '@angular/core';
import { Flight, FlightService } from '@flight-workspace/flight-api';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {
  from= 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;

  get flights() {
    return this.flightService.flights;
  }

  // "shopping basket" with selected flights
  basket: object = {
    '3': true,
    '5': true
  };

  constructor(private flightService: FlightService) {}

  get flights$(): Observable<Flight[]> {
    return this.flightService.flights$;
  }

  get isFlightsPending$(): Observable<boolean> {
    return this.flightService.isFlightsPending$;
  }


  ngOnInit() {}

  search(): void {
    if (!this.from || !this.to) return;

    this.flightService.load(this.from, this.to, this.urgent);
  }

  delay(): void {
    this.flightService.delay();
  }
}
