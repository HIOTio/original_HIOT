//NOTE: this file will be deployed to device-nodejs to enable coordinator functionality

//TODO: mqtt broker on localhost - if not available, select another broker and move the coordinator role over there



/*
-- mqtt broker
-- -- listen on <deployment_id> topic (receive from platform)
-- -- publish on <deployment_id> topic (send to platform)
-- -- listen on <deployment_id>/coordinator topic and forward on <deployment_id>
-- coordinate devices
-- -- receive health status for each device
-- -- -- ensure required aggregator and broker roles are active
-- -- -- move roles when device is unavailable
-- -- -- move roles when device is short on resources

/*