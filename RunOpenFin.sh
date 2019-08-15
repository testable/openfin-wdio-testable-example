#!/bin/bash

DEVTOOLS_PORT=0
CONFIG=app.json
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

runtimeArgs="--remote-debugging-port=$DEVTOOLS_PORT"
export runtimeArgs

echo "Running openfin"

openfin -l -c $CONFIG
