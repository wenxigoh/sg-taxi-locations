\# SG Taxi Location Viewer

This website shows the "live" (obtained every 1 minute from LTA's Datamall) locations of available taxis in Singapore





\## How It Works

It works by fetching the data from the LTA Datamall API, before serializing it to JSON and then looping over each point to plot it on the map. This loops every one minute to keep the map updated

