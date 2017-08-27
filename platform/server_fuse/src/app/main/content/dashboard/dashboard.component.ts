import { Component, OnInit } from "@angular/core";

@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {

	public data={};
  constructor() {
  this.data={
	  		
	  	  		chart1:{
			type: 'line',
			data : {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Average Temperature",
      data: [17, 19, 16, 21, 20, 20, 18]
    }
  ]
},
options : {
  responsive: true,
  maintainAspectRatio: false
}
		},
	  	  		chart2:{
			type: 'bar',
			data : {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
},
options : {
  responsive: true,
  maintainAspectRatio: false
}
		},
	  	  		chart3:{
			type: 'line',
			data : {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
},
options : {
  responsive: true,
  maintainAspectRatio: false
}
		},
				chart4:{
			type: 'line',
			data : {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
},
options : {
  responsive: true,
  maintainAspectRatio: false
}
		},
				chart5:{
			type: 'line',
			data : {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
},
options : {
  responsive: true,
  maintainAspectRatio: false
}
		},
	  chart6:{
			type: 'line',
			data : {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
},
options : {
  responsive: true,
  maintainAspectRatio: false
}
		},
	  	  		chart7:{
			type: 'line',
			data : {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
},
options : {
  responsive: true,
  maintainAspectRatio: false
}
		},
	  	  		chart8:{
			type: 'line',
			data : {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
},
options : {
  responsive: true,
  maintainAspectRatio: false
}
		},
	  	  		chart9:{
			type: 'line',
			data : {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
},
options : {
  responsive: true,
  maintainAspectRatio: false
}
		},	  		
	  chart10:{
			type: 'line',
			data : {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
},
options : {
  responsive: true,
  maintainAspectRatio: false
}
		}
	  
  }}

  public ngOnInit() {
  }

}
