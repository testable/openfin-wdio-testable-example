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

  if [[ $var == --proxy-pac-url* ]] ;
  then
    PROXY_PAC_URL=${var#*=}
    echo "proxy_pac_url==$PROXY_PAC_URL"
  fi
done

runtimeArgs="--remote-debugging-port=$DEVTOOLS_PORT --proxy-pac-url=$PROXY_PAC_URL --ignore-certificate-errors --proxy-bypass-list=cdn.openfin.co"
export runtimeArgs

echo "Running openfin"

openfin -l -c $CONFIG
