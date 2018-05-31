#!/bin/sh
if [ $(ls -al | grep dummy | wc -l) -lt 1 ]; then
  exit 1
else
  exit 0
fi