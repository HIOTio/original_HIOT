import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
 
export const MainMenu=angular.module('MainMenu',[])
  .controller('MainMenuCtrl',function($scope) {
    $scope.configMenu=[
        {
        name:'Deployment',
        items:[
            {
                name:"Deployments and Coordinators"
            },
            {
                name:"Coordinator Groups"
            },
            {
                name:"control Groups"
            },
            {
                name:"Things"
            },
            {
                name:"Aggregators"
            },
            {
                name:"Brokers"
            },
            {
                name:"Sensors"
            },
            {
                name: "Controllers"
            }
            
        
        ]
    },
        {
            name: "Control",
            items:[
                {
                    name: "Control Groups"
                },
                {
                    name: "Controllers"
                }
            ]
        },
                {
            name: "Monitoring",
            items:[
                {
                    name: "Aggregations"
                },
                {
                    name: "Sensors"
                }
            ]
        }
    ]

  });