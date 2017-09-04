<a href=http://www.hiot.io>HIOT.io</a>

The Coordinator is the end-point connecting the HIOT deployment with the Platform (regardless of where the Platform is deployed).

No other devices in the deployment can communicate beyond the Coordinator (e.g. to the Platform, or directly to a client device).

Each physical site has one active Coordinator, the role can be deployed on multiple devices but only one can be active at any time

functions
-- mqtt broker
-- -- listen on <deployment_id> topic
-- -- publish on <deployment_id> topic
-- coordinate devices
-- -- receive health status for each device
-- -- -- ensure required aggregator and broker roles are active
-- -- -- move roles when device is unavailable
-- -- -- move roles when device is short on resources