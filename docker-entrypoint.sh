#!/bin/sh
set -e

# Clear cache
rm -rf /var/www/html/var/cache/*

# First arg is `-f` or `--some-option`
if [ "${1#-}" != "$1" ]; then
    set -- apache2-foreground "$@"
fi

exec "$@"