
import { Component, OnInit, ViewChild }    from '@angular/core';
import { MatTableModule }       from '@angular/material/table';
import { MatFormFieldModule }   from '@angular/material/form-field';
import { MatSelectModule }      from '@angular/material/select';
import { MatButtonModule }      from '@angular/material/button';
import { MatInputModule }       from '@angular/material/input';
import { MatPaginator, MatTableDataSource }    from '@angular/material';

import { TicketsService } from './tickets.service';
import { Ticket } from './ticket';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketsComponent implements OnInit {
  flights: [];
  displayedColumns: string[] = ['price', 'time', 'bus_number', 'mark', 'col_seats'];
  dataSource: MatTableDataSource<Ticket>;

  constructor(private ticketService: TicketsService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    console.log(this, this.flights)
  }

  postTicketFlights(station_name: string, day: string) {
    this.ticketService.postData(station_name)
    .subscribe(res => {
      for (let i = 0; i < res[0].days.length; i++) {
        if (res[0].days[i].day == day) {
          var flights = res[0].days[i];
        }
      }


      this.dataSource = new MatTableDataSource(this.flights);
      this.dataSource.paginator = this.paginator;
    })
  }
}





























/*import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material';

export interface Schedule {
    station_name: string;
}
export interface Day {
  day: string;
}

export interface Elements {
  price: string;
  time: string;
  bus_number: string;
  mark: string;
  col_seats: string;
}

//import { TicketsService } from './tickets.service';
import { Ticket } from './/ticket'

/** @title Select with form field features */
/*@Component({
  templateUrl: './ticket.component.html',

})
export class TicketComponent {

    station_name = new FormControl('', [Validators.required]);

  schedules: Schedule[] = [
    {station_name: 'Гомель-Брянск'},
    {station_name: 'Брянск-Гомель' },
    {station_name: 'Гомель-Вильнюс' },
    {station_name: 'Вильнюс-Гомель' },
    {station_name: 'Гомель-Железный Порт'},
    {station_name: 'Железный Порт-Гомель' },
    {station_name: 'Гомель-Кёльн' },
    {station_name: 'Кёльн-Гомель' },
    {station_name: 'Гомель-Киев'},
    {station_name: 'Киев-Гомель' },
    {station_name: 'Гомель-Клинцы' },
    {station_name: 'Клинцы-Гомель' },
    {station_name: 'Гомель-Курск'},
    {station_name: 'Курск-Гомель' },
    {station_name: 'Гомель-Москва' },
    {station_name: 'Москва-Гомель' },
    {station_name: 'Гомель-Новозыбков'},
    {station_name: 'Новозыбков-Гомель' },
    {station_name: 'Гомель-Орёл' },
    {station_name: 'Орёл-Гомель' },
    {station_name: 'Гомель-Рига'},
    {station_name: 'Рига-Гомель' },
    {station_name: 'Гомель-Санкт-Петербург' },
    {station_name: 'Санкт-Петербург-Гомель' },
    {station_name: 'Гомель-Херсон'},
    {station_name: 'Херсон-Гомель' },
    {station_name: 'Гомель-Чернигов' },
    {station_name: 'Чернигов-Гомель' },
  ];

  day = new FormControl('', [Validators.required]);

  days: Day[] = [
    {day: '27.05.2019 Понедельник'},
    {day: '28.05.2019 Вторник' },
    {day: '29.05.2019 Среда' },
    {day: '30.05.2019 Четверг' },
    {day: '31.05.2019 Пятница'},

  ];




}
*/









