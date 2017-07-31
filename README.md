<a href=http://www.hiot.io>HIOT.io</a>

HIOT is the Heirarchical Internet of Things.

Pronounced Hi Oh Tee - it aims to solve some of the core issues with contemporary IOT solutions and architectures

<b>Security</b>
Each device in a HIOT deployment can only communicate with a small number of defined devices (typically one or two but there are some exceptions) and has been centrally configured to perform discrete functions. For example, most of the Things in this repository are built on entry-level Anrduino or compatible devices and don't include any Operating System.

Only one device per physical deployment (e.g. an office block or production floor) has access to the Internet or any external networks. Coordinator devices sit on the edge of the deployment and pass messages between the platform and the local devices. No other devices in the deployment can access the outside world.

Sensor data is sent "up" to the platform via the Coordinator, through a defined chain of Aggregators, while commands and configuration updats are sent "down" from the platform, again via the Coordinator, through a chain of Brokers.

<b>Scalability</b>
Rather than pushing raw data from Things to the Platform where it can be analysed and aggregated etc. Local Aggregator devices are used to process the data and can be chained together to either distribute the effort or to aggregate the aggregates. For example, imagine a Company Headquarters with 20 floors and 100 temperature sensors on each floor and that these sensors were configured to push reading up to the Platform every 30 seconds.

In this scenario, the Platform would need to accept and process (e.g. min, max and mean temperatures) 2,000 readings every 30 seconds (and similar for other sensor types). In HIOT, Aggregators are deployed across the building to perform local aggregation, for example each floor could be divided into North, South, East and West facing areas and aggregators deployed to calculate the (min,max,mean) for a specific area (e.g. "Floor 14, West"), in many cases these aggregates can be further aggregated to provide other data (e.g. "Average (mean) temperature on West Side", "Max temperature on floor 10" etc.). These aggregates can be sent to the Platform and stored as-is without the need for further computation. This allows for near-infinite scalability as deployments grow or "push-intervals" (update intervals) shorten.

<b>Controlability</b>
In a similar approach to local aggregation, Brokers are also installed throughout the deployment to group related functionality, e.g. "All lighting controls on the First Floor", "Second Floor HVAC" etc. These brokers can then be exposed as discrete control units within a deployment (e.g. lighting and temperature controls for the second floor can be accessed together).

The Aggregation and Brokering of sensor data and control devices is managed through configurable "Coordinator Groups" with granular access control levels.

