#!/bin/bash

DEVTOOLS_PORT=0
CONFIG=app.json
PROXY_PAC_URL=0
echo $@
for var in "$@"
do
  if [[ $var == --remote-debugging-port* ]] ;
  then
    DEVTOOLS_PORT=${var#*=}
    echo "devtools_port=$DEVTOOLS_PORT"
  fi

  if [[ $var == --config* ]] ;
  then
    CONFIG=${var#*=}
    echo "startup_url==$CONFIG"
  fi
done

echo "Running openfin"

openfin -l -c $CONFIG -p $DEVTOOLS_PORT
