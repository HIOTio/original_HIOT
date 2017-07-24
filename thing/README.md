<a href=http://www.hiot.io>HIOT.io</a>

Things are the lowest level devices in an HIOT deployment and have at least one of the following functions:
- Sensor
- Controller

The Sensor function receives data from connected sensor devices (e.g. temperature readings, ambient lighting, feedback from industrial machinery etc.)

The Controller function is used as a control interface for any device that the Thing has been configured to control/interface with. There is no connection between the Sensor and Controller functions on any individual Thing. In other words, a reading on one Thing can be used to control a device connected to a different Thing.

Things only interface with Brokers (to receive commands) and Aggregators (to transmit sensor data). 

A number of sample implementations are included, any of which can be extended and deployed into a real-world HIOT solution.